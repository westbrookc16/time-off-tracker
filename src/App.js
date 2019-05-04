import React, { useContext } from 'react';
import Balances from './Balances';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import RequestContainer from './RequestContainer';
import ViewRequestContainer from './ViewRequestsContainer';
import Navigation from './Navigation';
import SignIn from './SignIn';
import UserContext from './firebase/UserContext';
import FirebaseContext from './firebase/firebase';
const App = props => {
	const user = useContext(UserContext);
	const firebase = useContext(FirebaseContext);
	if (!firebase) return <div>Hello</div>;
	console.log(firebase);
	return (
		<div className="App">
			<Router>
				<Navigation user={user} signOut={firebase.signOut} />
				<Route path="/" exact component={Home} />
				<Route path="/balances" component={Balances} />
				<Route path="/signin" component={SignIn} />
				<Route path="/requests/add" component={RequestContainer} />
				<Route path="/requests/edit/:id" component={RequestContainer} />
				<Route path="/requests/view" component={ViewRequestContainer} />
			</Router>
		</div>
	);
};
//}

export default App;
