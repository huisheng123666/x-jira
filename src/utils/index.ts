import { useEffect, useRef, useState } from "react"

export const isVoid = (value: unknown) => value === null || value === '' || value === undefined

export function cleanObject(object: any) {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
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

// 第三方库：react-helmet
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [title, keepOnUnmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin


/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反正返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    return mountedRef
}