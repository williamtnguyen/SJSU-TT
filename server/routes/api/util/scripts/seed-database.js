const actives = require('./actives');
const Brother = require('../../brothers/brother');

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
    const s3FilePath = activeBrother.studentID
      ? `${activeBrother.pledgeClass}/${activeBrother.studentID}.jpg`
      : `${activeBrother.pledgeClass}/${activeBrother.phoneNumber}.jpg`;

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
      biography: '',
      imagePath: s3FilePath,
    });

    newBrother
      .save()
      .then((storedBrother) => console.log(`${storedBrother.name} added to DB`))
      .catch((error) => console.error('Error:', error));
  });
};

module.exports = seedDB;
