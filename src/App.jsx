import { Route, Routes, useLocation } from 'react-router-dom'
import { RequireAuth, useInfo } from './context/useInfo'
import { useEffect } from 'react'

import NotFound from './pages/NotFound'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SigningIn from './pages/SigningIn'

import Posts from './pages/posts/Posts'
import CreatePost from './pages/posts/CreatePost'
import PostDetails from './pages/posts/postDetails'

import Accounts from './pages/users/Accounts'
import ProfileDetails from './pages/users/ProfileDetails'

import Projects from './pages/projects/ProjectsHome'
import ProjectsGames from './pages/projects/ProjectsGames'
import ProjectsModels from './pages/projects/ProjectsModels'
import Stats from './pages/Stats'
import CreateBadge from './pages/create/CreateBadge'
import Badges from './pages/badges/Badges'

import Directories from './pages/Directories'

import MarkdownTest from './pages/tests/MarkdownTest'
import BlobTest from './pages/tests/BlobTest'
import WebsocketTest from './pages/tests/WebsocketTest'
import MemoryGame from './pages/games/memory/MemoryGame'
import ChatSocketTest from './pages/tests/ChatSocketTest'
import GalleryVault from './pages/gallery/Vault'
import PublicGallery from './pages/gallery/PublicGallery'
import PreviewGallery from './pages/gallery/PreviewGallery'
import Login from './pages/Login'

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

			<Route path='/login' element={<Login />} />
			<Route path='/signin' element={<SigningIn />} />
			<Route path='/dashboard' element={
				<RequireAuth>
					<Dashboard />
				</RequireAuth>
			} />

			<Route path='/users'>
				<Route index element={<Accounts />} />
				<Route path=':ID' element={<ProfileDetails />} />
			</Route>

			<Route path='/posts'>
				<Route index element={<Posts />} />
				<Route path='create' element={
					<RequireAuth>
						<CreatePost />
					</RequireAuth>
				} />
				<Route path=':postID' element={<PostDetails />} />
			</Route>

			<Route path='/projects'>
				<Route index element={<Projects />} />
				<Route path='games' element={<ProjectsGames />} />
				<Route path='models' element={<ProjectsModels />} />
			</Route>

			<Route path='/create'>
				<Route path='badge' element={
					<RequireAuth>
						<CreateBadge />
					</RequireAuth>
				} />
			</Route>

			<Route path='/badges'>
				<Route index element={<Badges />} />
				<Route path=':userID' element={<Badges />} />
			</Route>

			<Route path='/tests'>
				<Route path='markdown' element={<MarkdownTest />} />
				<Route path='websocket' element={<WebsocketTest />} />
				<Route path='blob' element={
					<RequireAuth>
						<BlobTest />
					</RequireAuth>
				} />
				{/* <Route path='chat' element={<ChatSocketTest />} /> */}
			</Route>

			<Route path='/gallery'>
				<Route path=':ResourceID' element={<PreviewGallery />} />
				<Route path='vault' element={<GalleryVault />} />
				<Route index element={<PublicGallery />} />
			</Route>

			<Route path='/games'>
				<Route path='memory' element={<MemoryGame />} />
			</Route>

			<Route path='statistics' element={<Stats />} />
			<Route path='directory' element={<Directories />} />

			<Route path='/*' element={<NotFound />} />
		</Routes>
	) : <center className='loading' />
}

export default App
