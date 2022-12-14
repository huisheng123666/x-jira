import { Kanban } from "@/types/kanban"
import { useTasks } from "@/utils/task"
import { useTasksType } from "@/utils/task-type"
import { useTasksQueryKey } from "./util"
import { BugOutlined, CheckSquareOutlined } from '@ant-design/icons'
import styled from "@emotion/styled"
import { Card } from "antd"
import { CreateTask } from "./create-task"

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTasksType()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) {
        return null
    }
    return name === 'task' ? <CheckSquareOutlined style={{color: 'green'}} /> : <BugOutlined style={{color: 'red '}} />
}

export const KanbanColumn = ({ kanban } : {kanban: Kanban}) => {
    const { data: allTasks } = useTasks(useTasksQueryKey())    

    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

    return <Container>
        <h3>{kanban.name}</h3>
        <TaskContainer>
            {
                tasks?.map(task => <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
                    <div>{task.name}</div>
                    <TaskTypeIcon id={task.typeId} />
                </Card>)
            }
            <CreateTask kanbanId={kanban.id} />
        </TaskContainer>
    </Container> 
}


export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`

const TaskContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`