import React, { FC } from "react";
import { Dropdown, Menu, Table, TableProps } from "antd";
import { User } from "./search-pannel";
import dayjs from 'dayjs'
import { Link } from "react-router-dom";
import { Pin } from "@/components/pin";
import { useEditProject } from "@/utils/use-projects";
import { ButtonNoPadding } from "@/components/lib";

export interface Project {
     id: number
     name: string
     personId: number
     pin: boolean
     organization: string
     created: number
}

interface ListProps extends TableProps<Project> {
    users: User[]
    refresh: () => void
}

export const List: FC<ListProps> = ({ users, refresh, ...props }) => {
    const {mutate} = useEditProject()
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(refresh)

    return <Table rowKey={'id'} pagination={false} columns={[
        {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
            }
        },
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
        {
            render(value, project) {
                return <Dropdown
                    overlay={
                        <Menu
                            items={[
                                {
                                    key: 'edit',
                                    label: <ButtonNoPadding type='link'>编辑</ButtonNoPadding>
                                },
                                {
                                    key: 'delete',
                                    label: <ButtonNoPadding type='link'>删除</ButtonNoPadding>
                                },
                            ]}
                        />
                    }
                >
                    <ButtonNoPadding type="link">...</ButtonNoPadding>
                </Dropdown>
            }
        }
    ]} {...props} />
}