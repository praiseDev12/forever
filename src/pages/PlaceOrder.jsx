import { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { paymentMethods } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
	const [method, setmethod] = useState('cod');

	const { navigate } = useContext(ShopContext);

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

	return (
		<div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
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
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='Firt Name...'
						/>
						<input
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='Last Name...'
						/>
					</div>
					<input
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
						type='email'
						placeholder='email address...'
					/>
					<input
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
						type='text'
						placeholder='Street name...'
					/>
					<div className='flex gap-3'>
						<input
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='city...'
						/>
						<input
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='state...'
						/>
					</div>
					<div className='flex gap-3'>
						<input
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='number'
							placeholder='zipcode'
						/>
						<input
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							type='text'
							placeholder='Country...'
						/>
					</div>
					<input
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
							onClick={() => navigate('/orders')}
							className='bg-black cursor-pointer text-white px-15 py-3 text-sm'>
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;
