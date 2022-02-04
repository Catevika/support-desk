import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
	const { ticket, isLoading, isError, message } = useSelector(
		(state) => state.tickets
	);

	const { notes, isLoading: notesIsLoading } = useSelector(
		(state) => state.notes
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.message(message);
		}

		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
	}, [isError, message, ticketId, dispatch]);

	// * Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success('Ticket Closed');
		navigate('/tickets');
	};

	if (isLoading || notesIsLoading) {
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
				{ticket.status === 'Closed' || notes.length === 0 ? null : (
					<h2>Notes</h2>
				)}
			</header>
			{notes.map((note) => {
				return <NoteItem key={note._id} note={note} />;
			})}

			{ticket.status !== 'Closed' && (
				<button className='btn btn-block btn-danger' onClick={onTicketClose}>
					Close Ticket
				</button>
			)}
		</div>
	);
}

export default Ticket;
