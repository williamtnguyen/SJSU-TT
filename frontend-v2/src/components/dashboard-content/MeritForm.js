import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, Switch, Spin } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/UserContext';
import meritFormStyles from '../../styles/components/merit-form.module.scss';

import CURR_PLEDGE_CLASS from '../../util/curr-pledge-class';
import { MeritOperationEnum } from '../../util/enums/merit-enums';
const { TextArea } = Input;
const { Option } = Select;

const MeritForm = () => {
  const { user } = useContext(UserContext);
  const [pledges, setPledges] = useState([]);
  const [operation, setOperation] = useState(MeritOperationEnum.DEMERIT);

  const [isFetching, setIsFetching] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [noPledgeClass, setNoPledgeClass] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [errorMessages, setErrorMesages] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [meritedPledge, setMeritedPledge] = useState('');

  useEffect(() => {
    if (CURR_PLEDGE_CLASS) {
      fetchAllPledges(CURR_PLEDGE_CLASS);
    } else {
      setNoPledgeClass(true);
    }
  }, []);

  const fetchAllPledges = async (currentPledgeClass) => {
    try {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/class/${currentPledgeClass}`
      );
      setPledges(apiResponse.data.currentPledges);
      setFetchError(false);
    } catch (error) {
      setFetchError(true);
    }
    setIsFetching(false);
  };

  const handleToggle = (toggled) => {
    setOperation(
      toggled ? MeritOperationEnum.MERIT : MeritOperationEnum.DEMERIT
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const onFinish = async (values) => {
    setFormSubmitted(true);
    const meritData = {
      pledgeName: pledges[values.pledgeIndex].name,
      issuerName: user.name,
      pledgeID: pledges[values.pledgeIndex].key,
      issuerID: user.id,
      operation,
      description: values.description,
    };

    try {
      const apiResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/merits`,
        meritData
      );
      setSubmitSuccess(true);
      setMeritedPledge(apiResponse.data.storedMerit.pledgeName);
    } catch (error) {
      setFormErrors(true);
      setErrorMesages(error.response.data);
    }
    setFormSubmitted(false);
  };

  return (
    <>
      {isFetching ? (
        <Spin size="large" />
      ) : fetchError ? (
        <h1>Could not fetch user data.</h1>
      ) : noPledgeClass ? (
        <h1>No pledge class at the moment.</h1>
      ) : (
        <div className={meritFormStyles.form__container}>
          {submitSuccess && (
            <p className={meritFormStyles.success__message}>
              Request to {operation.toLowerCase()} {meritedPledge} sucessfully
              sent.
            </p>
          )}

          <Form
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Pledge Name"
              name="pledgeIndex"
              validateStatus={formErrors ? 'error' : ''}
              help={errorMessages.major}
            >
              <Select placeholder="Please choose a pledge">
                {pledges.map((pledgeObject, index) => {
                  return (
                    <Option key={pledgeObject.key} value={index}>
                      {pledgeObject.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <div className={meritFormStyles.operation__toggle}>
              <p
                className={
                  operation === MeritOperationEnum.DEMERIT
                    ? meritFormStyles.curr__operation__text
                    : meritFormStyles.other__operation__text
                }
              >
                Demerit
              </p>
              <Switch
                checkedChildren={<PlusOutlined />}
                unCheckedChildren={<MinusOutlined />}
                onChange={handleToggle}
              />
              <p
                className={
                  operation === MeritOperationEnum.MERIT
                    ? meritFormStyles.curr__operation__text
                    : meritFormStyles.other__operation__text
                }
              >
                Merit
              </p>
            </div>

            <Form.Item
              label="Reason for Request"
              name="description"
              validateStatus={formErrors ? 'error' : ''}
              help={errorMessages.description}
            >
              <TextArea placeholder="Please enter a description" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                loading={formSubmitted}
                className={meritFormStyles.submit__button}
              >
                SUBMIT REQUEST
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default MeritForm;
