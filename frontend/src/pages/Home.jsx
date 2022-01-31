import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

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
				<FaTicketAlt /> View my Ticket
			</Link>
		</>
	);
}

export default Home;
