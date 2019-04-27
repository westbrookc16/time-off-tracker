import React, { useContext, useEffect } from 'react';

import UserContext from './userContext';

const Home = () => {
	const user = useContext(UserContext);
	useEffect(() => {
		document.title = 'Home';
	}, []);
	console.log('running');
	return (
		<div>
			<h1>Welcome Home</h1>
			{user && <div>Welcome {user.displayName}</div>}{' '}
		</div>
	);
};
export default Home;
