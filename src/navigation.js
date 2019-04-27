import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
const Navigation = ({ user, signOut, history }) => (
	<div>
		<ul>
			{!user && (
				<li>
					<Link to="/signin">Sign In</Link>
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
			{user && (
				<li>
					<Button
						onClick={e => {
							signOut();
							history.push('/');
						}}
					>
						Sign Out
					</Button>
				</li>
			)}
		</ul>
	</div>
);
export default withRouter(Navigation);
