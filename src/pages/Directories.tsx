import React from 'react'
import { useInfo } from '../context/useInfo'
import { Link } from "react-router-dom"

import './directories.css'

export default function () {

	function DirLink({to: location}) {
		return <Link to={location}>{location}</ Link>
	}

	return <main className="directories">
		<section>
			<p>Website directory</p>
			<DirLink to="/" />

			<DirLink to="/projects" />
			<DirLink to="/projects/games" />
			<DirLink to="/projects/models" />

			<DirLink to="/posts" />
			<DirLink to="/posts/create" />

			<DirLink to="/dashboard" />
			<DirLink to="/login" />
			<DirLink to="/signin" />

			<DirLink to="/users" />
			<DirLink to="/badges" />

			<DirLink to="/games/memory" />

			<DirLink to="/directory" />
			<DirLink to="/statistics" />
		</section>
	</main>
}
