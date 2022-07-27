import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import { List } from "./list";
import { SearchPanel, User } from "./search-pannel";

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const [users, setUsers] = useState<User[]>([])

    const [list, setList] = useState([])

    const debouncedParam = useDebounce(param, 200)

    useEffect(() => {
        console.log(cleanObject(debouncedParam));
    }, [debouncedParam])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users} />
    </div>
}