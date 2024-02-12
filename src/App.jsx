import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useInfo } from './context/useInfo'
import SigningIn from './pages/SigningIn'
import Accounts from './pages/Accounts'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'

function App() {
  const {loaded} = useInfo();

  return loaded ? (
    <Routes>
      <Route path='/' element={<Home/>} />
      {/* <Route path='/test' element={<Test/>} /> */}
      <Route path='/signin' element={<SigningIn/>} />
      <Route path='/users' element={<Accounts/>} />
      <Route path='/posts' element={<Posts/>} />
      <Route path='/posts/create' element={<CreatePost/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  ) : <center className='loading'>
    <img src="/loading_monitor.gif" alt="loading gif" height={100}/>
  </center>
}

export default App
