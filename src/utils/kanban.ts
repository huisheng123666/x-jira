import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { cleanObject } from '.';
import { Kanban } from './../types/kanban';
import { useHttp } from './http';
import { useAddConfig } from './use-optimistic-options';

export const useKanbans = (queryKey: QueryKey) => {
  const client = useHttp()

  // 第一个key值，第二个需要观测的内容，param变化后做出更新
  return useQuery<Kanban[]>(queryKey, () => client('kanbans', {data: cleanObject(queryKey[1] || {})}))
}

export const useAddKanBan = (queryKey: QueryKey) => {
  const client = useHttp()
  
  return useMutation(
    (params: Partial<Kanban>) => client('kanbans', {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}