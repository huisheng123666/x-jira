import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation  } from 'react-router'
import { KanBanScreen } from "../kanban";
import { EpicScreen } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
    const units = useLocation().pathname.split('/')
    return units[units.length -1]
}

export const ProjectScreen = () => {
    const routeType = useRouteType()

    return <Container>
        <Aside>
            <Menu
                mode='inline'
                selectedKeys={[routeType]}
                items={[
                    {
                        key: 'kanban',
                        label: <Link to="kanban">看板</Link>
                    },
                    {
                        key: 'epic',
                        label: <Link to="epic">任务组</Link>
                    }
                ]}
            />
        </Aside>
        <Main>
            <Routes>
                <Route path="/kanban" element={<KanBanScreen/>} />
                <Route path="/epic" element={<EpicScreen/>} />
                <Route path="*" element={<Navigate replace to={window.location.pathname + '/kanban'} />} />
            </Routes>
        </Main>
    </Container>
}

const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`

const Main = styled.main`
    display: flex;
    box-shadow: -5px 0 5px -5ox rgba(0, 0, 0, 0.1);
    overflow: hidden;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
`