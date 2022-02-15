import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

function Home() {
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
