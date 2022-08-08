import React, { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";

export const AppProviders = ({ children }: {children: ReactNode}) => {
     return <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
     </Provider>
}