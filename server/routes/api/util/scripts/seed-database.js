const bcrypt = require('bcryptjs');

const actives = require('../brother-info/actives.json');
const alumni = require('../brother-info/alumni.json');
const pledges = require('../brother-info/pledgesF21info');
const officers = require('../brother-info/officersF21');
const inactives = require('../brother-info/inactives.json');

const Brother = require('../../brothers/brother');
const Merit = require('../../merits/merit');
const { PledgeClassEnum, PositionEnum } = require('../enums/brother-enums');

const BrothersTypeEnum = Object.freeze({
  ACTIVES: 'actives',
  ALUMNI: 'alumni',
  PLEDGES: 'pledges',
  INACTIVES: 'inactives',
});
const SaveOperationEnum = Object.freeze({
  ADD: 'added to DB',
  UPDATE: 'profile updated in DB',
});

const foosWithNoHeadshot = {
  'Andrew Each': true,
  'Manuel Chavez': true, // has headshot but no phoneNumber or studentID
  'Nicholas Ong': true, // has headshot but no phoneNumber or studentID
};
const PREVIOUS_PLEDGE_CLASS = PledgeClassEnum.DELTA;
const CURR_PLEDGE_CLASS = PledgeClassEnum.EPSILON;

/**
 * Populates the DB with information from actives/alumni/pledge files
 */
async function seedDB() {
  try {
    await Brother.deleteMany(
      { email: { $ne: 'sjsuthetatauwebmaster@gmail.com' } },
    );
    console.log('Removed all members from DB excluding Webmaster Admin');
    await Merit.deleteMany();
    console.log('Removed all merits from last semester from DB');

    await populateDBWith(actives, BrothersTypeEnum.ACTIVES);
    await populateDBWith(alumni, BrothersTypeEnum.ALUMNI);
    await populateDBWith(pledges, BrothersTypeEnum.PLEDGES);
    await populateDBWith(inactives, BrothersTypeEnum.INACTIVES);
    await turnPrevPledgesActive(PREVIOUS_PLEDGE_CLASS);
    await updatePositions(officers);
  } catch (error) {
    return console.error('Error:', error);
  }
  console.log('\nDB SEED DONE!');
}

function saveBrother(brotherObject, saveOperationString) {
  return new Promise((resolve, reject) => {
    brotherObject
      .save()
      .then((storedBrother) => {
        console.log(`${storedBrother.name} ${saveOperationString}`);
        resolve(true);
      })
      .catch((error) => reject('Error:', error));
  });
}

function findBrotherAndUpdate(filterObject, updateObject, saveOperationString) {
  return new Promise((resolve, reject) => {
    Brother
      .findOneAndUpdate(filterObject, updateObject, { returnOriginal: false })
      .then((updatedBrother) => {
        console.log(`${updatedBrother.name} ${saveOperationString}`);
        resolve(true);
      })
      .catch((error) => reject('Error:', error));
  });
}

/**
 * Function that populates MongoDB with file of brothers.
 * It runs all DB saves in parallel (so that saving one bro doesn't block saving another),
 * but will block main thread of the calling function until all saves are completed.
 * 
 * @param {*} brothers parsed JSON or JS Object of brothers 
 */
async function populateDBWith(brothers, brothersType) {
  console.log(`\nPopulating DB with ${brothersType}...`);
  const promises = [];
  let newBrother;

  brothers.forEach((brother) => {
    const s3FilePath = resolveS3ImagePath(brother);
    const password = (brother.pledgeClass === CURR_PLEDGE_CLASS)
      ? `cool-pledge-class-${CURR_PLEDGE_CLASS.toLowerCase()}-yeah`
      : `${brother.pledgeClass}-${brother.graduatingYear}`;

    newBrother = new Brother({
      name: brother.name,
      email: brother.email,
      studentID: brother.studentID ? brother.studentID : null,
      phoneNumber: brother.phoneNumber,
      password,
      major: brother.major,
      graduatingYear: brother.graduatingYear,
      pledgeClass: brother.pledgeClass,
      position: brother.position,
      isGraduated: brother.isGraduated,
      isActive: brother.isActive ? brother.isActive : false,
      biography: brother.biography ? brother.biography : '',
      imagePath: s3FilePath,
    });

    // Hash password before storing in database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newBrother.password, salt);
    newBrother.password = hash;

    promises.push(saveBrother(newBrother, SaveOperationEnum.ADD));
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    return console.error(error);
  }
}

/**
 * Function that updates imagePath and position fields of previous pledges in DB.
 * It runs all DB updates in parallel (so that updating one bro doesn't block saving another),
 * but will block main thread of the calling function until all updates are completed.
 * 
 * @param {*} previousPledgeClass enum value of last semester pledge class 
 */
async function turnPrevPledgesActive(previousPledgeClass) {
  console.log(`\nUpdating ${previousPledgeClass} to actives...`);

  try {
    const previousPledges = await Brother.find({ pledgeClass: previousPledgeClass });
    const promises = [];
    previousPledges.forEach((pledge) => {
      const s3FilePath = resolveS3ImagePath(pledge);
      pledge.imagePath = s3FilePath;
      pledge.position = PositionEnum.MEMBER;
      promises.push(saveBrother(pledge, SaveOperationEnum.UPDATE));
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      return console.error(error);
    }
  } catch (error) {
    return console.error(`Could not find brothers in ${previousPledgeClass}`, error);
  }
}

/**
 * Function that updates position fields of current officers in DB.
 * It runs all DB updates in parallel (so that updating one bro doesn't block saving another),
 * but will block main thread of the calling function until all updates are completed.
 * 
 * @param {*} officers JSON or JS Object of brothers
 */
async function updatePositions(officers) {
  let promises = [];

  try {
    const oldOfficers = await Brother.find(
      {
        email: { $ne: 'sjsuthetatauwebmaster@gmail.com' },
        position: { $nin: [PositionEnum.MEMBER, PositionEnum.PLEDGE] },
      },
    );
    oldOfficers.forEach((brother) => {
      brother.position = PositionEnum.MEMBER;
      promises.push(saveBrother(brother, SaveOperationEnum.UPDATE));
    });
    try {
      console.log(`\nUpdating positions for old officers...`);
      await Promise.all(promises);
    } catch (error) {
      return console.error(error);
    }

    promises = [];
    officers.forEach((officer) => {
      const filterObject = { email: officer.email };
      const updateObject = { position: officer.position };
      promises.push(findBrotherAndUpdate(filterObject, updateObject, SaveOperationEnum.UPDATE));
    });
    try {
      console.log(`\nUpdating positions for new officers...`);
      await Promise.all(promises);
    } catch (error) {
      return console.error(error);
    }
  } catch (error) {
    return console.error(error);
  }
}

function resolveS3ImagePath(brotherObject) {
  let s3FilePath;
  if (brotherObject.pledgeClass === CURR_PLEDGE_CLASS) {
    s3FilePath = 'Delta/cute_puppy.jpg'
  } else if (foosWithNoHeadshot[brotherObject.name]) {
    s3FilePath = null;
  } else if (brotherObject.studentID) {
    s3FilePath = `${brotherObject.pledgeClass}/${brotherObject.studentID}.jpg`;
  } else {
    s3FilePath = `${brotherObject.pledgeClass}/${brotherObject.phoneNumber}.jpg`;
  }
  return s3FilePath;
}

module.exports = seedDB;
