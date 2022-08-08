import React, { FC } from "react";
import { UserSelect } from "@/components/user-select";
import { Project } from "@/types/project";
import { Form, Input } from "antd";
import { User } from "@/types/user";
 
interface SearchPanelPros {
    users: User[]
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: SearchPanelPros['param']) => void
}

export const SearchPanel: FC<SearchPanelPros> = ({ users, param, setParam }) => {
    return <Form layout="inline" style={{marginBottom: '2rem'}}>
        <Form.Item>
            <Input
                type="text"
                value={param.name}
                placeholder="项目名"
                onChange={evt => {
                    setParam({
                        ...param,
                        name: evt.target.value
                    })
                }}
            />
        </Form.Item>
        <Form.Item>
            <UserSelect   
                defaultOptionName="负责人"
                value={param.personId}
                options={users}
                onChange={value => {
                    setParam({
                        ...param,
                        personId: value
                    })
                }}
            />
        </Form.Item>
    </Form>
}