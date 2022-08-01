import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "./context/auth-context";
import { ProjectList } from "./screens/project-list";
import styled from '@emotion/styled'
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";


export const AuthenticatedApp = () => {    
    return <Container>
        <PageHeader />
        <Main>
            <Router>
                <Routes>
                    <Route path="/projects" element={<ProjectList/>} />
                    <Route path="/projects/:projectId/*" element={<ProjectScreen/>} />
                    <Route path="*" element={<Navigate to={'/projects'} />} />
                </Routes>
            </Router>
        </Main> 
    </Container>
}


const PageHeader = () => {
    const { logout, user } = useAuth()


    return <Header between>
        <HeaderLeft gap={true}>
            <SoftwareLogo style={{cursor: 'pointer'}} onClick={resetRoute} width="18rem" color="rgb(38, 132, 255)" />
            <h3>项目</h3>
            <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown
                arrow
                overlay={<Menu
                    items={[
                        {
                            key: 'logout',
                            label: <Button type="link" size="small" onClick={logout}>登出</Button>
                        }
                    ]}
                />}
            >
                <Button type="link">Hi, {user?.name}</Button>
            </Dropdown>
        </HeaderRight>
    </Header>
}


const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
`

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div``

const Main = styled.main``