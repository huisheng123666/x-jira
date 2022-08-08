import { useQuery } from '@tanstack/react-query';
import { cleanObject } from '.';
import { Kanban } from './../types/kanban';
import { useHttp } from './http';

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()

  // 第一个key值，第二个需要观测的内容，param变化后做出更新
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', {data: cleanObject(param || {})}))
}
