import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';
import { UserContext } from '../contexts/UserContext';
import loginStyles from '../styles/pages/login.module.scss';

import thetaTauCrest from '../images/theta-tau-crest-black.png';

const Login = (props) => {
  const { setIsAuthenticated, setUser } = useContext(UserContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const onFinish = async (values) => {
    setFormSubmitted(true);

    const brotherData = {
      email: values.email ? values.email : '',
      password: values.password ? values.password : '',
    };

    try {
      const apiResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/login`,
        brotherData
      );
      const { token } = apiResponse.data;
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsAuthenticated(true);
      props.history.push('/dashboard');
    } catch (error) {
      setFormErrors(true);
      setErrorMessages(error.response.data);
    }

    setFormSubmitted(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Helmet>
        <title>Theta Tau | Login</title>
        <meta
          name="description"
          content="Login to the dashboard. SJSU Theta Tau active members only."
        />
      </Helmet>

      <div className={loginStyles.root}>
        <div className={loginStyles.form__container}>
          <div className={loginStyles.title}>
            <h1>Sign In</h1>
            <img src={thetaTauCrest} alt="theta-tau-crest" />
          </div>
          <p>SJSU TT Actives Only</p>
          <Form
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
            <Form.Item
              label="Password"
              name="password"
              validateStatus={formErrors ? 'error' : ''}
              help={errorMessages.password}
            >
              <Input.Password placeholder="Please enter password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                loading={formSubmitted}
                className={loginStyles.submit__button}
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
