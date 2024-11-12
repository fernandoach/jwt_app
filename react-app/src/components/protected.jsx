import { useEffect, useState } from "react"

function Protected() {
  const [confirm, setConfirm] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:3000/protected'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(url, options)
      .then(response => response.json())
      .then(response => setConfirm(response))  
  }, [])

  if(confirm.user) {
    return (
      <>
        <h1>Esta página esta protegida</h1>
        <h2>{confirm.user.usuario}</h2>   
        <h2>{confirm.user.id}</h2>   
      </>
    )
  } else {
    return (
      <>
        <h1>Acceso no autorizado</h1>
      </>
    )
  }
}

export { Protected }