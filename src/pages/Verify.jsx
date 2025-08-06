import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
	const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const success = searchParams.get('success');
	const orderId = searchParams.get('orderId');

	const verifyPayment = async () => {
		try {
			if (!token) {
				return null;
			}

			await axios
				.post(
					backendUrl + '/api/order/verifystripe',
					{ success, orderId },
					{ headers: { token } }
				)
				.then(() => {
					setCartItems({});
					navigate('/orders');
				})
				.catch((err) => {
					navigate('/cart');
				});
		} catch (err) {
			console.log(err);
			toast.error(err.message);
		}
	};

	useEffect(() => {
		verifyPayment();
	}, [token]);

	return <div>{}</div>;
};

export default Verify;
