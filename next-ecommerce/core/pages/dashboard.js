import React, { useState, useEffect } from 'react'

export const Dashboard = () => {

  const [whoami, setWhoami] = useState('I dont know!')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch("http://localhost:8000/account/whoami", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('WHOAMI', data)
      data && setWhoami(data.username)
    })
    .catch((err) => {
      console.log('ERROR', err)
      setError('You are not logged in')
    })
  }, [])

  return (
    <div className="container">
      {whoami}
    </div>
  )
}

export default Dashboard
