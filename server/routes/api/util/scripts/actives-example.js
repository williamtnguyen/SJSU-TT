const {
  MajorEnum,
  PledgeClassEnum,
  PositionEnum,
} = require('../enums/brother-enums');

const actives = [
  {
    name: 'Webmaster Admin',
    email: 'sjsuthetatauwebmaster@gmail.com',
    studentID: '123456789',
    phoneNumber: '0123456789',
    major: MajorEnum.SOFTWARE,
    graduatingYear: 3001,
    pledgeClass: PledgeClassEnum.FOUNDING,
    position: PositionEnum.WEBMASTER,
    isGraduated: true,
  },
  // more bruh info
];

module.exports = actives;
