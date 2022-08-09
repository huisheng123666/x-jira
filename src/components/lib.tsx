import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
    gap?: number | boolean
    between?: boolean
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    margin-bottom: ${props => props.marginBottom + 'rem'};
    &>* {
        margin-top: 0;
        margin-bottom: 0;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined };
    }
`

const FullPage = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
`

export const FullPageLoading = () => <FullPage>
    <Spin size="large" />
</FullPage>

export const FullPageError = ({ error }: { error: Error | null }) => <FullPage>
    <ErrorBox error={error} />
</FullPage>


export const ButtonNoPadding = styled(Button)`
    padding: 0;
`

// 类型守卫 (value is Error 当value有message是就是Error类型)
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error?.message}</Typography.Text>
    }
    return null
}

export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`