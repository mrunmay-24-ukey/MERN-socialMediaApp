import React, { useState } from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  //* This thing works as useState()
  console.log(authScreenState)

  return (
    <>
      {authScreenState === 'login' ? <LoginCard/> : <SignupCard/>}
    </>
  )
}

export default AuthPage