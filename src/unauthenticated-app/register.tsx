import React from "react";
import { useAuth } from "@/context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "@/utils/use-async";

export const RegisterScreen = ({ onError }: { onError: (err: Error | null) => void }) => {
    const { register } = useAuth()

    const { run, isLoading } = useAsync()

    const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        if (cpassword !== values.password) {
            onError(new Error('两次密码不一致'))
            return
        }
        try {
            await run(register(values))
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
        <Form.Item rules={[{required: true, message: '请确认密码'}]} name="cpassword">
            <Input placeholder="确认密码" type="password" id="cpassword" />
        </Form.Item>
        <Form.Item>
            <Button loading={isLoading} block htmlType="submit" type="primary">注册</Button>
        </Form.Item>
    </Form>
}