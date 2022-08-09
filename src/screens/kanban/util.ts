import { useTask } from "@/utils/task"
import { useUrlQueryQueryParam } from "@/utils/url"
import { useProject } from "@/utils/use-projects"
import { useCallback, useMemo } from "react"
import { useLocation } from "react-router"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanBanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanBanSearchParams()]

export const useTasksSearchParams = () => {
    const [param] = useUrlQueryQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    return useMemo(() => {
        return {
            projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: param.name || undefined,
        }
    }, [param, projectId])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryQueryParam(['editingTaskId'])
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId))

    const startEdit = useCallback((id: number) => {
        setEditingTaskId({ editingTaskId: id })
    }, [setEditingTaskId])

    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: undefined })
    }, [setEditingTaskId])

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}