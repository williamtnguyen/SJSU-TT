import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
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

const DashboardContent = ({
  name,
  studentID,
  pledgeClass,
  position,
  major,
  graduatingYear,
  imagePath,
}) => {
  return (
    <div className={`${dashboardStyles.dashboard__content} row no-gutters`}>
      <div className="col-md-7">
        <div className={dashboardStyles.profile__container}>
          <div className={dashboardStyles.profile__content}>
            <div className={dashboardStyles.profile__picture}>
              <img
                className="img-thumbnail"
                src={`${process.env.HEADSHOT_S3_BUCKET_URL}/${imagePath}`}
                alt="headshot"
              />
            </div>
            <h1>{name}</h1>
            <div className={dashboardStyles.profile__item}>
              <h6>Student ID:</h6>
              <span>{studentID}</span>
            </div>
            <div className={dashboardStyles.profile__item}>
              <h6>Pledge Class:</h6>
              <span>{pledgeClass}</span>
            </div>
            <div className={dashboardStyles.profile__item}>
              <h6>Position:</h6>
              <span>{position}</span>
            </div>
            <div className={dashboardStyles.profile__item}>
              <h6>Major:</h6>
              <span>{major}</span>
            </div>
            <div className={dashboardStyles.profile__item}>
              <h6>Graduating Year:</h6>
              <span>{graduatingYear}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  const [brotherData, setBrotherData] = useState({});
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (props.auth.user.id) {
      fetchBrotherData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.user.id]);

  const fetchBrotherData = async () => {
    try {
      const apiResponse = await axios.get(
        `/api/brothers/dashboard/${props.auth.user.id}`
      );
      setBrotherData(apiResponse.data);
    } catch (error) {
      setFetchError(true);
    }
  };

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
              pledgeClass={brotherData.pledgeClass}
              position={brotherData.position}
              handleLogout={handleLogout}
            />
          </div>
          <div className="col-md-10">
            {!fetchError && (
              <DashboardContent
                name={props.auth.user.name}
                studentID={brotherData.studentID}
                pledgeClass={brotherData.pledgeClass}
                position={brotherData.position}
                major={brotherData.major}
                graduatingYear={brotherData.graduatingYear}
                imagePath={brotherData.imagePath}
              />
            )}
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

DashboardContent.propTypes = {
  name: PropTypes.string,
  studentID: PropTypes.number,
  pledgeClass: PropTypes.string,
  position: PropTypes.string,
  major: PropTypes.string,
  graduatingYear: PropTypes.number,
  imagePath: PropTypes.string,
};

DashboardContent.defaultProps = {
  name: '',
  studentID: -1,
  pledgeClass: '',
  position: '',
  major: '',
  graduatingYear: -1,
  imagePath: '',
};

Dashboard.propTypes = {
  logoutBrother: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
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
