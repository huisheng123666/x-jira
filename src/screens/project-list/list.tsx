import React, { FC } from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from 'dayjs'
import { Link } from "react-router-dom";
import { Pin } from "@/components/pin";
import { useDeleteProject, useEditProject } from "@/utils/use-projects";
import { ButtonNoPadding } from "@/components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "@/types/project";
import { User } from "@/types/user";

interface ListProps extends TableProps<Project> {
    users: User[]
    refresh?: () => void
}

export const List: FC<ListProps> = ({ users, refresh, ...props }) => {
    const {mutate} = useEditProject(useProjectsQueryKey())
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

    const { mutate: mutateDelete } = useDeleteProject(useProjectsQueryKey())

    const { startEdit } = useProjectModal()

    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: '确认删除吗？',
            content: '点击确定删除',
            okText: '确定',
            onOk() {
                mutateDelete({id})
            }
        })
    }

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
                return <Link to={project.id?.toString()}>{project.name}</Link>
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
                                    label: <ButtonNoPadding onClick={() => startEdit(project.id)} type='link'>编辑</ButtonNoPadding>
                                },
                                {
                                    key: 'delete',
                                    label: <ButtonNoPadding onClick={() => confirmDeleteProject(project.id)} type='link'>删除</ButtonNoPadding>
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