module.exports = {
  /**
   * Generates a string of random alphanumeric characters.
   * @param {number} length - The length the string should be.
   * @returns - The resulting string.
   */

  randomString: function (length) {
    const acceptedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += acceptedChars.charAt(Math.floor(Math.random() * acceptedChars.length));
    }

    return result;
  },
}