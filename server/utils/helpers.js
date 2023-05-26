const moment = require('moment');

/**
 * @param {object} obj - The object to check.
 * @returns {boolean} - Returns true if the object is empty, false otherwise.
 */
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * @param {string} dateString - The date string to format.
 * @returns {string} - Returns a formatted string of the date.
 */
const formatDate = (dateString) => {
  return moment(dateString).format('MMMM Do YYYY, h:mm:ss a');
};

/**
 * @param {Error} error - The error object.
 * @returns {object} - Returns an object containing the error message and stack trace.
 */
const handleErrors = (error) => {
  return {
    message: error.message,
    stack: error.stack,
  };
};

/**
 * @param {object} data - The data to validate.
 * @param {array} requiredFields - The required fields.
 * @returns {boolean} - Returns true if all required fields are present, false otherwise.
 */
const validateData = (data, requiredFields) => {
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!data[field]) {
      return false;
    }
  }
  return true;
};

module.exports = {
  isEmptyObject,
  formatDate,
  handleErrors,
  validateData,
};
