import { useSetUrlSearchParam } from './../../utils/url';
import { useUrlQueryQueryParam } from "@/utils/url"
import { useProject } from "@/utils/use-projects"
import { useMemo } from "react"

export const useProjectParams = () => {
    const [param, setParam] = useUrlQueryQueryParam(['name', 'personId'])

    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectParams()

    return ['projects', params]
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCretae] = useUrlQueryQueryParam([
        'projectCreate',
    ])

    const [{ editingProjectId }] = useUrlQueryQueryParam(['editingProjectId'])

    const { data: editingProject, isLoading, isFetching } = useProject(Number(editingProjectId))

    const setUrlParam = useSetUrlSearchParam()

    

    const open = () => setProjectCretae({projectCreate: true})
    const close = () => {
        setUrlParam({projectCreate: undefined, editingProjectId: undefined})
    }
    const startEdit = (id: number) => setUrlParam({editingProjectId: id})

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        editingProject,
        startEdit,
        isLoading: isFetching && isLoading
    }
}