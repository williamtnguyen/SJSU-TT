import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Spin, Button } from 'antd';
import { UserContext } from '../../contexts/UserContext';
import overviewStyles from '../../styles/components/account-overview.module.scss';

const AccountOverview = (props) => {
  const { setIsAuthenticated, setUser } = useContext(UserContext);
  const [brotherData, setBrotherData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchCurrBrotherData();
  }, []);

  const fetchCurrBrotherData = async () => {
    try {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/me/dashboard`
      );
      setBrotherData(apiResponse.data);
      setIsFetching(false);
    } catch (error) {
      setFetchError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser({});
    setIsAuthenticated(false);
  };

  return (
    <div className={overviewStyles.root}>
      {isFetching ? (
        <Spin size="large" />
      ) : fetchError ? (
        <h1>Could not fetch data about current user.</h1>
      ) : (
        <>
          <img
            src={`${process.env.REACT_APP_HEADSHOT_S3_BUCKET_URL}/${brotherData.imagePath}`}
            alt="brother-headshot"
            className={overviewStyles.headshot}
          />
          <h1 className={overviewStyles.name}>{brotherData.name}</h1>
          <div className={overviewStyles.profile__item}>
            <h3>Student ID:</h3>
            <span>{brotherData.studentID}</span>
          </div>
          <div className={overviewStyles.profile__item}>
            <h3>Pledge Class:</h3>
            <span>{brotherData.pledgeClass}</span>
          </div>
          <div className={overviewStyles.profile__item}>
            <h3>Position:</h3>
            <span>{brotherData.position}</span>
          </div>
          <div className={overviewStyles.profile__item}>
            <h3>Major:</h3>
            <span>{brotherData.major}</span>
          </div>
          <div className={overviewStyles.profile__item}>
            <h3>Graduating Year:</h3>
            <span>{brotherData.graduatingYear}</span>
          </div>
          <div className={overviewStyles.profile__item}>
            <Button
              onClick={handleLogout}
              shape="round"
              className={overviewStyles.signout__button}
            >
              SIGN OUT
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOverview;
