const bcrypt = require('bcryptjs');
// const actives = require('./actives');
const actives = require('./actives-example');
// const alumni = require('./alumni');
const alumni = require('./actives-example');
const Brother = require('../../brothers/brother');

const foosWithNoHeadshot = {
  'Andrew Each': true,
  'Parker Grube': true,
  'Manuel Chavez': true, // has headshot but no phoneNumber or studentID
  'Nicholas Ong': true, // has headshot but no phoneNumber or studentID
};

/**
 * Populates the DB with information from actives/alumni files
 */
const seedDB = () => {
  Brother.deleteMany(
    { email: { $ne: 'sjsuthetatauwebmaster@gmail.com' } },
    (error) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Removed all members from DB excluding Webmaster Admin');
      }
    }
  );

  actives.forEach((activeBrother) => {
    let s3FilePath;
    if (foosWithNoHeadshot[activeBrother.name]) {
      s3FilePath = null;
    } else if (activeBrother.studentID) {
      s3FilePath = `${activeBrother.pledgeClass}/${activeBrother.studentID}.jpg`;
    } else { 
      s3FilePath = `${activeBrother.pledgeClass}/${activeBrother.phoneNumber}.jpg`;
    }

    const newBrother = new Brother({
      name: activeBrother.name,
      email: activeBrother.email,
      studentID: activeBrother.studentID ? activeBrother.studentID : null,
      phoneNumber: activeBrother.phoneNumber,
      password: `${activeBrother.pledgeClass}-${activeBrother.graduatingYear}`,
      major: activeBrother.major,
      graduatingYear: activeBrother.graduatingYear,
      pledgeClass: activeBrother.pledgeClass,
      position: activeBrother.position,
      isGraduated: activeBrother.isGraduated,
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

  alumni.forEach((graduatedBrother) => {
    let s3FilePath;
    if (foosWithNoHeadshot[graduatedBrother.name]) {
      s3FilePath = null;
    } else if (graduatedBrother.studentID) {
      s3FilePath = `${graduatedBrother.pledgeClass}/${graduatedBrother.studentID}.jpg`;
    } else {
      s3FilePath = `${graduatedBrother.pledgeClass}/${graduatedBrother.phoneNumber}.jpg`;
    }

    const newBrother = new Brother({
      name: graduatedBrother.name,
      email: graduatedBrother.email,
      studentID: graduatedBrother.studentID ? graduatedBrother.studentID : null,
      phoneNumber: graduatedBrother.phoneNumber,
      password: `${graduatedBrother.pledgeClass}-${graduatedBrother.graduatingYear}`,
      major: graduatedBrother.major,
      graduatingYear: graduatedBrother.graduatingYear,
      pledgeClass: graduatedBrother.pledgeClass,
      position: graduatedBrother.position,
      isGraduated: graduatedBrother.isGraduated,
<<<<<<< HEAD
      isActive: false,
=======
      isActive: true,
>>>>>>> Add alumni info file and seed script
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
};

module.exports = seedDB;
