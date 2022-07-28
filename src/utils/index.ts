import { useEffect, useState } from "react"

export function cleanObject(object: any) {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (value === null || value === '' || value === undefined) {
            delete result[key]
        }
    })
    return result
}


export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

// const debounce = (func, delay: number) => {
//     let timeout = null;
//     return () => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             func()
//         }, delay)
//     }
// }

export const useDebounce = <V>(value: V, delay: number = 0) => {
    const [debouncedValue, setdebouncedValue] = useState(value)

    useEffect(() => {        
        const timeout = setTimeout(() => {
            setdebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    return debouncedValue
}