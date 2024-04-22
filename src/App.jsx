import { Route, Routes, useLocation } from 'react-router-dom'
import { useInfo } from './context/useInfo'
import { useEffect } from 'react'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SigningIn from './pages/SigningIn'

import Posts from './pages/posts/Posts'
import CreatePost from './pages/posts/CreatePost'
import PostDetails from './pages/posts/postDetails'

import Accounts from './pages/users/Accounts'
import ProfileDetails from './pages/users/ProfileDetails'

import Projects from './pages/projects/projects'
import Stats from './pages/Stats'
import CreateBadge from './pages/create/CreateBadge'
import Badges from './pages/badges/Badges'

function App() {
  const location = useLocation();
  const { loaded } = useInfo();

  useEffect(() => {
    if (import.meta.env.DEV == true) {
      document.getElementById("favicon").href = '/images/favicons/development.ico'
      return
    }

    if (location.pathname.includes("posts")) {
      document.getElementById("favicon").href = '/images/favicons/posts.ico'
      return
    }

    document.getElementById("favicon").href = '/favicon.ico'

  }, [location.pathname])

  return loaded ? (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/test' element={<Test/>} /> */}

      <Route path='/login' element={<Dashboard />} />
      <Route path='/signin' element={<SigningIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/users'>
        <Route index element={<Accounts />} />
        <Route path=':ID' element={<ProfileDetails />} />
      </Route>

      <Route path='/posts'>
        <Route index element={<Posts />} />
        <Route path='create' element={<CreatePost />} />
        <Route path=':postID' element={<PostDetails />} />
      </Route>

      <Route path='/projects'>
        <Route index element={<Projects />} />
      </Route>

      <Route path='/create'>
        <Route path='badge' element={<CreateBadge />} />
      </Route>

      <Route path='/badges'>
        <Route index element={<Badges />} />
        <Route path=':userID' element={<Badges />} />
      </Route>

      <Route path='statistics' element={<Stats />} />

      <Route path='/*' element={<center className='loading'>
        <img src="/images/monitor/monitor_red.png" alt="not found image" height={100} />
        <p>404: NOT FOUND</p>
      </center>} />
    </Routes>
  ) : <center className='loading'>
    <img src="/loading_monitor.gif" alt="loading gif" height={100} />
  </center>
}

export default App
