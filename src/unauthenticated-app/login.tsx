import React from "react";
import { useAuth } from "@/context/auth-context";
import { Form, Input, Button } from 'antd'
import { useAsync } from "@/utils/use-async";

export const LoginScreen = ({ onError }: { onError: (err: Error | null) => void }) => {
    const { login } = useAuth()

    const { run, isLoading } = useAsync()

    const handleSubmit = async (values: {username: string, password: string}) => {
        try {
            await run(login(values))        
        } catch (e) {
            onError(e as Error)
        }
    }

    return <Form  onFinish={handleSubmit} labelCol={{span: 6}}>
        <Form.Item rules={[{required: true, message: '请输入用户名'}]} name="username">
            <Input placeholder="用户名" type="text" id="username" />
        </Form.Item>
        <Form.Item rules={[{required: true, message: '请输入密码'}]} name="password">
            <Input placeholder="密码" type="password" id="password" />
        </Form.Item>
        <Form.Item>
            <Button loading={isLoading} block htmlType="submit" type="primary">登录</Button>
        </Form.Item>
    </Form>
}