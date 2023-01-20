import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'

export default function Transaction() {
    const {checkUser}=useContext(AuthContext)
    //eslint-disable-next-line
    useEffect(()=>{checkUser()})
  return (
    <>
        transaction
    </>
  )
}
