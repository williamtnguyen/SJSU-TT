const isEmpty = require('is-empty');

function validateMeritRequestInput(requestBody) {
  const errors = {};

  if (isEmpty(requestBody.description)) {
    errors.description = 'Description field must be filled out';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateMeritRequestInput;
