import { Project } from "@/screens/project-list/list";
import { useProjectParams } from "@/screens/project-list/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cleanObject } from ".";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()

    // 第一个key值，第二个需要观测的内容，param变化后做出更新
    return useQuery<Project[]>(['projects', param], () => client('projects', {data: cleanObject(param || {})}))
}

export const useEditProject = () => {
    const client = useHttp() 
    const queryClient = useQueryClient()
    const [searchParams] = useProjectParams()

    const queryKey = ['projects', searchParams]


    return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
    }), {
        // 成功后更新projects
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        // 乐观更新
        async onMutate(target) {
            // 获取更新前的数据
            const previousItems = queryClient.getQueriesData(queryKey)[1]
            // 修改旧数据
            queryClient.setQueryData(queryKey, (old?: Project[]) => {
                return old?.map(project => project.id === target.id ? {...project, ...target} : project)
            })
            return {previousItems}
        },
        onError(error, newItem, context) {            
            queryClient.setQueryData(queryKey, context?.previousItems)
        }
    })
}

export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()

    return useMutation((params: Partial<Project>) => {
        return client(`projects`, {
            data: params,
            method: 'POST'
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['projects'])
    })
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