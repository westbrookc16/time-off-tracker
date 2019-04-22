import React, { useState, useContext } from 'react';
import RequestForm from './requestForm';
import { FirebaseContext } from './firebase';
//import { validateText, validateNumber, validateDate } from './validate';
import { useAuthState } from 'react-firebase-hooks/auth';

const RequestContainer = () => {
	const [request, setRequest] = useState({ numDays: '0', startDate: '', endDate: '', description: '', type: '' });
	const firebase = useContext(FirebaseContext);
	const { init, user } = useAuthState(firebase.auth);
	const handleChange = (name, value) => {
		setRequest({ ...request, [name]: value });
	};
	const addRequest = request => {
		request.uid = user.uid;
		const q = firebase.db.collection('requests').add(request);
	};
	return <RequestForm request={request} handleChange={handleChange} onAdd={addRequest} />;
};
export default RequestContainer;
