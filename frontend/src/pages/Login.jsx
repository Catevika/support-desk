import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
	const userRef = useRef();

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password, type } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// * Redirect when logged in
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1 className='icon'>
					<FaSignInAlt style={{ marginRight: '0.25em' }} /> Login
				</h1>
				<p>Please log in to get support</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							ref={userRef}
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							onChange={onChange}
							placeholder='Enter your email'
							autoComplete='username'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter password'
							autoComplete='current-password'
							required
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Log In</button>
					</div>
				</form>
				<p>
					Not registered yet?{' '}
					<span>
						<Link to={'/register'} style={{ color: 'steelblue' }}>
							Register
						</Link>
					</span>
				</p>
			</section>
		</>
	);
}

export default Login;
