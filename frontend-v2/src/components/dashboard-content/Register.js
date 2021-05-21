import React, { useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Checkbox,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import registerStyles from '../../styles/components/register.module.scss';

import {
  MajorEnum,
  PositionEnum,
  PledgeClassEnum,
} from '../../util/enums/brother-enums';
import thetaTauCrest from '../../images/theta-tau-crest-black.png';
const { Option } = Select;

const Register = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registeredBrother, setRegisteredBrother] = useState('');
  const [formErrors, setFormErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const onFinish = async (values) => {
    setFormSubmitted(true);

    const brotherData = {
      name: values.name,
      email: values.email,
      studentID: values.studentID,
      phoneNumber: values.phoneNumber,
      major: values.major,
      graduatingYear: values.graduatingYear,
      pledgeClass: values.pledgeClass,
      position: values.position,
      isGraduated: values.isGraduated,
      isActive: values.isActive,
      imageFile: values.upload ? values.upload.file.originFileObj : null,
    };
    const formData = makeFormData(brotherData);

    try {
      const apiResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/auth/register`,
        formData
      );
      setSubmitSuccess(true);
      setRegisteredBrother(apiResponse.data.name);
    } catch (error) {
      setFormErrors(true);
      setErrorMessages(error.response.data);
    }
    setFormSubmitted(false);
  };

  return (
    <div className={registerStyles.root}>
      <Row gutter={32}>
        <Col sm={24} md={12}>
          <div className={registerStyles.form__container}>
            <div className={registerStyles.title}>
              <h1>
                <b>Register</b> a brother
              </h1>
              <img src={thetaTauCrest} alt="theta-tau-crest" />
            </div>

            {submitSuccess && (
              <p className={registerStyles.success__message}>
                {registeredBrother} successfully updated.
              </p>
            )}

            <Form
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Name"
                name="name"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.name}
              >
                <Input placeholder="Please enter name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.email}
              >
                <Input placeholder="Please enter email" />
              </Form.Item>

              <Form.Item
                label="Student ID"
                name="studentID"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.studentID}
              >
                <Input placeholder="Please enter student ID" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.phoneNumber}
              >
                <Input placeholder="Please enter phone number" />
              </Form.Item>

              <Form.Item
                label="Major"
                name="major"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.major}
              >
                <Select placeholder="Please select a major">
                  {Object.values(MajorEnum).map((majorListItem) => {
                    return (
                      <Option key={majorListItem} value={majorListItem}>
                        {majorListItem}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Graduating Year"
                name="graduatingYear"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.graduatingYear}
              >
                <InputNumber
                  placeholder="Please enter graduating year"
                  className={registerStyles.number__input}
                />
              </Form.Item>

              <Form.Item
                label="Pledge Class"
                name="pledgeClass"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.pledgeClass}
              >
                <Select placeholder="Please select pledge class">
                  {Object.values(PledgeClassEnum).map((pledgeClassItem) => {
                    return (
                      <Option key={pledgeClassItem} value={pledgeClassItem}>
                        {pledgeClassItem}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Position"
                name="position"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.position}
              >
                <Select placeholder="Please select a position">
                  {Object.values(PositionEnum).map((positionItem) => {
                    return (
                      <Option key={positionItem} value={positionItem}>
                        {positionItem}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item name="upload" label="Headshot" valuePropName="file">
                <Upload
                  name="headshot"
                  accept="image/png, image/jpeg"
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="isGraduated" valuePropName="checked">
                <Checkbox>Is Graduated?</Checkbox>
              </Form.Item>

              <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Is Active?</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  loading={formSubmitted}
                  className={registerStyles.submit__button}
                >
                  REGISTER BROTHER
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Creates a FormData object to pass to Register endpoint (allows for file inputs)
const makeFormData = (brotherData) => {
  const formData = new FormData();
  const entries = Object.entries(brotherData);

  for (const [key, value] of entries) {
    formData.append(key, value);
  }
  return formData;
};

export default Register;
