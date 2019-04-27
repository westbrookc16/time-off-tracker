import React, { useContext } from 'react';
import Balances from './balances';
import UserContext from './userContext';
//import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuthState } from './firebase-hooks';
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

	const user = useAuthState(firebase.auth);

	return (
		<div className="App">
			<UserContext.Provider value={user}>
				<Router>
					<Navigation user={user} signOut={firebase.signOut} />
					<Route path="/" exact component={Home} />
					<Route path="/balances" component={Balances} />
					<Route path="/signin" component={SignIn} />
					<Route path="/requests/add" component={RequestContainer} />
					<Route path="/requests/edit/:id" component={RequestContainer} />
					<Route path="/requests/view" component={ViewRequestContainer} />
				</Router>
			</UserContext.Provider>
		</div>
	);
};
//}

export default App;
