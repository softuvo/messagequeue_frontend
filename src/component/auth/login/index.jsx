import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, message,Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// API
import { login } from '../../../api/Auth';
import { header } from '../../../api/apiActions/apiAction';
// REDUCER
import { setLoginUserInfo, setLoginUserToken } from '../../../redux/slices/authSlice'
// CSS
import './login.css';
const { Title } = Typography;

function Login(props) {
    const dispatch = useDispatch();
    const loginUserInfo = useSelector(state => state.user.loginUserInfo);
    const loginUserToken = useSelector(state => state.user.loginUserToken);
    console.log('loginUserInfo', loginUserInfo, 'loginUserToken', loginUserToken);

    const [loader, setLoader] = useState(false)

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setLoader(true);
        loginApi(values);
    };

    function loginApi(value) {
        let data = {
            user: { ...value }
        };
        login(data, header).then(res => {
            setLoader(false);
            localStorage.setItem('token',res.user.token);
            localStorage.setItem('userId',res.user._id);
            dispatch(setLoginUserToken(res.user.token));
            dispatch(setLoginUserInfo(res.user));
            localStorage.setItem('token',res.user.token);

            message.success(res.message);
            props.history.push('/');
        }).catch(err => {
            message.error(err?`emailorpassword ${err.data.errors.emailorpassword}`:'');
            setLoader(false);
        })
    }
    return (
        <React.Fragment>
            <Row className="mt-5">
                <Col span={6} offset={10} id="components-form-demo-normal-login">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                                    <Title level={2}>Login Form</Title>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            {/* <Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>Remember me</Checkbox></Form.Item>
                            <Link to="" className="login-form-forgot">Forgot password</Link> */}
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loader}>Log in</Button>Or <Link to="/signup">register now!</Link>
                        </Form.Item>
                        {/* <Form.Item>
                        </Form.Item> */}
                    </Form>
                </Col>
            </Row>

        </React.Fragment >
    )
}
export default Login;