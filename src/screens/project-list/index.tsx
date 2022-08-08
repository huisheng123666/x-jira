import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-pannel";
import styled from "@emotion/styled";
import { Row } from "antd";
import { useProjects } from "@/utils/use-projects";
import { useUsers } from "@/utils/use-user";
import { useProjectModal, useProjectParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "@/components/lib";

export const ProjectList = () => {

    useDocumentTitle('项目列表', false)

    const [param, setParam] = useProjectParams()

    const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))

    const { data: users } = useUsers()

    const { open } = useProjectModal()
 

    return <Container>
        <Row justify='space-between'>
            <h1>项目列表</h1>
            <ButtonNoPadding type='link' onClick={open}>创建项目</ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List dataSource={list || []} users={users || []} loading={isLoading} / >
    </Container>
}

ProjectList.whyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`