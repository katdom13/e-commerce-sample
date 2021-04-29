import React, { useState, useEffect } from 'react'

export default function Login() {

  const [csrfToken, setCsrfToken] = useState("")

  useEffect(() => {
    // Request a CSRF Token from backend
    // Define credentials to send cookies with request
    fetch("http://localhost:8000/account/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken")
        setCsrfToken(csrfToken)
        // console.log(csrfToken)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      Login
    </>
  )
}