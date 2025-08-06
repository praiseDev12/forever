import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets';

const Login = () => {
	const [currentState, setCurrentState] = useState('Login');
	const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [logging, setLogging] = useState(false);

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		setLogging(true);

		try {
			if (currentState === 'Sign Up') {
				await axios
					.post(backendUrl + '/api/user/register', {
						name,
						email,
						password,
					})
					.then(({ data }) => {
						setToken(data.token);
						localStorage.setItem('token', data.token);
						setLogging(false);
					})
					.catch(({ response: { data } }) => {
						toast.error(data.message);
						setLogging(false);
					});
			} else {
				await axios
					.post(backendUrl + '/api/user/login', { email, password })
					.then(({ data }) => {
						setToken(data.token);
						localStorage.setItem('token', data.token);
						toast.success('Welcome');
						setLogging(false);
					})
					.catch(({ response: { data } }) => {
						toast.error(data.message);
						setLogging(false);
					});
			}
		} catch (err) {
			console.log(err);
			toast.error('Something went wrong, Please try again');
			setLogging(false);
		}
	};

	useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token]);

	return (
		<form
			onSubmit={onSubmitHandler}
			className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
			<div className='inline-flex items-center gap-2 mb-2 mt-10'>
				<p className='prata-regular text-3xl'>{currentState}</p>
				<hr className='border-none h-[1.5px] w-8 bg-gray-800' />
			</div>
			{currentState === 'Login' ? (
				''
			) : (
				<input
					type='text'
					className='w-full px-3 py-2 border border-gray-800'
					placeholder='Name...'
					onChange={(e) => setName(e.target.value)}
					value={name}
					required
				/>
			)}
			<input
				type='email'
				className='w-full px-3 py-2 border border-gray-800'
				placeholder='enter email...'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				required
			/>
			<div className='flex w-full px-3 py-2 gap-1 border border-gray-800'>
				<input
					type={passwordVisible ? 'text' : 'password'}
					className='w-full outline-none'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
				<img
					src={passwordVisible ? assets.not_visible : assets.visible}
					onClick={() => setPasswordVisible((prev) => !prev)}
					className='w-7 h-7 cursor-pointer'
				/>
			</div>

			<div className='w-full flex justify-between text-sm mt-[-8px]'>
				<p className='cursor-pointer'>Forgot your password?</p>
				{currentState === 'Login' ? (
					<p
						onClick={() => setCurrentState('Sign Up')}
						className='cursor-pointer'>
						Create an account
					</p>
				) : (
					<p
						onClick={() => setCurrentState('Login')}
						className='cursor-pointer'>
						Login In
					</p>
				)}
			</div>
			<button
				disabled={logging}
				className='bg-black disabled:opacity-30 disabled:cursor-not-allowed text-white font-light px-8 py-2 mt-4 cursor-pointer'>
				{currentState === 'Login' ? 'Sign In' : 'Sign Up'}
			</button>
		</form>
	);
};

export default Login;
