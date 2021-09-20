const MajorEnum = Object.freeze({
  AEROSPACE: 'Aerospace Engineering',
  BIOMEDICAL: 'Biomedical Engineering',
  CIVIL: 'Civil Engineering',
  CMPE: 'Computer Engineering',
  COMP_SCI: 'Computer Science',
  ELECTRICAL: 'Electrical Engineering',
  GENERAL: 'General Engineering',
  INDUSTRIAL: 'Industrial Engineering',
  INDUSTRIAL_TECH: 'Industrial Technology',
  MATH: 'Math',
  MECHANICAL: 'Mechanical Engineering',
  PACKAGING: 'Packaging',
  SOFTWARE: 'Software Engineering',
  CNS: 'Computer Network Systems',
});

const PledgeClassEnum = Object.freeze({
  FOUNDING: 'Founding',
  ALPHA: 'Alpha',
  BETA: 'Beta',
  GAMMA: 'Gamma',
  DELTA: 'Delta',
  EPSILON: 'Epsilon',
});

const PositionEnum = Object.freeze({
  PLEDGE: 'Pledge',
  MEMBER: 'Member',
  PRESIDENT: 'Regent',
  VICE_PRESIDENT: 'Vice Regent',
  SECRETARY: 'Corresponding Secretary',
  HISTORIAN: 'Historian',
  SCRIBE: 'Scribe',
  PLEDGE_PARENT: 'Pledge Parent',
  ACADEMIC: 'Academic',
  BROTHERHOOD: 'Brotherhood',
  RUSH: 'Rush',
  COMMUNITY_SERVICE: 'Community Service',
  FUNDRAISING: 'Fundraising',
  TREASURER: 'Treasurer',
  PROFESSIONALISM: 'Professionalism',
  PUBLIC_RELATIONS: 'Public Relations',
  RISK_MANAGEMENT: 'Risk Management',
  WEBMASTER: 'Webmaster',
});

module.exports = { MajorEnum, PledgeClassEnum, PositionEnum };
