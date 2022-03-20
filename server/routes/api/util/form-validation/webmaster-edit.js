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
    // Casting number input to string
    if (typeof sanitizedData[key] === 'number') {
      sanitizedData[key] = String(sanitizedData[key]);
    }
  });
  return sanitizedData;
}

/**
 * Takes in edit form input and checks for validity
 * @param requestBody the data object holding all form inputs as fields
 */
function validateWebmasterEditInput(requestBody) {
  const errors = {};

  // Convert empty fields to empty strings (Validator only works with strings)
  const data = convertFieldsToString(requestBody);

  // if (!isEmpty(data.name) && !Validator.isAlpha(data.name)) {
  //   errors.name = 'Name field must be valid';
  // }
  if (!isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.email = 'Email field must be valid';
  }
  if (!isEmpty(data.studentID)) {
    if (!Validator.isNumeric(data.studentID)) {
      errors.studentID = 'Student ID must be a number';
    } else if (!Validator.isLength(data.studentID, { min: 9, max: 9 })) {
      errors.studentID = 'Student ID must be 9 digits';
    }
  }
  if (!isEmpty(data.phoneNumber)) {
    if (!Validator.isNumeric(data.phoneNumber)) {
      errors.phoneNumber = 'Student ID must be a number';
    } else if (!Validator.isLength(data.phoneNumber, { min: 10, max: 10 })) {
      errors.studentID = 'Student ID must be 10 digits';
    }
  }
  if (!isEmpty(data.graduatingYear)) {
    if (!Validator.isNumeric(data.graduatingYear)) {
      errors.graduatingYear = 'Graduate year must be a number';
    } else if (!Validator.isLength(data.graduatingYear, { min: 4, max: 4 })) {
      errors.graduatingYear = 'Graduate year must be valid year';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateWebmasterEditInput;
