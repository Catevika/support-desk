import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import User from './pages/User';
import Error from './pages/Error';

function App() {
	return (
		<>
			<Router>
				<main className='container'>
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />

						{/* Users routes */}
						<Route path='/users/me' element={<PrivateRoute />}>
							<Route path='/users/me' element={<User />} />
						</Route>

						{/* Tickets routes */}
						<Route path='/new-ticket' element={<PrivateRoute />}>
							<Route path='/new-ticket' element={<NewTicket />} />
						</Route>
						<Route path='/tickets' element={<PrivateRoute />}>
							<Route path='/tickets' element={<Tickets />} />
						</Route>
						<Route path='/tickets/:ticketId' element={<PrivateRoute />}>
							<Route path='/tickets/:ticketId' element={<Ticket />} />
						</Route>

						{/* Undefined Routes */}
						<Route path='*' element={<Error />}></Route>
					</Routes>
				</main>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
