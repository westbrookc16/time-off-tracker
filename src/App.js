import React, { useContext } from 'react';
import Balances from './Balances';
import UserContext from './firebase/UserContext';

import { useAuthState } from './firebase/firebase-hooks';
import { FirebaseContext } from './firebase/firebase';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import RequestContainer from './RequestContainer';
import ViewRequestContainer from './ViewRequestsContainer';
import Navigation from './Navigation';
import SignIn from './SignIn';

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
