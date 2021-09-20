const bcrypt = require('bcryptjs');
const Brother = require('../../brothers/brother');
const { PledgeClassEnum, PositionEnum } = require('../enums/brother-enums');
const officers = require('../../brothers/officersF21');

const updatePos = () => {
    Brother.find({
        email: {$ne: 'sjsuthetatauwebmaster@gmail.com'},
    },
    (error, foundBrothers) => {
        if (error) {
            return console.error('Could not find', error);
        }
        foundBrothers.forEach((brother) => {
            if(brother.position !== PositionEnum.MEMBER){
                brother.position = PositionEnum.MEMBER;
                brother.save();
            }
            officers.forEach((object) =>{
                Brother.findOne({
                    email: object.email
                }, (error, brother) => {
                    if (error){
                        return console.error('Could not find brother', error);
                    }
                    brother.position = object.position;
                    brother.save();
                })
                })
            })
        })
}

module.exports = updatePos;