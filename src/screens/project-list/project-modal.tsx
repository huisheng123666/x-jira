import { Button, Drawer } from "antd"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { projectListActions, selectProjectModalOpen } from "./project-list.slice"


export const ProjectModal = () => {
    const dispatch = useDispatch()

    const projectModalOpen = useSelector(selectProjectModalOpen)

    return <Drawer
        width="100vw"
        visible={projectModalOpen} 
        onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
        <h1>Project Modal</h1>
        <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
}