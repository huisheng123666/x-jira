import React, { ReactNode, useCallback } from "react"
import { User } from "@/screens/project-list/search-pannel"
import * as auth from '@/auth-provider'
// import { useContext } from "react"
import { http } from "@/utils/http"
import { useMount } from "@/utils"
import { useAsync } from "@/utils/use-async"
import { FullPageError, FullPageLoading } from "@/components/lib"
import { DevTools } from "jira-dev-tool"
import * as authStore from '@/store/auth.slice'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export interface AuthForm {
    username: string
    password: string
}

export  const bootstrapUser = async () => {
    let user: User | null = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', {
            token
        })
        user = data.user
        return user
    }
    return null
}

const AuthContext = React.createContext<{
    user: User | null
    login: (form: AuthForm) => Promise<void>
    register: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: {children: ReactNode}) => {

    const { run, isLoading, isIdle, isError, error } = useAsync<User | null>()

    const dispatch: (...args: any[]) => Promise<User> = useDispatch()

    useMount(() => {
        run(dispatch(authStore.bootstrap()))
    })

    if (isIdle || isLoading) {
        return <FullPageLoading/>
    }

    if (isError) { 
        return <>
            <FullPageError error={error!}/>
            <DevTools/>
        </>
    }

    return <>{children}</>
}

export const useAuth = () => {
    const dispatch: (...args: any[]) => Promise<User> = useDispatch()
    const user = useSelector(authStore.selectUser)

    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

    return {
        user,
        login,
        logout,
        register
    }
}