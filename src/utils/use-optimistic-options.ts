import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
      // 乐观更新
    async onMutate(target: any) {
        // 获取更新前的数据
        const previousItems = queryClient.getQueriesData(queryKey)[1]
        // 修改旧数据
        queryClient.setQueryData(queryKey, (old?: any[]) => {
            return callback(target, old)
        })
        return {previousItems}
    },
    onError(error: any, newItem: any, context: any) {            
        queryClient.setQueryData(queryKey, context?.previousItems)
    }
  }
}


export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (taeget, old) => old?.filter(item => item.id !== taeget.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (taeget, old) => old?.map(item => item.id === taeget.id ? {...item, ...taeget} : item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (taeget, old) => old ? [...old, taeget] : [])