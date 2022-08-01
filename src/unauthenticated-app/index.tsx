import React, { useState } from "react";
import { Button, Card, Divider, Typography } from "antd";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from '@emotion/styled'
import Logo from '@/assets/logo.svg'
import Left from '@/assets/left.svg'
import Right from '@/assets/right.svg'
 
 export const UnauthenticatedApp = () => {
   // useDocumentTitle('登录/注册')

   const [isRegister, setIsRegister] = useState(false)

   const [error, setError] = useState<null | Error>(null)

   return <Container>
      <Header/>
      <ShadowCard>
         <Title>{isRegister ? '请注册' : '请登录'}</Title>
         {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
         {
               isRegister ?  <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
         }
         <Divider/>
         <Button type="link" onClick={() => setIsRegister(!isRegister)}>
               {!isRegister ? '没有账号？注册新账号' : '已经有账号了？直接登录'}
         </Button>
      </ShadowCard>
      <Background/>
   </Container>
 }

 const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
 `

 const Background = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc((100vw - 40rem) / 2 - 3.2rem), calc((100vw - 40rem) / 2 - 3.2rem), cover;
    background-image: url(${Left}), url(${Right});
    z-index: 1;
 `

 const Header = styled.header`
    background: url(${Logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
 `

 const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
 `

 const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
    z-index: 2;
 `