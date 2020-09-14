const Validator = require('validator');
const isEmpty = require('is-empty');

/**
 * Converts all empty fields in request body to empty strings for Validator
 * @param requestBody the data object holding all form inputs as fields
 */
function convertFieldsToString(requestBody) {
  const sanitizedData = requestBody;
  Object.keys(sanitizedData).forEach((key) => {
    sanitizedData[key] = !isEmpty(sanitizedData[key]) ? sanitizedData[key] : '';
  });
  return sanitizedData;
}

/**
 * Takes in login form input from frontend and checks validity
 * @param requestBody the data object holding all form inputs as fields
 */
function validateLoginInput(requestBody) {
  const errors = {};

  // Convert empty fields to empty strings (Validator only works with strings)
  const data = convertFieldsToString(requestBody);

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email field must be valid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateLoginInput;
