import React, { FC } from "react";
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
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        {
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>       
                <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>)
        }
    </table>
}