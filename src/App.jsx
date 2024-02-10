import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useInfo } from './context/useInfo'
import SigningIn from './pages/SigningIn'
import Admin from './pages/AdminPage'

function App() {
  const {loaded} = useInfo();

  return loaded ? (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/test' element={<Test/>} />
      <Route path='/signin' element={<SigningIn/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/dashboard/admin' element={<Admin/>} />
    </Routes>
  ) : <center className='loading'>
    <img src="/loading_monitor.gif" alt="loading gif" height={100}/>
  </center>
}

export default App
