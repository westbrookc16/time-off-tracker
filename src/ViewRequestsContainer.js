import React, { useState, useContext, useEffect, useRef } from 'react';
import UserContext from './firebase/UserContext';
import ReqList from './ReqList';
import { FirebaseContext } from './firebase/firebase';

const ViewRequestContainer = () => {
	const refYear = useRef(null);
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
	const [balance, setBalance] = useState([]);
	useEffect(() => {
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
		//get balance
		firebase.db
			.collection('balances')
			.doc(`${user.uid}${year}`)
			.get()
			.then(doc => {
				if (doc.exists) setBalance(doc.data());
				else setBalance({ vacation: 0, sick: 0, personal: 0 });
			});
		return unsubscribe;
	}, [user, year]);
	const setYearFocus = () => {
		refYear.current.focus();
	};
	return (
		<div>
			<label htmlFor="year">Year</label>
			<select
				ref={refYear}
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
				setYearFocus={setYearFocus}
				reqList={reqList}
				balance={balance}
				showDeleteModal={setModal}
				showModal={showModal}
				onConfirm={deleteRequest}
				onCancel={closeModal}
				selectedId={selectedId}
			/>
		</div>
	);
};
export default ViewRequestContainer;
