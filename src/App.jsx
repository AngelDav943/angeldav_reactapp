import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/test' element={<Test/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App
