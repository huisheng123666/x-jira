import { useTasksType } from "@/utils/task-type"
import React from "react"
import { IdSelect } from "./id-select"

export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: taskTypes } = useTasksType()

    return <IdSelect   
        options={taskTypes || []}
        {...props}
    />
}