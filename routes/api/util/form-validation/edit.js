const Validator = require('validator');
const isEmpty = require('is-empty');

/**
 * Takes in edit form input and checks for validity
 * @param requestBody the data object holding all form inputs as fields
 */
function validateEditInput(requestBody) {
  const errors = {};
  let emptyCount = 0;
  // If all fields empty, don't update to database
  requestBody.forEach((field) => {
    if (isEmpty(field)) emptyCount += 1;
  });
  if (emptyCount === Object.keys(requestBody).length) {
    errors.empty = 'All fields left blank';
  }
  // Only validate email and gradYear because they have more strict input
  if (!isEmpty(requestBody.email) && !Validator.isEmail(requestBody.email)) {
    errors.email = 'Email field must be valid';
  }
  if (!isEmpty(requestBody.graduatingYear)) {
    if (!Validator.isNumeric(requestBody.graduatingYear)) {
      errors.graduatingYear = 'Graduate year must be a number';
    } else if (
      !Validator.isLength(requestBody.graduatingYear, { min: 4, max: 4 })
    ) {
      errors.graduatingYear = 'Graduate year must be valid year';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateEditInput;
