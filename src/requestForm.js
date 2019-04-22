import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { validateDate, validateNumber, validateText } from './validate';
const RequestForm = ({ request, handleChange, onAdd }) => {
	const { type, startDate, endDate, description } = request;
	const [startDateMsg, setStartDateMsg] = useState('');
	const [endDateMsg, setEndDateMsg] = useState('');
	const [typeMsg, setTypeMsg] = useState('');
	const [descriptionMsg, setDescriptionMsg] = useState('');
	return (
		<div>
			<Form>
				<Form.Group controlId="type">
					<Form.Control
						as="select"
						value={type}
						onChange={e => {
							handleChange('type', e.target.value);
						}}
					>
						<option value="">?</option>
						<option>Personal</option>
						<option>Sick</option>
						<option>Vacation</option>
					</Form.Control>
					{typeMsg && <Form.Control.Feedback type="invalid">{typeMsg}</Form.Control.Feedback>}
				</Form.Group>
				<Form.Group controlId="startDate">
					<Form.Label>Start Date</Form.Label>
					<Form.Control
						type="text"
						name="startDate"
						value={startDate}
						onChange={e => {
							const { name, value } = e.target;
							handleChange(name, value);
							setStartDateMsg(validateDate(value, 'You must enter a valid date.'));
						}}
					/>
					{startDateMsg && <Form.Control.Feedback type="invalid">{startDateMsg}</Form.Control.Feedback>}
				</Form.Group>

				<Form.Group controlId="endDate">
					<Form.Label>End Date</Form.Label>
					<Form.Control
						type="text"
						name="endDate"
						onChange={e => {
							const { name, value } = e.target;
							handleChange(name, value);
							setEndDateMsg(validateDate(value, 'You must enter a valid date.'));
						}}
						value={endDate}
					/>
					{endDateMsg && <Form.Control.Feedback type="invalid">{endDateMsg}</Form.Control.Feedback>}
				</Form.Group>
			</Form>
			{JSON.stringify(request)}
		</div>
	);
};
export default RequestForm;
