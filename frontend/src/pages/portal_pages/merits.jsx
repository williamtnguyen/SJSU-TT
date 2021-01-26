import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import meritsStyles from './merits.module.scss';

import CURR_PLEDGE_CLASS from '../../util/curr-pledge-class';

const Merits = () => {
  const [didMount, setDidMount] = useState(false);
  const [pledges, setPledges] = useState({});
  const [currUserIsPledge, setCurrUserIsPledge] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (didMount) {
      if (CURR_PLEDGE_CLASS) {
        fetchPledges();
      }
    } else {
      setDidMount(true);
    }
  }, [didMount]);

  const isEmpty = (object) => {
    return Object.keys(object).length === 0;
  };

  const fetchPledges = async () => {
    try {
      const apiResponse = await axios.get(`/api/brothers/${CURR_PLEDGE_CLASS}`);
      setPledges(apiResponse.data.currentPledges);
      setCurrUserIsPledge(
        apiResponse.data.userPledgeClass === CURR_PLEDGE_CLASS
      );
    } catch (error) {
      setFetchError(true);
    }
  };

  const getRowColor = (meritCount) => {
    if (meritCount >= 11) {
      return 'table-success';
    }
    if (meritCount >= 6) {
      return 'table-warning';
    }
    return 'table-danger';
  };

  const redirectToDashboard = () => {
    navigate('/portal/dashboard');
  };

  return (
    <div className={meritsStyles.root}>
      <button
        onClick={() => redirectToDashboard()}
        type="button"
        className="btn mb-3 text-white"
      >
        ← Back to dashboard
      </button>
      <div className="card">
        <div className="card-body">
          <h1 className="mb-3">
            <b>{CURR_PLEDGE_CLASS} Class</b> merit count
          </h1>
          <div className={meritsStyles.card__content}>
            {fetchError ? (
              <p>Cannot fetch pledge information.</p>
            ) : (
              <div className={meritsStyles.table__container}>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      {!currUserIsPledge && <th scope="col">Name</th>}
                      <th scope="col">Student ID</th>
                      <th scope="col">Merit Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(pledges) &&
                      Object.keys(pledges).map((pledgeName) => (
                        <tr
                          key={pledges[pledgeName].studentID}
                          className={getRowColor(
                            Number(pledges[pledgeName].meritCount)
                          )}
                        >
                          {!currUserIsPledge && <td>{pledgeName}</td>}
                          <td>{pledges[pledgeName].studentID}</td>
                          <td>{pledges[pledgeName].meritCount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merits;
