

import { Button, Form, Input, message } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

//1。 表单数据的校验
//2。 表单数据的收集

class LoginForm extends React.Component {
    state = {
        loading: false,
    };

    onFinish = (data) => {
        // step1 set loading true
        // step2: send login request (call login api) to the server
        // step3: deal with  login statuse -> logged in or not
        // step4: set loading to false
        this.setState({
            loading: true,
        });
        login(data)//这里return的是一个promise，后面还可以继续.then()
            .then(() => {
                //if logged in , give a login message
                //show logged in success
                // Use antdesign component:"message"
                message.success(`Login Successful`);
                this.props.onSuccess();//调用这里时候，执行了App中的函数，修改了App中的登录状态
            })
            .catch((err) => {
                //show err
                message.error(err.message);
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };

    render = () => {
        return (
            <Form
                name="normal_login"
                onFinish={this.onFinish}
                style={{
                    width: 300,
                    margin: "auto",
                }}
            >
                <Form.Item
                    name="username"
                    rules={[//数据校验规则
                        {
                            required: true,
                            message: "Please input your Username!" }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your Password!" }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}

export default LoginForm;


