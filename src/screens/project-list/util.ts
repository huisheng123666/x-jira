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

export const useProjectModal = () => {
    const [{projectCreate, editingProjectId}, setProjectCretae] = useUrlQueryQueryParam([
        'projectCreate',
        'editingProjectId'
    ])

    const { data: editingProject, isLoading, isFetching } = useProject(Number(editingProjectId))

    

    const open = () => setProjectCretae({projectCreate: true})
    const close = () => {
        setProjectCretae({projectCreate: undefined, editingProjectId: undefined})
    }
    const startEdit = (id: number) => setProjectCretae({editingProjectId: id})

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        editingProject,
        startEdit,
        isLoading: isFetching && isLoading
    }
}