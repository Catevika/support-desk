import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
	const { ticket, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.tickets
	);

	const params = useParams();
	const dispatch = useDispatch();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.message(message);
		}

		dispatch(getTicket(ticketId));
	}, [isError, message, ticketId, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		<h3>Something went wrong</h3>;
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/tickets' />
				<h2>
					Ticket Id: {ticket._id}
					<span className={`status status-${ticket.status}`}></span>
				</h2>
				<hr />
				<h3>
					Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
				</h3>
				<div className='ticket-desc'>
					<h3>Product</h3>
					<p>{ticket.product}</p>
				</div>
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
			</header>
		</div>
	);
}

export default Ticket;