import { createContext, useState } from 'react';
import { products } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const currency = '$';
	const deliveryFee = 10;
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
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
					toast.error('There was an issue getting cart Amount.');
				}
			}
		}

		return totalAmount;
	};

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
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
