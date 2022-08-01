import React, { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-pannel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "@/utils/use-projects";
import { useUsers } from "@/utils/use-user";

export const ProjectList = () => {

    useDocumentTitle('项目列表', false)

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)

    const { isLoading, error, data: list } = useProjects(debouncedParam)

    const { data: users } = useUsers()

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type="danger">{error?.message}</Typography.Text> : null}
        <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`