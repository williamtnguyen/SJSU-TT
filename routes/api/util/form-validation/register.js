const Validator = require('validator');

function isNoErrors(errors) {
  return Object.keys(errors).length === 0;
}

/**
 * Takes in registration form input from frontend and checks validity
 * @param data the data object holding all form inputs as fields
 */
function validateRegisterInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.major)) {
    errors.name = 'Major field is required';
  }
  if (Validator.isEmpty(data.position)) {
    errors.position = 'Position field is required';
  }
  if (Validator.isEmpty(data.graduateYear)) {
    errors.graduateYear = 'Graduate year field is required';
  }
  if (Validator.isEmpty(data.pledgeClass)) {
    errors.pledgeClass = 'Pledge class field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email field must be valid';
  }

  return {
    errors,
    isValid: isNoErrors(errors),
  };
}

module.exports = validateRegisterInput;
