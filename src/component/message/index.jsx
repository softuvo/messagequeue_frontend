import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// API
import { getUserPost, sendUserPost } from '../../api/Post';
import { header } from '../../api/apiActions/apiAction'

function Message() {
    const dispatch = useDispatch();
    const loginUserInfo = useSelector(state => state.user.loginUserInfo);
    const loginUserToken = useSelector(state => state.user.loginUserToken);
    console.log('loginUserInfo', loginUserInfo, 'loginUserToken', loginUserToken);
    const [message, setMessageList] = useState([])
    const [loader, setLoader] = useState(false);
    const [form] = Form.useForm();


    useEffect(() => {
        if (loginUserToken) {
            getMessageListApi();
        }

    }, [loginUserToken]);



    function getMessageListApi() {
        let data = {
            data: {
                userId: loginUserInfo._id
            }
        };
        getUserPost(data, header).then(res => {
            setMessageList(res.product);
            setLoader(false);
            form.initialValues();

        }).catch(err => {
            setLoader(false);

        })
    }


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setLoader(true);
        sendMessage(values);
    };


    function sendMessage(values) {
        let data = {
            data: {
                userId: loginUserInfo._id, ...values
            }
        };
        sendUserPost(data,header).then(res => {
            getMessageListApi();
        }).catch(err => {
            setLoader(false);

        })
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={12} offset={6}>
                    {message.length ? message.map((value, index) => {
                        return (
                            <React.Fragment key={value.author}>
                                <div key={index}>
                                <span >{value.body}</span>
                                </div>
                            </React.Fragment>
                        )
                    }) : ''}
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your message!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loader}>Send Message</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </React.Fragment>
    )
}
export default Message;