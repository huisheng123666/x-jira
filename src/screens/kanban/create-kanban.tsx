import { useAddKanBan } from "@/utils/kanban"
import { Input } from "antd"
import { useState } from "react"
import { Container } from "./kanban-column"
import { useKanbansQueryKey, useProjectIdInUrl } from "./util"

export const CreateKanban = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()

    const { mutateAsync: addKanban } = useAddKanBan(useKanbansQueryKey())

    const submit = async () => {
        await addKanban({ name, projectId })
        setName('')
    }

    return <Container>
        <Input
            size='large'
            placeholder="新建看板名称"
            onPressEnter={submit} value={name}
            onChange={evt => setName(evt.target.value)}
        />
    </Container> 
}