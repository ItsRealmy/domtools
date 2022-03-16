# domtools

Some useful tools for your DOM (and more)!

# API



## `el: (html: string) => Element`
A function used for generating an element based on a string of HTML.

### Params
- `html: string` - The HTML string the element is based on.

### Returns
The generated element.



## `route: (route: string, callback: (params: object) => any) => boolean`
In case you want to do routing on the client side, use this function to define a
route and trigger a callback once the current pathname matches the route.

### Params
- `route: string` - Route the current pathname must match. E.g "/@/:username".
- `callback: function (params: object)` - This callback will call whenever the current pathname matches the route.
    It will get 1 argument, which is all the params it matched. For example, if your route is "/@/:username" and
    the current pathname is "/@/realmy", the object will be `{ "username": "realmy" }`.

### Returns
`true`



## `style: (selector: string, styles: object) => string`
A function used for adding styles to a CSS selector.

### Params
- `selector: string` - CSS selector of which elements these properties should apply to.
- `styles: object` - Object of styles. Example: `{ "font-family": "Arial, sans-serif", "color": "red" }`

### Returns
The generated CSS block.



## `elStyle: (element: Element, styles: object) => string`
A function used for adding styles to a specific element.

### Params
- `element: Element` - Element which these properties should apply to.
- `styles: object` - Object of styles. Example: `{ "font-family": "Arial, sans-serif", "color": "red" }`

### Returns
The generated CSS block.



## `getStyle: (selectorOrElement: string | element) => string | element`
Get an object of properties applied to this selector or element **(only returns DT-generated styles)**.

### Params
- `selectorOrElement: string | element` - Selector or element of which styles must be returned.

### Returns
The object of CSS properties applied to that selector/element (that has been generated by DT).