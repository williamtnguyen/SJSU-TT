const mongoose = require('mongoose');

const BrotherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  graduateYear: {
    type: Number,
    required: true,
  },
  pledgeClass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: `${this.pledgeClass}-${this.graduateYear}`,
  },
  biography: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Brother', BrotherSchema);
