const mongoose = require('mongoose');
const { Schema } = mongoose;

const { MeritOperationEnum } = require('../util/enums/merit-enums');

const MeritSchema = new Schema({
  pledgeName: {
    type: String,
    required: true,
  },
  issuerName: {
    type: String,
    required: true,
  },
  pledgeID: { type: Schema.Types.ObjectId, ref: 'Brothers' },
  issuerID: { type: Schema.Types.ObjectId, ref: 'Brothers' },
  operation: {
    type: String,
    required: true,
    enum: Object.values(MeritOperationEnum),
  },
  description: {
    type: String,
    required: true,
  },
  isDispatched: {
    type: Boolean,
    default: false,
    required: false,
  },
  isApproved: {
    type: Boolean,
    default: null,
    required: this.isDispatched,
  },
  meritAmount: {
    type: Number,
    default: 1, // accounts for documents with missing meritAmount field
    required: false,
  },
  submissionDate: {
    type: Date,
    required: false,
  },
  dispatchDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('Merits', MeritSchema);
