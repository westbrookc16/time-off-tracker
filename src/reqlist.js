import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { Link } from 'react-router-dom';
const ReqList = ({ setYearFocus, onCancel, selectedId, showModal, reqList, showDeleteModal, onConfirm, balance }) => {
	const refModal = useRef(null);

	useEffect(() => {
		if (showModal) {
			refModal.current.focus();
		} else setYearFocus();
	}, [showModal]);
	let trs = [];

	trs = reqList.map(data => {
		return (
			<tr key={data.id}>
				<td>{data.description}</td>
				<td>{moment(data.startDate.toDate()).format('M/D/YYYY')}</td>
				<td>{moment(data.endDate.toDate()).format('M/D/YYYY')}</td>
				<td>{data.type}</td>
				<td>
					<Link to={`/requests/edit/${data.id}`}>Edit</Link>
				</td>
				<td>
					<button
						onClick={e => {
							e.preventDefault();
							showDeleteModal(data.id);
							console.log('deleting');
						}}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});
	let totals = { totalSick: 0, totalVacation: 0, totalPersonal: 0 };
	reqList.forEach(i => {
		totals[`total${i.type}`] += parseInt(i.numDays);
	});
	return (
		<div>
			<h1>Requests</h1>
			{reqList.length > 0 && (
				<table>
					<thead>
						<tr>
							<td>Description</td>
							<td>Start Date</td>
							<td>End Date</td>
							<td>Type</td>
							<td>Edit</td>
							<td>Delete</td>
						</tr>
					</thead>
					<tbody>{trs}</tbody>
				</table>
			)}
			<h1>Totals</h1>
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Beginning Balance</th>
						<th>Total Used</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Sick</td>
						<td>{balance.sick}</td>
						<td>{totals.totalSick}</td>
					</tr>
					<tr>
						<td>Personal</td>
						<td>{balance.personal}</td>
						<td>{totals.totalPersonal}</td>
					</tr>
					<tr>
						<td>Vacation</td>
						<td>{balance.vacation}</td>
						<td>{totals.totalVacation}</td>
					</tr>
				</tbody>
			</table>
			{showModal && (
				<Modal.Dialog role="dialog" ref={refModal} tabIndex="-1">
					<Modal.Header>
						<Modal.Title>Delete Request </Modal.Title>
					</Modal.Header>

					<Modal.Body>Are you sure you want to delete this request?</Modal.Body>

					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={e => {
								e.preventDefault();
								onCancel();
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={e => {
								onConfirm(selectedId);
							}}
							variant="primary"
						>
							Delete
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			)}
		</div>
	);
};
export default ReqList;
