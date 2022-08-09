import { TaskType } from "@/types/task-type"
import { useQuery } from "@tanstack/react-query"
import { useHttp } from "./http"

export const useTasksType = () => {
    const client = useHttp()

    return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}