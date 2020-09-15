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
 * Takes in registration form input from frontend and checks validity
 * @param requestBody the data object holding all form inputs as fields
 */
function validateRegisterInput(requestBody) {
  const errors = {};

  // Convert empty fields to empty strings (Validator only works with strings)
  const data = convertFieldsToString(requestBody);

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email field must be valid';
  }
  if (Validator.isEmpty(data.major)) {
    errors.name = 'Major field is required';
  }
  if (Validator.isEmpty(data.graduatingYear)) {
    errors.graduatingYear = 'Graduate year field is required';
  }
  if (Validator.isEmpty(data.pledgeClass)) {
    errors.pledgeClass = 'Pledge class field is required';
  }
  if (Validator.isEmpty(data.position)) {
    errors.position = 'Position field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateRegisterInput;
