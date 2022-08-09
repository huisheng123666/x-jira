import { TaskTypeSelect } from "@/components/task-type-select"
import { UserSelect } from "@/components/user-select"
import { useSetUrlSearchParam } from "@/utils/url"
import { Button, Col, Input, Row } from "antd"
import { useTasksSearchParams } from "./util"

export const SearchPanel = () => {
    const searchParams = useTasksSearchParams()
    const setSearchParam = useSetUrlSearchParam()

    const reset = () => {
        setSearchParam({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        })
    }

    return <Row style={{ marginBottom: '4rem' }} gutter={30}>
         <Col>
            <Input
                style={{ width: '20rem' }}
                placeholder="任务名"
                value={searchParams.name}
                onChange={evt => setSearchParam({ name: evt.target.value })}
            />
         </Col>
         <Col>
            <UserSelect
                defaultOptionName="经办人"
                value={searchParams.processorId}
                onChange={value => setSearchParam({ processorId: value })}
            />
         </Col>
        <Col>
            <TaskTypeSelect
                defaultOptionName="类型"
                value={searchParams.typeId}
                onChange={value => setSearchParam({ typeId: value })}
            />
        </Col>
        <Button onClick={reset}>清除筛选器</Button>
    </Row>
}