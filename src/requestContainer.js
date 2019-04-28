import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import RequestForm from './RequestForm';
import { FirebaseContext } from './firebase/firebase';
//import { validateText, validateNumber, validateDate } from './validate';
//import { useAuthState } from 'react-firebase-hooks/auth';
import UserContext from './firebase/UserContext';

const RequestContainer = props => {
	const { id } = props.match.params;

	const firebase = useContext(FirebaseContext);

	const user = useContext(UserContext);

	const [request, setRequest] = useState({ numDays: '0', startDate: '', endDate: '', description: '', type: '' });
	const [touched, setTouched] = useState({ startDate: false, endDate: false, description: false, type: false });
	const [success, setSuccess] = useState(false);
	const { startDate, endDate } = request;

	useEffect(() => {
		if (id) {
			firebase.db
				.collection('requests')
				.doc(id)
				.get()
				.then(doc => {
					//setReqId(id);
					let returnedDoc = { ...doc.data() };
					returnedDoc.startDate = moment(returnedDoc.startDate.toDate()).format('M/D/YYYY');
					returnedDoc.endDate = moment(returnedDoc.endDate.toDate()).format('M/D/YYYY');
					setRequest(returnedDoc);
				});
		}
	}, [id]);

	const calcDiff = (startDate, endDate) => {
		let dStartDate = moment(startDate, 'M/D/YYYY', true);
		let dEndDate = moment(endDate, 'M/D/YYYY', true);
		if (dStartDate.isValid() && dEndDate.isValid() && dEndDate >= dStartDate) {
			setRequest({ ...request, numDays: dEndDate.businessDiff(dStartDate) + 1 });
		} else {
			setRequest({ ...request, numDays: 0 });
		}
	};

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
	const handleChange = e => {
		const { name, value } = e.target;
		setRequest({ ...request, [name]: value });
	};
	const addRequest = request => {
		request.uid = user.uid;
		request.displayName = user.displayName;
		request.startDate = new Date(request.startDate);
		request.endDate = new Date(request.endDate);
		if (!id) {
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
			console.log('adding');
		} else {
			firebase.db
				.collection('requests')
				.doc(id)
				.set(request);
			props.history.push('/requests/view');
		}
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
