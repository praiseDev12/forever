import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
	const { products, currency, cartItems, updateQuantity, navigate } =
		useContext(ShopContext);

	const [cartData, setCartData] = useState([]);

	useEffect(() => {
		let tempData = [];

		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				if (cartItems[items][item] > 0) {
					tempData.push({
						_id: items,
						size: item,
						quantity: cartItems[items][item],
					});
				}
			}
		}
		setCartData(tempData);
	}, [cartItems]);

	return (
		<div className='border-t pt-14'>
			<div className='text-2xl mb-3'>
				<Title
					text1='your'
					text2='cart'
					cl1='your'
					cl2='cart'
					cl3='your-cart'
				/>
			</div>

			<div className='flex flex-col lg:flex-row justify-between'>
				<div className='lg:w-1/2 flex flex-col gap-2'>
					{cartData.map((item, index) => {
						const productData = products.find(
							(product) => product._id === item._id
						);

						return (
							<div
								key={index}
								className='py-4 border border-b-2 rounded-md shadow-md text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
								<div className='flex items-start gap-6'>
									<img
										src={productData.image[0]}
										className='w-16 sm:w-20'
										alt={productData.name}
									/>
									<div>
										<p className='text-sm sm:text-lg font-medium'>
											{productData.name}
										</p>

										<div className='flex items-center gap-5 mt-2'>
											<p>
												{currency}
												{productData.price}
											</p>
											<p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
												{item.size}
											</p>
										</div>
									</div>
								</div>
								<input
									type='number'
									onChange={(e) =>
										e.target.value === '' || e.target.value === '0'
											? null
											: updateQuantity(
													item._id,
													item.size,
													Number(e.target.value)
											  )
									}
									className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
									min={1}
									value={item.quantity}
									defaultValue={item.quantity}
								/>
								<img
									src={assets.bin_icon}
									onClick={() => updateQuantity(item._id, item.size, 0)}
									className='w-4 mr-4 sm:w-5 cursor-pointer'
								/>
							</div>
						);
					})}
				</div>

				<div className='flex justify-end my-20'>
					<div className='w-full sm:w-[450px]'>
						<CartTotal />
						<div className='w-full text-end'>
							<button
								onClick={() => navigate('/place-order')}
								className='bg-black cursor-pointer text-white test-sm my-8 px-8 py-3'>
								PROCEED TO CHECKOUT
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
