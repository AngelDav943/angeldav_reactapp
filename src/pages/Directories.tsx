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

			<DirLink to="/gallery" />
			<DirLink to="/gallery/vault" />

			<DirLink to="/posts" />
			<DirLink to="/posts/create" />

			<DirLink to="/login" />
			<DirLink to="/signin" />
			<DirLink to="/dashboard" />

			<DirLink to="/users" />
			<DirLink to="/badges" />

			<DirLink to="/games/memory" />

			<DirLink to="/statistics" />
			<DirLink to="/directory" />
		</section>
	</main>
}
