import React, { FC } from "react";
import { Table } from "antd";
import { User } from "./search-pannel";

interface Project {
     id: string
     name: string
     personId: string
     pin: boolean
     organization: string
}

interface ListProps {
    list: Project[]
    users: User[]
}

export const List: FC<ListProps> = ({ list, users }) => {
    return <Table rowKey={'id'} pagination={false} columns={[
        {
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: '负责人',
            render(value, project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name}
                </span>
            }
        }
    ]} dataSource={list}/>
}