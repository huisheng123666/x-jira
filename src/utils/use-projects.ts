import { Project } from "@/screens/project-list/list";
import { useCallback, useEffect } from "react";  
import { cleanObject } from ".";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()

    const { run, ...result } = useAsync<Project[]>()

    const fetchProject = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param])

    useEffect(() => {
        run(fetchProject(), {
            retry: fetchProject
        })
    }, [run, fetchProject])

    return result
}

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}