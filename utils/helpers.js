module.exports = {
  formatDate: (date, format) => {
    return moment(date).format(format); // Format a date using Moment.js
  },

  ifEquals: (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this); // Compare two values and execute a block if they are equal
  },

  limit: (arr, limit) => {
    if (!Array.isArray(arr)) { return []; } // Check if the input is an array
    return arr.slice(0, limit); // Return a portion of the array up to the specified limit
  },
};