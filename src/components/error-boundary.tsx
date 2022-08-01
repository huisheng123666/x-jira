/**
 * app异常处理
 * 无法处理事件异常，比如点击操作后的异常
 * 第三方库：https://github.com/bvaughn/react-error-boundary
 */


import React from "react";

type FallBackRender = (props: { error: Error | null }) => React.ReactElement

type ErrorBoundaryProps = React.PropsWithChildren<{
    fallbackRender: FallBackRender
}>

interface ErrorBoundaryState {
    error: Error | null
}

export class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {

    state: Readonly<ErrorBoundaryState> = {
        error: null
    }

    // 子组件抛出异常
    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render(): React.ReactNode {
        const { error } = this.state
        const { fallbackRender, children } = this.props

        if (error) {
            return fallbackRender({error})
        }

        return children
    }
}