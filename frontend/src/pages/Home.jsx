import { Link, useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';

function Home() {
	const { user, isLoading, isError } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		<h3>Something went wrong</h3>;
	}

	return (
		<>
			<section>
				<h1>What do you need help with?</h1>
				<p>Please chose from an option below</p>
			</section>
			<Link to='/new-ticket' className='btn btn-reverse btn-block'>
				<FaQuestionCircle /> Create New Ticket
			</Link>
			<Link to='/tickets' className='btn btn-block'>
				<FaTicketAlt /> View my Tickets
			</Link>
			<Link to='/users/me' className='btn btn-block'>
				<CgProfile /> View my Profile
			</Link>
		</>
	);
}

export default Home;
