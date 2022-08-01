import React, { FC } from "react";
import { Table, TableProps } from "antd";
import { User } from "./search-pannel";
import dayjs from 'dayjs'
import { Link } from "react-router-dom";

export interface Project {
     id: number
     name: string
     personId: string
     pin: boolean
     organization: string
     created: number
}

interface ListProps extends TableProps<Project> {
    users: User[]
}

export const List: FC<ListProps> = ({ users, ...props }) => {
    return <Table rowKey={'id'} pagination={false} columns={[
        {
            title: '名称',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={project.id.toString()}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
        },
        {
            title: '负责人',
            render(value, project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name}
                </span>
            }
        },
        {
            title: '创建时间',
            render(value, project) {
                return <span>{dayjs(project.created).format('YYYY-MM-DD')}</span>
            }
        },
    ]} {...props} />
}