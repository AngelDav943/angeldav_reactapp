import React, { useEffect, useState } from 'react'
import { useInfo } from '../context/useInfo'
import { Link } from "react-router-dom"

import './footer.css'

export default function () {

	return <footer>
		<div className="row">
			<div className="links">
				<Link to="/directory" >Directory</Link>
				<Link to="/statistics" >Statistics</Link>
				<Link to="https://github.com/AngelDav943" >Github</Link>
			</div>
			<span>Last updated: June 20th 2024</span>
		</div>
		<div className="row">
			<p className="icon" >Angel's website</p>
		</div>
	</footer>
}
