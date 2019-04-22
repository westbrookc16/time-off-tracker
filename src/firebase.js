import React from 'react';
import { config } from './config.js';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class Firebase {
	constructor() {
		app.initializeApp(config);
		console.log('app initialized');

		this.emailProvider = app.auth.EmailAuthProvider.PROVIDER_ID;
		this.googleProvider = app.auth.GoogleAuthProvider.PROVIDER_ID;

		this.auth = app.auth();

		this.db = app.firestore();
	}

	authListener = (next, fallBack) => {
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				const query = this.db.collection('users').where('uid', '==', authUser.uid);
				query.get().then(snapShot => {
					snapShot.forEach(doc => {
						const dbUser = doc.data();
						const newUser = { email: authUser.email, uid: authUser.uid, ...dbUser };
						next(newUser);
					});
				});
			} else fallBack();
		});
	};
}

export default Firebase;
export const FirebaseContext = React.createContext(null);
