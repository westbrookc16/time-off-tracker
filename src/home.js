import React, { useContext } from 'react';
import { FirebaseContext } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Home = () => {
	const firebase = useContext(FirebaseContext);
	//eslint-disable-next-line
	const { init, user } = useAuthState(firebase.auth);

	console.log('running');
	return (
		<div>
			<h1>Welcome Home</h1>
			{user && <div>Welcome {user.displayName}</div>}{' '}
		</div>
	);
};
export default Home;
