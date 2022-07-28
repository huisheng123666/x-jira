import { Form, Input, Select } from "antd";
import React, { useEffect, FC } from "react";

export interface User {
    id: string
    name: string
    email: string
    title: string
    organization: string
    token: string
}

interface SearchPanelPros {
    users: User[]
    param: {
        name: string
        personId: string
    }
    setParam: (param: SearchPanelPros['param']) => void
}

export const SearchPanel: FC<SearchPanelPros> = ({ users, param, setParam }) => {

    useEffect(() => {

    }, [])

    return <Form layout="inline">
        <Form.Item>
            <Input type="text" value={param.name} onChange={evt => {
                setParam({
                    ...param,
                    name: evt.target.value
                })
            }} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => {
                    setParam({
                        ...param,
                        personId: value
                    })
                }}>
                    <Select.Option value={''}>负责人</Select.Option>
                    {
                        users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                    }
            </Select>
        </Form.Item>
    </Form>
}