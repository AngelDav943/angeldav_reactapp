import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useInfo } from './context/useInfo'
import SigningIn from './pages/SigningIn'

function App() {
  const {loaded} = useInfo();

  return loaded ? (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/test' element={<Test/>} />
      <Route path='/signin' element={<SigningIn/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  ) : <center>
    <p>Loading...</p>
  </center>
}

export default App
