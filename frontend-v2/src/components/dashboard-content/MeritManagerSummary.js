/* eslint-disable indent */
import React, { useState } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import {
  MeritManagerTabEnum,
  MeritRequestDispatchEnum,
} from '../../util/enums/merit-enums';
import { operationTags, statusTags } from '../../util/table-tags';
import summaryStyles from '../../styles/components/merit-manager-summary.module.scss';

const MeritManagerSummary = ({
  selectedMeritRequest,
  selectedTab,
  handleDispatch,
  handleDelete,
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
        <h1 className={summaryStyles.title}>Merit Request Summary</h1>

        <Divider />

        {noSelectionError && (
          <p className={summaryStyles.error__message}>
            Nothing is selected. Cannot dispatch/delete request.
          </p>
        )}

        <Row>
          <Col sm={24} md={12}>
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
              <span>{operationTags[selectedMeritRequest.operation]}</span>
            </div>
          </Col>
          <Col sm={24} md={12}>
            <div className={summaryStyles.summary__item}>
              <h3>Status:</h3>
              <span>{statusTags[selectedMeritRequest.status]}</span>
            </div>
            <div className={summaryStyles.summary__item}>
              <h3>Submission Date:</h3>
              <span>{selectedMeritRequest.submissionDate}</span>
            </div>
            {selectedTab === MeritManagerTabEnum.DISPATCHED && (
              <div className={summaryStyles.summary__item}>
                <h3>Dispatch Date:</h3>
                <span>{selectedMeritRequest.dispatchDate}</span>
              </div>
            )}
          </Col>
          <Col sm={24}>
            <div className={summaryStyles.summary__item}>
              <h3>Description:</h3>
              <p>{selectedMeritRequest.description}</p>
            </div>
          </Col>
        </Row>
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
