import './App.css'
import Sidebar from './components/Sidebar'  
import Calender from './components/Calender'
import Login from './Login-register/Login'
import { Route,Routes } from 'react-router-dom'
function App() {

  return (
    <>
   <Routes>
    <Route path="/" element={<Sidebar />} />
    <Route path="/Calender" element={<Calender />} />
    <Route path="/login" element={<Login />} />

   </Routes>

    </>
  )
}

export default App
