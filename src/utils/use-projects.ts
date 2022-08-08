import { useDeleteConfig, useEditConfig } from './use-optimistic-options';
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { cleanObject } from ".";
import { useHttp } from "./http";
import { Project } from '@/types/project';

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()

    // 第一个key值，第二个需要观测的内容，param变化后做出更新
    return useQuery<Project[]>(['projects', param], () => client('projects', {data: cleanObject(param || {})}))
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp() 

    return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
    }), useEditConfig(queryKey))
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation((params: Partial<Project>) => {
        return client(`projects`, {
            data: params,
            method: 'POST'
        })
    }, useEditConfig(queryKey))
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation(({id} : {id: number}) => {
        return client(`projects/${id}`, {
            method: 'DELETE'
        })
    }, useDeleteConfig(queryKey))
}

export const useProject = (id?: number) => {
    const client = useHttp()

    return useQuery<Project | null>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: !!id
        }
    )
}