const bcrypt = require('bcryptjs');
const Brother = require('../../brothers/brother');
const { PledgeClassEnum } = require('../enums/brother-enums');
const epsilon = require('../../brothers/pledgesF21info');

const addEpsilon = () => {
    epsilon.forEach((pledgeBrother) => {
        const s3FilePath = `Delta/cute_puppy.jpg`;
    
        const newBrother = new Brother({
          name: pledgeBrother.name,
          email: pledgeBrother.email,
          studentID: pledgeBrother.studentID ? pledgeBrother.studentID : null,
          phoneNumber: pledgeBrother.phoneNumber,
          password: 'cool-pledge-class-epsilon-yeah',
          major: pledgeBrother.major,
          graduatingYear: pledgeBrother.graduatingYear,
          pledgeClass: pledgeBrother.pledgeClass,
          position: pledgeBrother.position,
          isGraduated: pledgeBrother.isGraduated,
          isActive: true,
          biography: '',
          imagePath: s3FilePath,
        });
    
        // Hash password before storing in database
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newBrother.password, salt);
        newBrother.password = hash;
    
        newBrother
          .save()
          .then((storedBrother) => console.log(`${storedBrother.name} added to DB`))
          .catch((error) => console.error('Error:', error));
      });
}


module.exports = addEpsilon;