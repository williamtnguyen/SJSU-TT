import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { logoutBrother } from '../../redux/actions/authActions';
import Navbar from '../../components/NavBar';
import dashboardStyles from './dashboard.module.scss';

import {
  PledgeClassEnum,
  PositionEnum,
} from '../../../../server/routes/api/util/enums/brother-enums';

/**
 * Tells if the logged in user can view a TaskBar item with expectedPosition
 * @param {*} expectedPosition the position that can use the TaskBar item
 * @param {*} actualPosition the actual position of the logged in user
 */
const positionHasFeature = (expectedPosition, actualPosition) => {
  return (
    actualPosition === PositionEnum.Webmaster ||
    actualPosition === expectedPosition
  );
};

const isCurrentlyPledging = (pledgeClass) => {
  const pledgeClasses = Object.values(PledgeClassEnum);
  return pledgeClass === pledgeClasses[pledgeClasses.length - 1];
};

const TaskBar = ({ pledgeClass, position, handleLogout }) => {
  return (
    <div className={dashboardStyles.task__bar}>
      <h3 className={dashboardStyles.task__bar__title}>ΘΤ Portal</h3>
      <div>
        <Link
          to="/portal/dashboard"
          className={dashboardStyles.task__bar__item}
        >
          Home
        </Link>
      </div>
      <div>
        <Link to="/portal/edit" className={dashboardStyles.task__bar__item}>
          Edit profile
        </Link>
      </div>
      {!isCurrentlyPledging(pledgeClass) && (
        <div>
          <Link
            to="/portal/dashboard"
            className={dashboardStyles.task__bar__item}
          >
            Demerit pledge
          </Link>
        </div>
      )}
      {positionHasFeature(PledgeClassEnum.Webmaster, position) && (
        <div>
          <Link
            to="/portal/register"
            className={dashboardStyles.task__bar__item}
          >
            Register brother
          </Link>
        </div>
      )}
      <div>
        <div
          role="button"
          onClick={() => handleLogout()}
          onKeyPress={() => handleLogout()}
          tabIndex={0}
          className={dashboardStyles.task__bar__item}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  const handleLogout = () => {
    props.logoutBrother();
  };

  return (
    <div>
      <Navbar />
      <div className={dashboardStyles.root}>
        <div className={`${dashboardStyles.body} row no-gutters`}>
          <div className="col-md-2">
            <TaskBar
              pledgeClass={props.auth.user.pledgeClass}
              position={props.auth.user.position}
              handleLogout={handleLogout}
            />
          </div>
          <div className="col-md-10">
            <div className={dashboardStyles.calendar__container}>
              <iframe
                title="tt-events-calendar"
                src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23E4C441&amp;ctz=America%2FLos_Angeles&amp;src=c2pzdS5lZHVfZzFpYTJsYzZmYmVnMGxyNTdvaDlsM2Q2ZzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%233F51B5&amp;mode=MONTH&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0"
                style={{ border: 'solid 1px #777' }}
                width="1000"
                height="600"
                frameBorder={0}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  pledgeClass: PropTypes.string,
  position: PropTypes.string,
};

TaskBar.defaultProps = {
  pledgeClass: '',
  position: '',
};

Dashboard.propTypes = {
  logoutBrother: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      pledgeClass: PropTypes.string,
      position: PropTypes.string,
    }),
  }),
};

Dashboard.defaultProps = {
  auth: {},
};

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
});

export default connect(mapStateToProps, { logoutBrother })(Dashboard);
