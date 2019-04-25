import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import RequestForm from './requestForm';
import { FirebaseContext } from './firebase';
//import { validateText, validateNumber, validateDate } from './validate';
import { useAuthState } from 'react-firebase-hooks/auth';

const RequestContainer = () => {
	const [request, setRequest] = useState({ numDays: '0', startDate: '', endDate: '', description: '', type: '' });
	const [touched, setTouched] = useState({ startDate: false, endDate: false, description: false, type: false });
	const [success, setSuccess] = useState(false);
	const calcDiff = (startDate, endDate) => {
		let dStartDate = moment(startDate, 'M/D/YYYY', true);
		let dEndDate = moment(endDate, 'M/D/YYYY', true);
		if (dStartDate.isValid() && dEndDate.isValid() && dEndDate >= dStartDate) {
			setRequest({ ...request, numDays: dEndDate.businessDiff(dStartDate) + 1 });
		} else {
			setRequest({ ...request, numDays: 0 });
		}
	};
	const { startDate, endDate } = request;
	useEffect(() => {
		calcDiff(startDate, endDate);
	}, [startDate, endDate]);
	const handleBlur = e => {
		const { name } = e.target;
		setTouched({ ...touched, [name]: true });
	};
	const setAllTouched = () => {
		setTouched({ description: true, type: true, startDate: true, endDate: true });
	};
	const firebase = useContext(FirebaseContext);
	//eslint-disable-next-line
	const { init, user } = useAuthState(firebase.auth);
	const handleChange = e => {
		const { name, value } = e.target;
		setRequest({ ...request, [name]: value });
	};
	const addRequest = request => {
		request.uid = user.uid;
		request.displayName = user.displayName;
		request.startDate = new Date(request.startDate);
		request.endDate = new Date(request.endDate);
		firebase.db
			.collection('requests')
			.add(request)
			.then(u => {
				setSuccess(true);
				setTouched({ startDate: false, endDate: false, description: false, type: false });
				setRequest({ numDays: '0', startDate: '', endDate: '', description: '', type: '' });
			})
			.catch(e => {
				console.log(`e=${e}`);
			});
	};
	return (
		<RequestForm
			success={success}
			setSuccess={setSuccess}
			request={request}
			touched={touched}
			handleChange={handleChange}
			onAdd={addRequest}
			handleBlur={handleBlur}
			setAllTouched={setAllTouched}
		/>
	);
};
export default RequestContainer;
