import React from "react";
import { useAuth } from "@/context/auth-context";
import { Form, Input, Button } from 'antd'

export const LoginScreen = () => {
    const { login } = useAuth()


    const handleSubmit = (values: {username: string, password: string}) => {
        login(values)
    }


    return <Form  onFinish={handleSubmit} labelCol={{span: 6}}>
        <Form.Item rules={[{required: true, message: '请输入用户名'}]} name="username">
            <Input placeholder="用户名" type="text" id="username" />
        </Form.Item>
        <Form.Item rules={[{required: true, message: '请输入密码'}]} name="password">
            <Input placeholder="密码" type="password" id="password" />
        </Form.Item>
        <Form.Item>
            <Button block htmlType="submit" type="primary">登录</Button>
        </Form.Item>
    </Form>
}