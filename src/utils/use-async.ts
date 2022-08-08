import { useCallback, useMemo, useReducer, useState } from "react"
import { useMountedRef } from "."

interface State<D> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

// 安全的dispatch，避免组件销毁异步任务继续dispatch
const useSafeDispatch = <T>(dispatch: (...args: T[ ]) => void) => {
    const mountedRef = useMountedRef()

    return useCallback((...args: T[]) => {
        if (mountedRef.current) {
            dispatch(...args)
        }
    }, [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = useMemo(() => {
        return {
            ...defaultConfig,
            ...initialConfig
        }
    }, [initialConfig])
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({...state, ...action}), {
        ...defaultInitialState,
        ...initialState
    })

    const safeDispatch = useSafeDispatch(dispatch)

    const [retry, setRetry] = useState(() => () => {})

    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        error,
        data: null,
        stat: 'error'
    }), [safeDispatch])

    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise数据')
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        safeDispatch({
            stat: 'loading',
            error: null
        } )
        return promise
        .then(data => {
            setData(data)
            return data
        })    
        .catch((error) => {
            setError(error)
            if (config.throwOnError) {
                return Promise.reject(error)                
            } 
            return error
        })
    }, [setData, setError, config, safeDispatch])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    }
}