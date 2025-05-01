import { useState } from 'react'

import './App.css'
import { Navbar } from './components/navbar'
import { RegistrationForm } from './components/studentForm'
import { GuideRegistration } from './components/GuideForm'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <RegistrationForm />
      <Footer />
    </div>
  )
}

export default App
