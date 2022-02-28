import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

// ? TODO - attention la base est une base de test - Remettre MONGO_URI de la base de production

function Register() {
	const userRef = useRef();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		role: 'Select...'
	});

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const { name, email, password, password2, role } = formData;

  const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		// * Redirect when user is logged in
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [isLoading, isError, isSuccess, message, navigate, dispatch, user]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			const userData = {
				name,
				email,
				password,
				role
			};

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1 className='icon'>
					<FaUser style={{ marginRight: '0.25em' }} /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='name'>Name:</label>
						<input
							ref={userRef}
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							onChange={onChange}
							placeholder='Enter your name'
							autoComplete='username'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Email:</label>
						<input
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
						<label htmlFor='password'>Password:</label>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter your password'
							autoComplete='current-password'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password2'>Confirm Password:</label>
						<input
							type='password'
							className='form-control'
							id='password2'
							name='password2'
							value={password2}
							onChange={onChange}
							placeholder='Confirm password'
							autoComplete='new-password'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='role'>Role:</label>
						<select
							name='role'
							id='role'
							value={role}
							onChange={onChange}
							required
						>
							<option disabled defaultValue>
								Select...
							</option>
							<option value='Administrator'>Administrator</option>
							<option value='Technician'>Technician</option>
							<option value='Employee'>Employee</option>
						</select>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Register</button>
					</div>
				</form>
				<p>
					Already registered?{' '}
					<span>
						<Link to={'/login'} style={{ color: 'steelblue' }}>
							Log In
						</Link>
					</span>
				</p>
			</section>
		</>
	);
}

export default Register;
