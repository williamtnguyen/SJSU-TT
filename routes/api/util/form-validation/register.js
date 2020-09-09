const Validator = require('validator');

/**
 * Checks if any errors were populated during input validation
 * @param errors the error object populated in function below
 */
function isNoErrors(errors) {
  return Object.keys(errors).length === 0;
}

/**
 * Takes in registration form input from frontend and checks validity
 * @param data the data object holding all form inputs as fields
 */
function validateRegisterInput(data) {
  const errors = {};

  if (Validator.isEmpty(String(data.name))) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(String(data.major))) {
    errors.name = 'Major field is required';
  }
  if (Validator.isEmpty(String(data.position))) {
    errors.position = 'Position field is required';
  }
  if (Validator.isEmpty(String(data.graduatingYear))) {
    errors.graduateYear = 'Graduate year field is required';
  }
  if (Validator.isEmpty(String(data.pledgeClass))) {
    errors.pledgeClass = 'Pledge class field is required';
  }
  if (Validator.isEmpty(String(data.email))) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isNoErrors(errors),
  };
}

module.exports = validateRegisterInput;
