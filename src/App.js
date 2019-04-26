import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './firebase';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import RequestContainer from './requestContainer';
import ViewRequestContainer from './ViewRequestsContainer';
import Navigation from './navigation';
import SignIn from './signin';

const App = () => {
	const firebase = useContext(FirebaseContext);
	//eslint-disable-next-line
	const { init, user } = useAuthState(firebase.auth);
	console.log('app rendering.');
	return (
		<div className="App">
			<Router>
				<Navigation user={user} />
				<Route path="/" exact component={Home} />
				<Route path="/signin" component={SignIn} />
				<Route path="/requests/add" component={RequestContainer} />
				<Route path="/requests/view" component={ViewRequestContainer} />
			</Router>
		</div>
	);
};
//}

export default App;
