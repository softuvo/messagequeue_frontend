import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// API
import { getUserPost, sendUserPost, fetchRandomMessage } from '../../api/Post';
import { header } from '../../api/apiActions/apiAction';
// CSS
import './message.css';
const { Title } = Typography;

function Message(props) {
    const dispatch = useDispatch();
    const loginUserInfo = useSelector(state => state.user.loginUserInfo);
    const loginUserToken = useSelector(state => state.user.loginUserToken);
    console.log('loginUserInfo', loginUserInfo, 'loginUserToken', loginUserToken);
    const [messages, setMessagesList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [form] = Form.useForm();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        if (token) {
            getMessageListApi();
        }

    }, [token]);

    function getMessageListApi() {
        let data = {
            data: {
                userId
            }
        };
        getUserPost(data, header).then(res => {
            let value = messages.length ? messages.concat(res.product) : res.product;
            setMessagesList(value);
            setLoader(false);
            form.initialValues();
        }).catch(err => {
            // message.error(err?err.data.errors.userId:'');
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
                userId, message: textMessage
            }
        };
        sendUserPost(data, header).then(res => {
            setTextMessage('');
            if (res.comment) {
                let value = messages.length ? messages.concat(res.comment) : messages.push(res.comment);
                setMessagesList(value);
                setLoader(false);
            }
            // getMessageListApi();
        }).catch(err => {
            // message.error(err?err.data.errors.userId:'');
            setLoader(false);
        })
    }


    function fetchRandomMessageList() {
        let data = {};
        fetchRandomMessage(data, header).then(res => {
            if (res.data) {
                let value = messages.concat(res.data)
                setMessagesList(value);
            }
        }).catch(err => {
            setLoader(false);
        })
    }

    function logoutApi() {
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        props.history.push('/login');
        message.success('User Logout Successfully');
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={fetchRandomMessageList} className="message-btn">Get Message</Button>
                </Col>
                <Col span={12}>
                    <div className="send-message-area">
                        <Title level={2}>Message</Title>
                        <div className="scroller">
                            <div className="message-box">
                                {messages.length ? messages.map((value, index) => {
                                    let status = value.body.length > 50 ? true : false
                                    return (
                                        <React.Fragment key={`${value.author}-${index}`}>
                                            <div>
                                                {
                                                    status ? <div className="long-text">
                                                        {value.body}
                                                    </div> : <div>
                                                        <span>{value.body}</span>
                                                    </div>
                                                }


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
                            <Input.TextArea placeholder="Type Message" value={textMessage} onChange={handleInput} required={textMessage ? false : true} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loader}>Send Message</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={logoutApi} className="logout-btn" danger>Logout</Button>
                </Col>
            </Row>

        </React.Fragment>
    )
}
export default Message;