import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
// API
import { signupAPI } from '../../../api/Auth';
import { header } from '../../../api/apiActions/apiAction';

function SignUp(props) {
    const [loader, setLoader] = useState(false)

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setLoader(true);
        signUpApi(values);
    };

    function signUpApi(value) {
        let data = {
            data: { ...value }
            // ...value
        };
        signupAPI(data, header).then(res => {
            setLoader(false);
            message.success(res.message);
            props.history.push('/');
        }).catch(err => {
            message.error(err ? err.data.message : '');
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
                        {/* <Form.Item
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First name!',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="first name" />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last name!',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="last name" />
                        </Form.Item> */}
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input
                             prefix={<UserOutlined className="site-form-item-icon" />}
                            type="email" placeholder="email" />
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
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loader}>Sign Up</Button>Or <Link to="/login">login!</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default SignUp;