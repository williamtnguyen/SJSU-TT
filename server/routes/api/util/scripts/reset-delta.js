const bcrypt = require('bcryptjs');
const Brother = require('../../brothers/brother');
const { PledgeClassEnum } = require('../enums/brother-enums');

const removeDelta = () => {
    Brother.find({
        pledgeClass: PledgeClassEnum.DELTA,
    },
    (error, foundBrother) => {
        if (error) {
            return console.error('Could not find brother in Delta Class', error);
        }
        foundBrother.forEach((brother) => {
            Brother.deleteOne({email:brother})
        })
    },
    )
}

module.exports = removeDelta;
