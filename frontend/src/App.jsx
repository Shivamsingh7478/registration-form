import { useState } from 'react'

import './App.css'
import { Navbar } from './components/navbar'
import { RegistrationForm } from './components/studentForm'
import { GuideRegistration } from './components/GuideForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <RegistrationForm />
      <GuideRegistration />
    </div>
  )
}

export default App
