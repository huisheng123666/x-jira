import { useCallback, useMemo, useState } from "react"

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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = useMemo(() => {
        return {
            ...defaultConfig,
            ...initialConfig
        }
    }, [initialConfig])
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        data: null,
        stat: 'error'
    }), [])

    const run = useCallback((promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise数据')
        }
        setState((prevState) => {
            return {
                ...prevState,
                stat: 'loading',
                error: null
            } 
        })
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
    }, [setData, setError, config])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}