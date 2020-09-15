const MajorEnum = Object.freeze({
  Aerospace: 'Aerospace Engineering',
  Biomedical: 'Biomedical Engineering',
  Civil: 'Civil Engineering',
  CMPE: 'Computer Engineering',
  ComputerScience: 'Computer Science',
  Electrical: 'Electrical Engineering',
  General: 'General Engineering',
  Industrial: 'Industrial Engineering',
  Math: 'Math',
  Mechanical: 'Mechanical Engineering',
  Software: 'Software Engineering',
});

const PledgeClassEnum = Object.freeze({
  Alpha: 'Alpha',
  Beta: 'Beta',
  Gamma: 'Gamma',
  Delta: 'Delta',
});

const PositionEnum = Object.freeze({
  Member: 'Member',
  Academic: 'Academic',
  Brotherhood: 'Brotherhood',
  CommunityService: 'Community Service',
  Historian: 'Historian',
  Professionalism: 'Professionalism',
  PublicRelations: 'Public Relations',
  RiskManagement: 'Risk Management',
  Webmaster: 'Webmaster',
});

module.exports = { MajorEnum, PledgeClassEnum, PositionEnum };
