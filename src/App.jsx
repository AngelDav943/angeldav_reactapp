import { Route, Routes } from 'react-router-dom'
import { useInfo } from './context/useInfo'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SigningIn from './pages/SigningIn'
import Accounts from './pages/users/Accounts'

import Posts from './pages/posts/Posts'
import CreatePost from './pages/posts/CreatePost'
import PostDetails from './pages/posts/postDetails'

function App() {
  const { loaded } = useInfo();

  return loaded ? (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/test' element={<Test/>} /> */}
      <Route path='/signin' element={<SigningIn />} />
      <Route path='/users'>
        <Route index element={<Accounts />} />
        <Route path=':userID' element={<p>Post not found..</p>} />
      </Route>

      <Route path='/posts'>
        <Route index element={<Posts />} />
        <Route path='create' element={<CreatePost />} />
        <Route path=':postID' element={<PostDetails/>} />
      </Route>

      <Route path='/login' element={<Dashboard />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/*' element={<p>No page found..</p>} />
    </Routes>
  ) : <center className='loading'>
    <img src="/loading_monitor.gif" alt="loading gif" height={100} />
  </center>
}

export default App
