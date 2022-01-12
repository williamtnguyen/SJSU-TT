import React, { useEffect, useState } from 'react';
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
  Table,
  Spin,
  Dropdown,
  Menu,
  Switch,
} from 'antd';
import { UploadOutlined, DownOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import adminStyles from '../../styles/components/webmaster-admin.module.scss';
const { TextArea } = Input;

import {
  MajorEnum,
  PositionEnum,
  PledgeClassEnum,
} from '../../util/enums/brother-enums';
import thetaTauCrest from '../../images/theta-tau-crest-black.png';
const { Option } = Select;

const WebmasterAdmin = () => {
  // left table state
  const [queryParams, setQueryParams] = useState({
    brotherType: 'Actives',
    pledgeClass: 'All',
  });
  const [isFetching, setIsFetching] = useState(true);
  const [brothers, setBrothers] = useState([]);
  const [selectedBrother, setSelectedBrother] = useState(null);

  // right table state
  const [form] = Form.useForm();
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
    fetchBrothers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const fetchBrothers = async () => {
    try {
      setIsFetching(true);
      const queryString = createQueryParamString(queryParams);
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/${queryString}`
      );
      setBrothers(apiResponse.data);
      setSelectedBroAndAssignInputVals(apiResponse?.data[0]);
      setIsFetching(false);
    } catch (error) {
      setFetchError(true);
    }
  };

  const createQueryParamString = (queryParamsObj) => {
    return Object.entries(queryParamsObj).reduce((acc, curr, index) => `${acc}${index === 0 ? '' : '&'}${curr[0]}=${curr[1]}`, '?');
  };

  const setSelectedBroAndAssignInputVals = (brother) => {
    setSelectedBrother(brother);
    if (!brother) {
      return form.resetFields();
    }
    const {
      name,
      email,
      studentID,
      phoneNumber,
      major,
      graduatingYear,
      pledgeClass,
      position,
      isGraduated,
      isActive,
      biography,
      imagePath,
    } = brother;
    return form.setFieldsValue({
      name,
      email,
      studentID,
      phoneNumber,
      major,
      graduatingYear,
      pledgeClass,
      position,
      isGraduated,
      isActive,
      biography,
      imagePath,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const onFinish = async (values) => {
    setFormSubmitted(true);
    const {
      name,
      email,
      studentID,
      phoneNUmber,
      major,
      graduatingYear,
      pledgeClass,
      position,
      isGraduated,
      isActive,
      biography,
      imagePath,
    } = values;
    const formData = {
      name,
      email,
      studentID,
      phoneNUmber,
      major,
      graduatingYear,
      pledgeClass,
      position,
      isGraduated,
      isActive,
      biography,
      imagePath,
    };
    const delta = findDelta(selectedBrother, formData);
    const fieldsEdited = !isEmpty(delta);

    if (!fieldsEdited) {
      setNoEditError(true);
      setFormSubmitted(false);
    } else {
      setNoEditError(false);

      // TODO: PUT call
      setSubmitSuccess(true);
      setFormSubmitted(false);
    }
  };

  const updateQueryParams = (key, value) => {
    setQueryParams({
      ...queryParams,
      [key]: value,
    });
  };

  const BrotherTypeDropdownMenu = () => {
    return (
      <Menu onClick={(itemEvent) => updateQueryParams('brotherType', itemEvent.key)}>
        <Menu.Item key="Actives">Actives</Menu.Item>
        <Menu.Item key="Alumni">Alumni</Menu.Item>
        <Menu.Item key="Inactives">Inactives</Menu.Item>
      </Menu>
    );
  };

  const PledgeClassDropDownMenu = () => {
    return (
      <Menu onClick={(itemEvent) => updateQueryParams('pledgeClass', itemEvent.key)}>
        {
          ['All'].concat(
            Object.values(PledgeClassEnum)
          ).map((pledgeClass) => (
            <Menu.Item key={pledgeClass}>{pledgeClass}</Menu.Item>
          ))
        }
      </Menu>
    );
  };

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Major',
      dataIndex: 'major',
    },
    {
      title: 'Pledge Class',
      dataIndex: 'pledgeClass',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    }
  ];

  if (isFetching) {
    return (
      <div className={adminStyles.spinner__container}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={adminStyles.root}>
      <Row gutter={32}>
        <Col sm={24} md={14}>
          <div className={adminStyles.content}>
            <div className={adminStyles.title}>
              <h1>
                <b>Webmaster </b>Admin
              </h1>
              <img src={thetaTauCrest} alt="theta-tau-crest" />
            </div>
            <p>Select a row to view/edit brother information.</p>

            <div className={adminStyles.dropdown__container}>
              <span className={adminStyles.dropdown__label__right}>Currently viewing</span>
              <Dropdown overlay={BrotherTypeDropdownMenu}>
                <Button shape="round">
                  {queryParams.brotherType} <DownOutlined />
                </Button>
              </Dropdown>
              <span className={`${adminStyles.dropdown__label__left} ${adminStyles.dropdown__label__right}`}>from</span>
              <Dropdown overlay={PledgeClassDropDownMenu}>
                <Button shape="round">
                  {queryParams.pledgeClass} <DownOutlined />
                </Button>
              </Dropdown>
              <span className={adminStyles.dropdown__label__left}>class</span>
            </div>

            <Table
              onRow={(brother) => ({
                onClick: () => {
                  setSelectedBroAndAssignInputVals(brother);
                },
              })}
              columns={tableColumns}
              dataSource={brothers}
              size="default"
              className={adminStyles.table}
            />
          </div>
        </Col>

        {selectedBrother && (
          <Col sm={24} md={10} className={adminStyles.edit__column}>
            <div className={adminStyles.card__container}>
              <div
                className={
                  adminStyles.brother__headshot__container
                }
              >
                {selectedBrother.imagePath ? (
                  <img
                    className={adminStyles.brother__headshot}
                    src={`${process.env.REACT_APP_HEADSHOT_S3_BUCKET_URL}/${selectedBrother.imagePath}`}
                    alt="brother-headshot"
                  />
                ) : (<p>{selectedBrother.name} has no headshot!</p>)}
              </div>
              <div className={adminStyles.card__overlay} />
              <div className={adminStyles.card__info}>
                <div className={adminStyles.card__info__item}>
                  <h3>Major:</h3>
                  <span>{selectedBrother.major}</span>
                </div>
                <div className={adminStyles.card__info__item}>
                  <h3>Graduating Year:</h3>
                  <span>{selectedBrother.graduatingYear}</span>
                </div>
                <div className={adminStyles.card__info__item}>
                  <h3>Class:</h3>
                  <span>{selectedBrother.pledgeClass}</span>
                </div>
                <div className={adminStyles.card__info__item}>
                  <h3>Position:</h3>
                  <span>{selectedBrother.position}</span>
                </div>
                {selectedBrother.biography !== '' && (
                  <div className={adminStyles.card__info__item}>
                    <h3>Bio:</h3>
                    <span>{selectedBrother.biography}</span>
                  </div>
                )}
              </div>
            </div>
            <h2 className={adminStyles.brother__name}>
              {selectedBrother.name}
            </h2>

            {/* FORM */}
            {noEditError && (
              <p className={adminStyles.error__message}>No edits were made.</p>
            )}
            {samePassError && (
              <p className={adminStyles.error__message}>
                You may not use the same password.
              </p>
            )}
            {newPassMatchError && (
              <p className={adminStyles.error__message}>
                Passwords do not match.
              </p>
            )}
            {submitSuccess && (
              <p className={adminStyles.success__message}>
                {selectedBrother.name} successfully updated.
              </p>
            )}

            <Form
              form={form}
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className={adminStyles.form}
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
                <Input placeholder="Please enter Student ID" />
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
                label="New Password"
                name="newPassword"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.password}
              >
                <Input.Password placeholder="Please enter new password" />
              </Form.Item>

              <Form.Item
                label="Major"
                name="major"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.major}
              >
                <Select defaultValue={selectedBrother.major}>
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
                help={errorMessages.major}
              >
                <InputNumber
                  placeholder="Please enter graduating year"
                  className={adminStyles.number__input}
                />
              </Form.Item>
              <Form.Item
                label="Pledge Class"
                name="pledgeClass"
                validateStatus={formErrors ? 'error' : ''}
                help={errorMessages.pledgeClass}
              >
                <Select defaultValue={selectedBrother.pledgeClass}>
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
                <Select defaultValue={selectedBrother.position}>
                  {Object.values(PositionEnum).map((positionItem) => {
                    return (
                      <Option key={positionItem} value={positionItem}>
                        {positionItem}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item name="isGraduated" valuePropName="checked">
                <Checkbox>Is Graduated?</Checkbox>
              </Form.Item>

              <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Is Active?</Checkbox>
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

              <Form.Item>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  loading={formSubmitted}
                  className={adminStyles.submit__button}
                >
                  EDIT PROFILE
                </Button>
              </Form.Item>
            </Form>
          </Col>
        )}
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
      (field === 'biography' &&
        currentBrotherData[field] !== '' &&
        updatedBrotherData[field] === '') ||
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

export default WebmasterAdmin;
