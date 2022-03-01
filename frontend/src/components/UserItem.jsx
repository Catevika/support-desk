import { Link } from 'react-router-dom';

function UserItem({ user }) {
	return (
		<div className='user'>
			<div>{new Date(user.createdAt).toLocaleDateString()}</div>
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div>{user.role}</div>
			<div>{user._id}</div>
			<Link to={`/users/${user._id}`} className='btn btn-reverse btn-sm'>
				View
			</Link>
		</div>
	);
}

export default UserItem;
