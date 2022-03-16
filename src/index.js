const util = require("./util");
const RouteMatcher = require("url-pattern");
const cssConverter = require("obj-to-css");

let dtCSS = {};

module.exports = {
  /**
   * A function used for generating an element based on a string of HTML.
   * @param {string} html - The HTML string the element is based on.
   * @returns The generated element.
   */

  el: function (html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.firstElementChild;
  },

  /**
   * In case you want to do routing on the client side, use this function to define a route and trigger a callback
   * once the current pathname matches the route.
   * 
   * @param {string} route - Route the current pathname must match. E.g "/@/:username".
   * @param {(params: object)} callback - This callback will call whenever the current pathname matches the route.
   * It will get 1 argument, which is all the params it matched. For example, if your route is "/@/:username" and
   * the current pathname is "/@/realmy", the object will be `{ "username": "realmy" }`.
   * @returns `true`
   */

  route: function (route, callback) {
    // Create route matcher
    const matcher = new RouteMatcher(route);

    // Check for changes
    let oldValue = document.location.pathname;

    setInterval(() => {
      if (oldValue !== document.location.pathname) checkIfMatches();
      oldValue = document.location.pathname
    }, 0);

    // Check if pathname matches to route
    function checkIfMatches() {
      const rawPathname = document.location.pathname;
      const pathname = (rawPathname.endsWith("/")) ? rawPathname.substring(0, rawPathname.length - 1) : rawPathname;
      const params = matcher.match(pathname);

      // If it matches, run the callback
      if (params) callback(params);
    }

    checkIfMatches();

    return true;
  },

  /**
   * A function used for adding styles to a CSS selector.
   * @param {string} selector - CSS selector of which elements these properties should apply to.
   * @param {object} styles - Object of styles. Example: `{ "font-family": "Arial, sans-serif", "color": "red" }`
   * @returns The generated CSS block.
   */

  style: function (selector, styles) {
    // Create domtools-managed style element
    if (!document.getElementById("dt-css")) document.head.appendChild(this.el(`<style id="dt-css"></style>`));
    const styleElement = document.getElementById("dt-css");

    dtCSS[selector] = styles;

    // Set the innerText of the style element to the newly generated CSS
    styleElement.innerText = cssConverter(dtCSS);

    // Return generated style
    let returnObj = {};
    returnObj[selector] = styles;

    return cssConverter(returnObj);
  },

  /**
   * A function used for adding styles to a specific element.
   * @param {element} element - Element which these properties should apply to.
   * @param {object} styles - Object of styles. Example: `{ "font-family": "Arial, sans-serif", "color": "red" }`
   * @returns The generated CSS block.
   */
  
  elStyle: function (element, styles) {
    // Create domtools-managed style element
    if (!document.getElementById("dt-css")) document.head.appendChild(this.el(`<style id="dt-css"></style>`));
    const styleElement = document.getElementById("dt-css");

    // Assign random ID to element
    const id = (!element.id) ? util.randomString(8) : element.id;
    element.id = id;

    dtCSS["#" + id] = styles;

    styleElement.innerText = cssConverter(dtCSS);

    // Return generated style
    let returnObj = {};
    returnObj["#" + id] = styles;

    return cssConverter(returnObj);
  },

  /**
   * Get an object of properties applied to this selector or element (only returns DT-generated styles).
   * @param {string|element} selectorOrElement - Selector or element of which styles must be returned.
   * @returns The object of CSS properties applied to that selector/element.
   */

  getStyle: function (selectorOrElement) {
    // Is it a selector or an element?
    let what = 0;
    if (typeof selectorOrElement == "string") what = 1;
    else what = 2;

    return (what == 1) ? dtCSS[selectorOrElement] : dtCSS["#" + selectorOrElement.id];
  }
}