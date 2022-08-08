import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "."

export const useUrlQueryQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams()

    const setSearchParam = useSetUrlSearchParam()

    return useMemo(() => [
            keys.reduce((prev, key) => {
                return {
                ...prev,
                [key]: searchParams.get(key) || ''
                }  
            }, {} as {[key in K]: string}),
            (params: Partial<{[key in K]: unknown}>) => {
                return setSearchParam(params)
            }
        ] as const,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams, setSearchParam]
    )
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams()

    return (param: { [key in string]: unknown }) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...param
        }) as URLSearchParamsInit

        return setSearchParam(o)
    }
}