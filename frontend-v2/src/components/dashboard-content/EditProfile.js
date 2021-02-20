import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Row, Col, Form, Input, Button, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/UserContext';
import editStyles from '../../styles/components/edit-profile.module.scss';

import thetaTauCrest from '../../images/theta-tau-crest-black.png';
import editIllustration from '../../images/edit-illustration.png';

const { TextArea } = Input;

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [form] = Form.useForm();
  const [currBrotherData, setCurrBrotherData] = useState({});

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [noEditError, setNoEditError] = useState(false);
  const [samePassError, setSamePassError] = useState(false);
  const [newPassMatchError, setNewPassMatchError] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    assignInputValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignInputValues = async () => {
    try {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/me/edit`
      );

      // Cache current state for client-side validation
      setCurrBrotherData(apiResponse.data);
      form.setFieldsValue({
        email: apiResponse.data.email,
        major: apiResponse.data.major,
        graduatingYear: apiResponse.data.graduatingYear,
        biography: apiResponse.data.biography,
      });
    } catch (error) {
      setFetchError(true);
    }
  };

  const handleToggle = (event) => {
    setIsChangingPassword(event);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (values) => {
    setFormSubmitted(true);

    if (isChangingPassword && values.oldPassword === values.newPassword) {
      setSamePassError(true);
      return;
    }
    if (
      isChangingPassword &&
      values.newPassword !== values.confirmNewPassword
    ) {
      setNewPassMatchError(true);
      return;
    }

    const formData = {
      email: values.email,
      major: values.major,
      graduatingYear: values.graduatingYear,
      biography: values.biography,
    };
    const delta = findDelta(currBrotherData, formData);
    const fieldsEdited = !isEmpty(delta) || isChangingPassword;

    if (!fieldsEdited) {
      setNoEditError(true);
    } else {
      setNoEditError(false);

      if (isChangingPassword) {
        delta.oldPassword = values.oldPassword;
        delta.newPassword = values.newPassword;
      }

      try {
        axios.put(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/me`,
          delta
        );
        setSubmitSuccess(true);
        setFormSubmitted(false);
      } catch (error) {
        setFormErrors(true);
        setErrorMessages(error.response.data);
        setFormSubmitted(false);
      }
    }
  };

  return (
    <div className={editStyles.root}>
      <Row gutter={32} className={editStyles.row}>
        <Col sm={24} md={12}>
          <div className={editStyles.form__container}>
            <div className={editStyles.title}>
              <h1>Edit Profile</h1>
              <img src={thetaTauCrest} alt="theta-tau-crest" />
            </div>
            {submitSuccess && (
              <p className={editStyles.success__message}>
                {user.name} successfully updated.
              </p>
            )}

            <Form
              form={form}
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.email}
              >
                <Input placeholder="Please enter email" />
              </Form.Item>

              <div className={editStyles.password__toggle}>
                <p>Changing password?</p>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={handleToggle}
                />
              </div>

              {isChangingPassword && (
                <div className={editStyles.password__fields}>
                  <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    validateStatus={formErrors ? 'error' : ''}
                    help={errorMessages.password}
                  >
                    <Input.Password placeholder="Please enter old password" />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    validateStatus={formErrors ? 'error' : ''}
                    help={errorMessages.password}
                  >
                    <Input.Password placeholder="Please enter new password" />
                  </Form.Item>
                  <Form.Item
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    validateStatus={formErrors ? 'error' : ''}
                    help={errorMessages.password}
                  >
                    <Input.Password placeholder="Please confirm new password" />
                  </Form.Item>
                </div>
              )}

              <div className={editStyles.other__fields}>
                <Form.Item
                  label="Major"
                  name="major"
                  validateStatus={formErrors ? 'error' : ''}
                  help={errorMessages.major}
                >
                  <Input placeholder="Please enter major" />
                </Form.Item>
                <Form.Item
                  label="Graduating Year"
                  name="graduatingYear"
                  validateStatus={formErrors ? 'error' : ''}
                  help={errorMessages.major}
                >
                  <Input placeholder="Please enter graduating year" />
                </Form.Item>
                <Form.Item
                  label="Biography"
                  name="biography"
                  rules={[{ required: false }]}
                  validateStatus={formErrors ? 'error' : ''}
                  help={errorMessages.major}
                >
                  <TextArea placeholder="Please enter biography" />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  loading={formSubmitted}
                  className={editStyles.submit__button}
                >
                  EDIT PROFILE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col sm={24} md={12} className={editStyles.illustration__col}>
          <div className={editStyles.illustration}>
            <img src={editIllustration} alt="edit-illustration" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

/**
 * Returns an object of changed fields for currently logged in user
 * @param {*} currentBrotherData data currently saved in DB
 * @param {*} updatedBrotherData data currently in form inputs
 */
const findDelta = (currentBrotherData, updatedBrotherData) => {
  const delta = {};
  Object.keys(updatedBrotherData).forEach((field) => {
    if (
      (updatedBrotherData[field] === '' && field === 'biography') ||
      (updatedBrotherData[field] !== '' &&
        currentBrotherData[field] !== updatedBrotherData[field])
    ) {
      delta[field] = updatedBrotherData[field];
    }
  });
  return delta;
};

const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

export default EditProfile;
