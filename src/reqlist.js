import React from 'react';
import moment from 'moment';
const ReqList = ({ reqList }) => {
	let trs = [];
	//if (!reqList) return <div />;
	trs = reqList.map(i => {
		const data = i;

		return (
			<tr key={i.id}>
				<td>{data.description}</td>
				<td>{moment(data.startDate.toDate()).format('M/D/YYYY')}</td>
				<td>{moment(data.endDate.toDate()).format('M/D/YYYY')}</td>
				<td>{data.type}</td>
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
			<table>
				<thead>
					<tr>
						<td>Description</td>
						<td>Start Date</td>
						<td>End Date</td>
						<td>Type</td>
					</tr>
				</thead>
				<tbody>{trs}</tbody>
			</table>
			<h1>Totals</h1>
			<table>
				<tbody>
					<tr>
						<td>Sick</td>
						<td>{totals.totalSick}</td>
					</tr>
					<tr>
						<td>Personal</td>
						<td>{totals.totalPersonal}</td>
					</tr>
					<tr>
						<td>Vacation</td>
						<td>{totals.totalVacation}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default ReqList;
