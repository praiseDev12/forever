import { createContext, useEffect, useState } from 'react';
// import { products } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const currency = '$';
	const deliveryFee = 10;
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const [products, setProducts] = useState([]);
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	const addToCart = async (itemId, size) => {
		let cartData = structuredClone(cartItems);

		if (!size) {
			toast.error('Select Product Size');
			return;
		}

		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		setCartItems(cartData);

		if (token) {
			try {
				await axios.post(
					backendUrl + '/api/cart/add',
					{ itemId, size },
					{ headers: { token } }
				);
			} catch (err) {
				console.log(err);
				toast.error(err.message);
			}
		}
	};

	const getCartCount = () => {
		let totalCount = 0;

		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalCount += cartItems[items][item];
					}
				} catch (err) {
					console.log(err);
					toast.error('Something went wrong, try again');
				}
			}
		}

		return totalCount;
	};

	const updateQuantity = async (itemId, size, quantity) => {
		let cartData = structuredClone(cartItems);

		cartData[itemId][size] = quantity;

		setCartItems(cartData);

		if (token) {
			try {
				await axios.post(
					backendUrl + '/api/cart/update',
					{
						itemId,
						size,
						quantity,
					},
					{ headers: { token } }
				);
			} catch (err) {
				console.log(err);
				toast.error(err.message);
			}
		}
	};

	const getCartAmount = () => {
		let totalAmount = 0;

		for (const items in cartItems) {
			let itemInfo = products.find((product) => product._id === items);
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalAmount += itemInfo.price * cartItems[items][item];
					}
				} catch (err) {
					console.log(err);
				}
			}
		}

		return totalAmount;
	};

	const getProductsData = async () => {
		try {
			await axios
				.get(backendUrl + '/api/product/list')
				.then(({ data }) => {
					setProducts(data.products);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const getUserCart = async (token) => {
		try {
			await axios
				.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
				.then(({ data }) => {
					setCartItems(data.cartData);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.message);
				});
		} catch (err) {
			console.log(err);
			toast.error('Failed to Load cart');
		}
	};

	useEffect(() => {
		getProductsData();
	}, []);

	useEffect(() => {
		if (!token && localStorage.getItem('token')) {
			setToken(localStorage.getItem('token'));
			getUserCart(localStorage.getItem('token'));
		}
	}, []);

	const value = {
		products,
		currency,
		deliveryFee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		setCartItems,
		addToCart,
		getCartCount,
		updateQuantity,
		getCartAmount,
		navigate,
		backendUrl,
		token,
		setToken,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
