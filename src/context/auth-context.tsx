import React, { ReactNode } from "react"
import * as auth from '@/auth-provider'
import { useContext } from "react"
import { http } from "@/utils/http"
import { useMount } from "@/utils"
import { useAsync } from "@/utils/use-async"
import { FullPageError, FullPageLoading } from "@/components/lib"
import { DevTools } from "jira-dev-tool"
import { useQueryClient } from "@tanstack/react-query"
import { User } from "@/types/user"

interface AuthForm {
    username: string
    password: string
}

const bootstrapUser = async () => {
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

    const queryClient = useQueryClient()

    const { run, isLoading, isIdle, isError, error,  data: user, setData: setUser } = useAsync<User | null>()

    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => {
        setUser(null)
        // 退出登录清空缓存数据
        queryClient.clear()
    })

    useMount(() => {
        run(bootstrapUser())
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

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}