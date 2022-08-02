import { useUrlQueryQueryParam } from "@/utils/url"
import { useMemo } from "react"

export const useProjectParams = () => {
    const [param, setParam] = useUrlQueryQueryParam(['name', 'personId'])

    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}