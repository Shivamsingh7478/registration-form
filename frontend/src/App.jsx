import { useState } from 'react'

import './App.css'
import { Navbar } from './components/navbar'
import { RegistrationForm } from './components/studentForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <RegistrationForm />
    </div>
  )
}

export default App
