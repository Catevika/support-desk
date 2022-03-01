import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
function User() {
	const { user, isLoading, isError } = useSelector((state) => state.auth);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		<h3>Something went wrong</h3>;
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/' />
				<h2>User Id: {user._id}</h2>
				<hr />
				<h3>Date Registered: {Date(user.createdAt).toLocaleString()}</h3>

				<div className='ticket-desc'>
					<h3>Name</h3>
					<p>{user.name}</p>
				</div>
				<div className='ticket-desc'>
					<h3>Email</h3>
					<p>{user.email}</p>
				</div>
				<div className='ticket-desc'>
					<h3>Role</h3>
					<p>{user.role}</p>
				</div>
			</header>
		</div>
	);
}

export default User;
