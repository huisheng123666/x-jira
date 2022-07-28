import React from "react";
import { useAuth } from "@/context/auth-context";
import { Button, Form, Input } from "antd";

export const RegisterScreen = () => {
    const { register } = useAuth()


    const handleSubmit = (values: {username: string, password: string}) => {
        register(values)
    }

    return <Form  onFinish={handleSubmit} labelCol={{span: 6}}>
        <Form.Item rules={[{required: true, message: '请输入用户名'}]} name="username">
            <Input placeholder="用户名" type="text" id="username" />
        </Form.Item>
        <Form.Item rules={[{required: true, message: '请输入密码'}]} name="password">
            <Input placeholder="密码" type="password" id="password" />
        </Form.Item>
        <Form.Item>
            <Button block htmlType="submit" type="primary">注册</Button>
        </Form.Item>
    </Form>
}