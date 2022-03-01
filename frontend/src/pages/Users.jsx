import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList, reset } from '../features/users/userSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import UserItem from '../components/UserItem';

function Users() {
	const { users, isLoading, isSuccess } = useSelector((state) => state.users);

	console.log(users);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getUserList());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return users.length > 0 ? (
		<>
			<BackButton url='/' />
			<h1>Users</h1>
			<div className='users'>
				<div className='user-headings'>
					<div>Date</div>
					<div>Name</div>
					<div>Email</div>
					<div>Role</div>
					<div>Id</div>
					<div>Profile</div>
				</div>
				{users.length === 0 ? (
					<h3 style={{ color: 'steelblue' }}>No User Found</h3>
				) : (
					users.map((user) => <UserItem key={user._id} user={user} />)
				)}
			</div>
		</>
	) : (
		<h1 style={{ color: 'steelblue' }}>No User Found</h1>
	);
}

export default Users;
