import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
//import { validateDate, validateNumber, validateText } from './validate';
import moment from 'moment';
//eslint-disable-next-line
import * as businessDiff from 'moment-business-days';
const RequestForm = ({ success, setSuccess, request, touched, handleChange, onAdd, handleBlur, setAllTouched }) => {
	useEffect(() => {
		validateForm(request);
	}, [request, touched]);
	const { type, startDate, endDate, description, numDays } = request;
	const [startDateMsg, setStartDateMsg] = useState('');
	const [endDateMsg, setEndDateMsg] = useState('');
	const [typeMsg, setTypeMsg] = useState('');
	const [descriptionMsg, setDescriptionMsg] = useState('');

	const validateForm = request => {
		const { startDate, endDate, description, type } = request;

		setTypeMsg(type === '' ? 'You must select a type' : '');
		setDescriptionMsg(description === '' ? 'You must enter a description' : '');
		setStartDateMsg(!moment(startDate, 'M/D/YYYY', true).isValid() ? 'You must enter a valid date' : '');
		setEndDateMsg(!moment(endDate, 'M/D/YYYY', true).isValid() ? 'You must enter a valid date' : '');
		let dStartDate = moment(startDate, 'M/D/YYYY', true);
		let dENdDate = moment(endDate, 'M/D/YYYY', true);
		if (startDate !== '' && endDate !== '' && dStartDate.isValid() && dENdDate.isValid()) {
			console.log('Is valid dae');
			if (dStartDate > dENdDate) {
				setStartDateMsg('Your start date must be earlier than your end date.');
				setEndDateMsg('Your start date must be earlier than your end date.');
			} else {
				setStartDateMsg('');
				setEndDateMsg('');
			}
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		setAllTouched();
		if (typeMsg || startDateMsg || descriptionMsg || endDateMsg) {
			console.log('invalid');
		} else {
			request.year = moment(request.startDate, 'M/D/YYYY', true).year();
			onAdd(request);
		}
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="type">
					<Form.Control as="select" onBlur={handleBlur} value={type} onChange={handleChange} name="type">
						<option value="">?</option>
						<option>Personal</option>
						<option>Sick</option>
						<option>Vacation</option>
					</Form.Control>
					{typeMsg && touched['type'] && (
						<Form.Control.Feedback type="invalid">{typeMsg}</Form.Control.Feedback>
					)}
				</Form.Group>
				<Form.Group controlId="startDate">
					<Form.Label>Start Date</Form.Label>
					<Form.Control
						type="text"
						name="startDate"
						onBlur={handleBlur}
						value={startDate}
						onChange={handleChange}
					/>
					{startDateMsg && touched['startDate'] && (
						<Form.Control.Feedback type="invalid">{startDateMsg}</Form.Control.Feedback>
					)}
				</Form.Group>

				<Form.Group controlId="endDate">
					<Form.Label>End Date</Form.Label>
					<Form.Control
						onBlur={handleBlur}
						type="text"
						name="endDate"
						onChange={handleChange}
						value={endDate}
					/>
					{endDateMsg && touched['endDate'] && (
						<Form.Control.Feedback type="invalid">{endDateMsg}</Form.Control.Feedback>
					)}
				</Form.Group>
				<Form.Group controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						onBlur={handleBlur}
						name="description"
						value={description}
						type="text"
						onChange={handleChange}
					/>
					{descriptionMsg && touched['description'] && (
						<Form.Control.Feedback>{descriptionMsg}</Form.Control.Feedback>
					)}
				</Form.Group>
				<button type="submit">Submit</button>
			</Form>

			{numDays > 0 && <div>Your vacation is {numDays} days long.</div>}
			{success && (
				<Alert
					variant="success"
					dismissible
					onClose={() => {
						setSuccess(false);
					}}
				>
					Your request was added successfully.
				</Alert>
			)}
		</div>
	);
};
export default RequestForm;
