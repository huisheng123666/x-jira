import { Task } from './../types/task';
import { useQuery } from "@tanstack/react-query"
import { useHttp } from "./http"
import { cleanObject } from '.';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()

  // 第一个key值，第二个需要观测的内容，param变化后做出更新
  return useQuery<Task[]>(['tasks', param], () => client('tasks', {data: cleanObject(param || {})}))
}
