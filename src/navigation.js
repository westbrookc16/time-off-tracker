import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = ({ user }) => (
	<div>
		<ul>
			{!user && (
				<li>
					<Link to="/signin">Sign Inn</Link>
				</li>
			)}
			{user && (
				<li>
					<Link to="/requests/add">Add Request</Link>
				</li>
			)}
			{user && (
				<li>
					<Link to="/requests/view">View Requests</Link>
				</li>
			)}
		</ul>
	</div>
);
export default Navigation;
