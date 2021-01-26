const mongoose = require('mongoose');
const { Schema } = mongoose;

const {
  MajorEnum,
  PledgeClassEnum,
  PositionEnum,
} = require('../util/enums/brother-enums');

/**
 * Checks if any Brother instance is currently pledging
 */
function isCurrentlyPledging() {
  const pledgeClasses = Object.values(PledgeClassEnum);
  if (this.pledgeClass === pledgeClasses[pledgeClasses.length - 1]) {
    return true;
  }
  return false;
}

const BrotherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: false, // e-board never kept track of student IDs :)))
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
    enum: Object.values(MajorEnum),
  },
  graduatingYear: {
    type: Number,
    required: true,
  },
  pledgeClass: {
    type: String,
    required: true,
    enum: Object.values(PledgeClassEnum),
  },
  position: {
    type: String,
    required: true,
    enum: Object.values(PositionEnum),
  },
  isGraduated: {
    type: Boolean,
    required: true,
  },
  biography: {
    type: String,
    required: false,
  },
  meritCount: {
    type: Number,
    default: 15,
    required: isCurrentlyPledging,
  },
  imagePath: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Brothers', BrotherSchema);
