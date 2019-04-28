import React, { useState, useEffect, useContext, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { FirebaseContext } from './firebase/firebase';
import userContext from './firebase/UserContext';
const Balances = () => {
	const refModal = useRef(null);
	const [year, setYear] = useState('2019');
	const [successMsg, setSuccessMsg] = useState('');
	const [balance, setBalance] = useState({ personal: 0, sick: 0, vacation: 0, year: 2019 });
	const user = useContext(userContext);
	const firebase = useContext(FirebaseContext);
	const handleChange = e => {
		setBalance({ ...balance, [e.target.name]: e.target.value });
	};
	//set modal to focus
	useEffect(() => {
		if (successMsg && refModal.current) {
			console.log(refModal.current);
			//refModal.current.focus();
		}
	}, [successMsg]);
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
		const { uid } = user;
		firebase.db
			.collection('balances')
			.doc(`${uid}${year}`)
			.set(balance)
			.then(u => {
				setSuccessMsg('Your balance was added successfully.');
			});
	};
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
					ref={refModal}
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
		</div>
	);
};
export default Balances;
