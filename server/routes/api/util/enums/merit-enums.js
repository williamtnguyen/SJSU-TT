const MeritOperationEnum = Object.freeze({
  MERIT: 'Merit',
  DEMERIT: 'Demerit',
});

const MeritStatusEnum = Object.freeze({
  PENDING: 'Pending',
  APPROVED: 'Approved',
  DISAPPROVED: 'Disapproved',
});

module.exports = { MeritOperationEnum, MeritStatusEnum };
