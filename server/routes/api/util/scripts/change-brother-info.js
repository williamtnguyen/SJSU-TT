const bcrypt = require('bcryptjs');
const Brother = require('../../brothers/brother');
const { PledgeClassEnum } = require('../enums/brother-enums');

const changeBrotherInformation = () => {
  Brother.findOne(
    {
      email: 'modysleiman@gmail.com',
    },
    (error, foundBrother) => {
      if (error) {
        return console.error('Could not find brother with email', error);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(`${PledgeClassEnum.GAMMA}-2021`, salt);

      foundBrother.password = hashedPass;
      foundBrother.save();
      console.log('Edit successful');
    }
  );
};

module.exports = changeBrotherInformation;
