import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "."

export const useUrlQueryQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()

    return useMemo(() => [
            keys.reduce((prev, key) => {
                return {
                ...prev,
                [key]: searchParams.get(key) || ''
                }  
            }, {} as {[key in K]: string}),
            (params: Partial<{[key in K]: unknown}>) => {
                const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
                setSearchParam(o)
            }
        ] as const,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams, setSearchParam]
    )
}