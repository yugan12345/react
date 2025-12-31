import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (authStatus === undefined) {
      setLoader(false)
      return
    }
    if (authentication && authStatus === false) {
      navigate('/login')
      return
    }

    if (!authentication && authStatus === true) {
      navigate('/')
      return
    }

    setLoader(false)
  }, [authStatus, authentication, navigate])

  if (loader) return null

  return <>{children}</>
}
