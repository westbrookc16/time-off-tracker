import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { FirebaseContext } from './firebase/firebase';
import userContext from './firebase/UserContext';
const Balances = () => {
	useEffect(() => {
		document.title = 'add/Edit  Balances.';
	}, []);
	const [year, setYear] = useState('2019');
	const [successMsg, setSuccessMsg] = useState('');
	const [balance, setBalance] = useState({ personal: 0, sick: 0, vacation: 0, year: 2019 });
	const [errors, setErrors] = useState([]);
	const user = useContext(userContext);
	const firebase = useContext(FirebaseContext);
	const validateForm = balance => {
		let errorMsgs = [];
		const { personal, sick, vacation } = balance;
		if (!personal) errorMsgs = errorMsgs.concat('You must enter a balance for Personal days.');
		if (!vacation) errorMsgs = errorMsgs.concat('You must enter a balance for Vacation days.');
		if (!sick) errorMsgs = errorMsgs.concat('You must enter a balance for Sick days.');
		setErrors(errorMsgs);
		return errorMsgs.length > 0 ? false : true;
	};
	const handleChange = e => {
		setBalance({ ...balance, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		firebase.db
			.collection('balances')
			.doc(`${user.uid}${year}`)
			.get()
			.then(doc => {
				if (doc.exists) {
					setBalance(doc.data());
				} else {
					setBalance({ year: year, personal: 0, sick: 0, vacation: 0 });
				}
			});
	}, [year, user]);
	const { personal, sick, vacation } = balance;
	const handleSubmit = e => {
		e.preventDefault();
		if (!validateForm(balance)) return;
		const { uid } = user;
		firebase.db
			.collection('balances')
			.doc(`${uid}${year}`)
			.set(balance)
			.then(u => {
				setSuccessMsg('Your balance was added successfully.');
			});
	};
	const errorLis = errors.map((msg, i) => <li key={i}>{msg}</li>);
	return (
		<div>
			<h1>Add/Edit Balances</h1>
			Enter your initial beginning balances for the year for future reference.
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="year">
					<Form.Label>Year</Form.Label>
					<Form.Control
						as="select"
						value={year}
						onChange={e => {
							setYear(e.target.value);
						}}
					>
						<option>2019</option>
						<option>2020</option>
						<option>2021</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="personal">
					<Form.Label>Personal</Form.Label>
					<Form.Control name="personal" value={personal} type="number" onChange={handleChange} />
				</Form.Group>
				<Form.Group controlId="vacation">
					<Form.Label>Vacation</Form.Label>
					<Form.Control name="vacation" value={vacation} type="number" onChange={handleChange} />
				</Form.Group>
				<Form.Group controlId="sick">
					<Form.Label>Sick</Form.Label>
					<Form.Control name="sick" value={sick} type="number" onChange={handleChange} />
				</Form.Group>
				<Button type="submit">Submit</Button>
			</Form>
			{successMsg && (
				<Alert
					tabIndex="-1"
					dismissible
					onClose={() => {
						setSuccessMsg('');
					}}
					variant="success"
				>
					{successMsg}
				</Alert>
			)}
			{errors.length > 0 && (
				<Alert variant="danger">
					<ul>{errorLis}</ul>
				</Alert>
			)}
		</div>
	);
};
export default Balances;
