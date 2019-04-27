import React, { useState, useContext, useEffect } from 'react';
import UserContext from './userContext';
import ReqList from './reqlist';
import { FirebaseContext } from './firebase';

const ViewRequestContainer = () => {
	const firebase = useContext(FirebaseContext);
	const [showModal, setShowModal] = useState(false);
	const [selectedId, setSelectedId] = useState('');
	const user = useContext(UserContext);

	const [reqList, setReqList] = useState([]);

	const [year, setYear] = useState('2019');
	useEffect(() => {
		document.title = `View ${year} Requests`;
	}, [year]);

	const setModal = id => {
		setShowModal(true);
		setSelectedId(id);
	};
	useEffect(() => {
		console.log(`year=${year}`);
		const unsubscribe = firebase.db
			.collection('requests')
			.where('uid', '==', user ? user.uid : '')
			.where('year', '==', parseInt(year))
			.orderBy('startDate')
			.onSnapshot(data => {
				//console.log(data);
				const list = [];
				data.forEach(doc => {
					let req = {};
					req['id'] = doc.id;
					req = { ...req, ...doc.data() };
					list.push(req);
				});

				setReqList(list);
			});

		return unsubscribe;
	}, [user, year]);
	const deleteRequest = id => {
		firebase.db
			.collection('requests')
			.doc(id)
			.delete()
			.then(u => {
				setShowModal(false);
			});
	};
	const closeModal = () => {
		setShowModal(false);
	};
	return (
		<div>
			<label htmlFor="year">Year</label>
			<select
				id="year"
				name="year"
				onChange={e => {
					setYear(e.target.value);
				}}
				value={year}
			>
				<option>2019</option>
				<option>2020</option>
				<option>2021</option>
			</select>
			<br />
			<ReqList
				reqList={reqList}
				onDelete={setModal}
				showModal={showModal}
				onConfirm={deleteRequest}
				onCancel={closeModal}
				selectedId={selectedId}
			/>
		</div>
	);
};
export default ViewRequestContainer;
