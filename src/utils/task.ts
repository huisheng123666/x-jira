import { Task } from './../types/task';
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query"
import { useHttp } from "./http"
import { cleanObject } from '.';
import { useAddConfig } from './use-optimistic-options';

export const useTasks = (queryKey: QueryKey) => {
  const client = useHttp()

  // 第一个key值，第二个需要观测的内容，param变化后做出更新
  return useQuery<Task[]>(queryKey, () => client('tasks', {data: cleanObject(queryKey[1] || {})}))
}


export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  
  return useMutation(
    (params: Partial<Task>) => client('tasks', {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()

  return useQuery<Task>(
    ['tasks', { id }],
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id)
    }
  )
}