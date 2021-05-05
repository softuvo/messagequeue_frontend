import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// API
import { getUserPost, sendUserPost } from '../../api/Post';
import { header } from '../../api/apiActions/apiAction';
// CSS
import './message.css';

function Message() {
    const dispatch = useDispatch();
    const loginUserInfo = useSelector(state => state.user.loginUserInfo);
    const loginUserToken = useSelector(state => state.user.loginUserToken);
    console.log('loginUserInfo', loginUserInfo, 'loginUserToken', loginUserToken);
    const [message, setMessageList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [textMessage, setTextMessage] = useState('');
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

    const handleInput = (event) => {
        setTextMessage(event.target.value);
    }


    function sendMessage(values) {
        let data = {
            data: {
                userId: loginUserInfo._id, message:textMessage
            }
        };
        sendUserPost(data, header).then(res => {
            setTextMessage('');
            getMessageListApi();
        }).catch(err => {
            setLoader(false);
        })
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={6} offset={10} >
                    <div className="send-message-area">
                        <div className="scroller">
                            <div className="message-box">
                            {message.length ? message.map((value, index) => {
                                return (
                                    <React.Fragment key={`${value.author}-${index}`}>
                                        <div key={index} >
                                            <span>{value.body}</span>
                                        </div>
                                    </React.Fragment>
                                )
                            }) : ''}
                            </div>
                        </div>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item>
                            <Input.TextArea value={textMessage} onChange={handleInput} required={textMessage ? false : true} />
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