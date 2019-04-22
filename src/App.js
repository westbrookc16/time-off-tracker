import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import RequestContainer from './requestContainer';
import Navigation from './navigation';
import SignIn from './signin';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Navigation />
					<Route path="/" exact component={Home} />
					<Route path="/signin" component={SignIn} />
					<Route path="/requests/add" component={RequestContainer} />
				</Router>
			</div>
		);
	}
}

export default App;
