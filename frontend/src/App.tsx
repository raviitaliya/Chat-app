import './App.css'
import Sidebar from './components/Sidebar'  
import Calender from './components/Calender'
import { Route,Routes } from 'react-router-dom'
function App() {

  return (
    <>
   <Routes>
    <Route path="/" element={<Sidebar />} />
    <Route path="/Calender" element={<Calender />} />

   </Routes>

    </>
  )
}

export default App
