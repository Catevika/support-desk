import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
	const { user } = useSelector((state) => state.auth);
	const { tickets, isLoading, isSuccess } = useSelector(
		(state) => state.tickets
	);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return tickets.length > 0 ? (
		<>
			<BackButton url='/' />
			<h1>Tickets</h1>
			<div className='tickets'>
				<div className='ticket-headings'>
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
				</div>
				{tickets.length === 0 ? (
					<h3 style={{ color: 'steelblue' }}>
						No tickets from {user.name} yet
					</h3>
				) : (
					tickets.map((ticket) => (
						<TicketItem key={ticket._id} ticket={ticket} />
					))
				)}
			</div>
		</>
	) : (
		<h1 style={{ color: 'steelblue' }}>No Ticket yet</h1>
	);
}

export default Tickets;
