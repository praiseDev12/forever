import { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { paymentMethods } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
	const [method, setmethod] = useState('cod');
	const {
		navigate,
		products,
		deliveryFee,
		cartItems,
		setCartItems,
		getCartAmount,
		backendUrl,
		token,
	} = useContext(ShopContext);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zipCode: '',
		country: '',
		phone: '',
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormData((data) => ({ ...data, [name]: value }));
	};

	useGSAP(() => {
		gsap.fromTo(
			'#info-form',
			{
				x: -50,
				opacity: 0,
				duration: 1,
				ease: 'expo.inOut',
			},
			{
				opacity: 1,
				x: 0,
			}
		);
	}, []);

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			let orderItems = [];

			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						const itemInfo = structuredClone(
							products.find((products) => products._id === items)
						);
						if (itemInfo) {
							itemInfo.size = item;
							itemInfo.quantity = cartItems[items][item];
							orderItems.push(itemInfo);
						}
					}
				}
			}

			let orderData = {
				address: formData,
				items: orderItems,
				amount: getCartAmount() + deliveryFee,
			};

			switch (method) {
				// API calls or COD
				case 'cod':
					const response = await axios.post(
						backendUrl + '/api/order/place',
						orderData,
						{
							headers: { token },
						}
					);

					if (response.data.success) {
						setCartItems({});
						navigate('orders');
					} else {
						toast.error(response.data.message);
					}
					break;

				case 'stripe':
					await axios
						.post(backendUrl + '/api/order/stripe', orderData, {
							headers: { token },
						})
						.then(({ data }) => {
							window.location.replace(data.session_url);
						})
						.catch(({ response: { data } }) => {
							toast.error(data.message);
						});

					break;

				default:
					break;
			}
		} catch (err) {}
	};

	return (
		<form
			onSubmit={onSubmitHandler}
			className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
			{/* -------------- Left Side ---------------- */}
			<div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
				<div className='text-4xl sm:text-2xl my-3'>
					<Title
						text1='delivery'
						text2='information'
						cl1='delivery'
						cl2='information'
						cl3='deliver-info'
					/>
				</div>

				<div
					id='info-form'
					className='flex flex-col gap-4 border border-gray-50 p-3'>
					<div className='flex gap-3'>
						<input
							required
							onChange={onChangeHandler}
							name='firstName'
							value={formData.firstName}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='Firt Name...'
						/>
						<input
							required
							onChange={onChangeHandler}
							name='lastName'
							value={formData.lastName}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='Last Name...'
						/>
					</div>
					<input
						required
						onChange={onChangeHandler}
						name='email'
						value={formData.email}
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
						type='email'
						placeholder='email address...'
					/>
					<input
						required
						onChange={onChangeHandler}
						name='street'
						value={formData.street}
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
						type='text'
						placeholder='Street name...'
					/>
					<div className='flex gap-3'>
						<input
							required
							onChange={onChangeHandler}
							name='city'
							value={formData.city}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='city...'
						/>
						<input
							required
							onChange={onChangeHandler}
							name='state'
							value={formData.state}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='state...'
						/>
					</div>
					<div className='flex gap-3'>
						<input
							required
							onChange={onChangeHandler}
							name='zipCode'
							value={formData.zipCode}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='number'
							placeholder='zipcode'
						/>
						<input
							required
							onChange={onChangeHandler}
							name='country'
							value={formData.country}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='Country...'
						/>
					</div>
					<input
						required
						onChange={onChangeHandler}
						name='phone'
						value={formData.phone}
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
						type='number'
						placeholder='phone number'
					/>
				</div>
			</div>

			{/* -------------- Right Side ---------------- */}
			<div className='mt-8'>
				<div className='mt-8 min-w-80'>
					<CartTotal />
				</div>

				<div className='mt-12'>
					<Title
						text1='payment'
						text2='method'
						cl1='payment'
						cl2='method'
						cl3='pay-method'
					/>
					{/* -------------- payment method ------------ */}
					<div className='flex gap-3 flex-col lg:flex-row'>
						{paymentMethods.map((item, index) => (
							<div
								key={index}
								onClick={() => setmethod(item.method)}
								className={`flex duration-300 hover:scale-105 items-center gap-3 border p-2 px-3 cursor-pointer ${
									method === item.method && 'shadow-xl scale-105'
								}`}>
								<p
									className={`min-w-3.5 h-3.5 border rounded-full ${
										method === item.method && item.indicator
									}`}
								/>
								{item.cod ? (
									<p className='h-5 mx-4 uppercase'>{item.name}</p>
								) : (
									<img src={item.img} className='h-5 mx-4' />
								)}
							</div>
						))}
					</div>
					<div className='w-full text-end mt-8'>
						<button
							type='submit'
							className='bg-black cursor-pointer text-white px-15 py-3 text-sm'>
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
