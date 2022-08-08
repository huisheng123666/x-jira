import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-pannel";
import styled from "@emotion/styled";
import { Row, Typography } from "antd";
import { useProjects } from "@/utils/use-projects";
import { useUsers } from "@/utils/use-user";
import { useProjectParams } from "./util";
import { ButtonNoPadding } from "@/components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectList = () => {
    const dispatch = useDispatch()
    useDocumentTitle('项目列表', false)

    const [param, setParam] = useProjectParams()

    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))

    const { data: users } = useUsers()
 

    return <Container>
        <Row justify='space-between'>
            <h1>项目列表</h1>
            <ButtonNoPadding
                type='link'
                onClick={() => dispatch(projectListActions.openProjectModal())}
            >创建项目</ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type="danger">{error?.message}</Typography.Text> : null}
        <List refresh={retry} dataSource={list || []} users={users || []} loading={isLoading} / >
    </Container>
}

ProjectList.whyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`