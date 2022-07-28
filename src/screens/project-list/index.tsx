import { useHttp } from "@/utils/http";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./list";
import { SearchPanel, User } from "./search-pannel";

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const [users, setUsers] = useState<User[]>([])
    const [list, setList] = useState([])
    const client = useHttp()

    const debouncedParam = useDebounce(param, 200)

    useEffect(() => {
        client('projects', {
            data: cleanObject(debouncedParam)
        }).then(setList)
    }, [debouncedParam, client])

    useMount(() => {
        client('users', {}).then(setUsers)
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users} />
    </div>
}