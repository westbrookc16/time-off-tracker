import React, { useContext, useEffect } from 'react';

import UserContext from './userContext';

const Home = () => {
	const user = useContext(UserContext);
	useEffect(() => {
		document.title = 'Home';
	}, []);

	return (
		<div>
			<h1>Home</h1>
			{user && <div>Welcome {user.displayName}</div>} <br />
			This is my first serious react app. After signing in with an email or your google account, add time off
			requests and when you click on view requests you will be able to see and edit them by year. Have fun.
		</div>
	);
};
export default Home;
