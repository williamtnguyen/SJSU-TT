/* eslint-disable indent */
import React, { useState } from 'react';
import { Button } from 'antd';
import {
  MeritManagerTabEnum,
  MeritRequestDispatchEnum,
} from '../../util/enums/merit-enums';
import summaryStyles from '../../styles/components/merit-manager-summary.module.scss';

const MeritManagerSummary = ({
  selectedMeritRequest,
  selectedTab,
  handleDispatch,
  handleDelete,
  wasDispatched,
  dispatchedRequestPledge,
  wasDeleted,
  deletedRequestPledge,
}) => {
  const [noSelectionError, setNoSelectionError] = useState(false);

  const isEmpty = (object) => {
    return Object.values(object).length === 0;
  };

  const handleDispatchWrapper = (buttonType) => {
    if (!isEmpty(selectedMeritRequest)) {
      setNoSelectionError(false);
      handleDispatch(buttonType);
    } else {
      setNoSelectionError(true);
    }
  };

  const handleDeleteWrapper = () => {
    if (!isEmpty(selectedMeritRequest)) {
      setNoSelectionError(false);
      handleDelete();
    } else {
      setNoSelectionError(true);
    }
  };

  return (
    <>
      <div>
        <h1 className={summaryStyles.title}>Merit Summary</h1>

        {noSelectionError && (
          <p className={summaryStyles.error__message}>
            Nothing is selected. Cannot dispatch/delete request.
          </p>
        )}
        {wasDispatched && (
          <p className={summaryStyles.success__message}>
            Merit request for {dispatchedRequestPledge} successfully dispatched.
          </p>
        )}
        {wasDeleted && (
          <p className={summaryStyles.success__message}>
            Merit request for {deletedRequestPledge} successfully deleted.
          </p>
        )}

        <div className={summaryStyles.summary__item}>
          <h3>Pledge:</h3>
          <span>{selectedMeritRequest.pledgeName}</span>
        </div>
        <div className={summaryStyles.summary__item}>
          <h3>Issuer:</h3>
          <span>{selectedMeritRequest.issuerName}</span>
        </div>
        <div className={summaryStyles.summary__item}>
          <h3>Operation:</h3>
          <span>{selectedMeritRequest.operation}</span>
        </div>
        <div>
          <h3>Description:</h3>
          <p>{selectedMeritRequest.description}</p>
        </div>
      </div>
      <div className={summaryStyles.summary__item}>
        <h3>Status:</h3>
        {!isEmpty(selectedMeritRequest) && (
          <span>
            {!selectedMeritRequest.isDispatched
              ? 'PENDING'
              : selectedMeritRequest.isApproved
              ? 'APPROVED'
              : 'DISAPPROVED'}
          </span>
        )}
      </div>

      {selectedTab === MeritManagerTabEnum.PENDING ? (
        <div className={summaryStyles.button__group}>
          <Button
            onClick={() =>
              handleDispatchWrapper(MeritRequestDispatchEnum.APPROVE)
            }
            type="primary"
            shape="round"
            htmlType="button"
            className={summaryStyles.approve}
          >
            APPROVE
          </Button>
          <Button
            onClick={() =>
              handleDispatchWrapper(MeritRequestDispatchEnum.DISAPPROVE)
            }
            type="primary"
            shape="round"
            htmlType="button"
            className={summaryStyles.disapprove}
          >
            DISAPPROVE
          </Button>
        </div>
      ) : (
        <div className={summaryStyles.button__group}>
          <Button
            onClick={() => handleDeleteWrapper()}
            type="primary"
            shape="round"
            htmlType="button"
            className={summaryStyles.delete}
          >
            DELETE
          </Button>
        </div>
      )}
    </>
  );
};

export default MeritManagerSummary;
