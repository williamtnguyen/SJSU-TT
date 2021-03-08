import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Spin, Modal } from 'antd';
import {
  MeritManagerTabEnum,
  MeritRequestDispatchEnum,
} from '../../util/enums/merit-enums';
import MeritManagerTable from './MeritManagerTable';
import MeritManagerSummary from './MeritManagerSummary';
import meritStyles from '../../styles/components/merit-manager.module.scss';

const MeritManager = () => {
  const [allMeritRequests, setAllMeritRequests] = useState({
    pending: [],
    dispatched: [],
  });
  const [selectedTab, setSelectedTab] = useState(MeritManagerTabEnum.PENDING);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeritRequest, setSelectedMeritRequest] = useState({});
  const [wasDispatched, setWasDispatched] = useState(false);
  const [dispatchedRequestPledge, setDispatchedRequestPledge] = useState('');
  const [wasDeleted, setWasDeleted] = useState(false);
  const [deletedRequestPledge, setDeletedRequestPledge] = useState('');

  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    getMeritRequests();
  }, [wasDispatched, wasDeleted]);

  const getMeritRequests = async () => {
    try {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/merits`
      );
      setAllMeritRequests(apiResponse.data);
    } catch (error) {
      setFetchError(true);
    }
    setIsFetching(false);
  };

  // Handler function for approving/disapproving merit requests
  const handleDispatch = async (buttonType) => {
    const isMeritApproved = buttonType === MeritRequestDispatchEnum.APPROVE;
    const dispatchData = {
      isMeritApproved,
      meritPayload: selectedMeritRequest,
    };

    try {
      const apiResponse = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/merits`,
        dispatchData
      );
      setWasDispatched(true);
      setDispatchedRequestPledge(apiResponse.data.pledgeName);
      setSelectedMeritRequest({});
      setIsModalVisible(false);
    } catch (error) {
      setWasDispatched(false);
      setDispatchedRequestPledge('');
    }
  };

  const setSelectedMeritRequestWrapper = (meritRequest) => {
    setSelectedMeritRequest(meritRequest);
    setWasDispatched(false);
    setDispatchedRequestPledge('');
    setWasDeleted(false);
    setDeletedRequestPledge('');
  };

  // Handler function for deleting merit requests in 'dispatched' tab
  const handleDelete = async () => {
    const meritRequestID = selectedMeritRequest.key;
    const { pledgeName } = selectedMeritRequest;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/merits/${meritRequestID}`
      );
      setWasDeleted(true);
      setDeletedRequestPledge(pledgeName);
      setSelectedMeritRequest({});
      setIsModalVisible(false);
    } catch (error) {
      setWasDeleted(false);
      setDeletedRequestPledge('');
    }
  };

  return (
    <div className={meritStyles.root}>
      <h1 className={meritStyles.title}>Merit Manager</h1>
      <p>Select a row to view merit request details.</p>

      {wasDispatched && (
        <p className={meritStyles.success__message}>
          Merit request for {dispatchedRequestPledge} successfully dispatched.
        </p>
      )}
      {wasDeleted && (
        <p className={meritStyles.success__message}>
          Merit request for {deletedRequestPledge} successfully deleted.
        </p>
      )}

      {isFetching ? (
        <Spin size="large" />
      ) : fetchError ? (
        <h1>Could not fetch merits from server.</h1>
      ) : (
        <>
          <Row gutter={32}>
            <Col sm={24} md={18}>
              <MeritManagerTable
                allMeritRequests={allMeritRequests}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setIsModalVisible={setIsModalVisible}
                selectedMeritRequest={selectedMeritRequest}
                setSelectedMeritRequest={setSelectedMeritRequestWrapper}
              />
            </Col>
          </Row>

          <Modal
            visible={isModalVisible}
            centered
            footer={null}
            onCancel={() => setIsModalVisible(false)}
          >
            <MeritManagerSummary
              selectedMeritRequest={selectedMeritRequest}
              selectedTab={selectedTab}
              handleDispatch={handleDispatch}
              handleDelete={handleDelete}
              wasDispatched={wasDispatched}
              dispatchedRequestPledge={dispatchedRequestPledge}
              wasDeleted={wasDeleted}
              deletedRequestPledge={deletedRequestPledge}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default MeritManager;
