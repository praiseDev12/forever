import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
	const { search, setSearch, showSearch, setShowSearch } =
		useContext(ShopContext);
	const [visible, setVisible] = useState(false);

	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes('collection') && showSearch) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [location, showSearch]);

	return (
		<div
			className={`border-t transition-all duration-500 ease-in-out border-b overflow-hidden border-gray-600 bg-gray-50/10 backdrop-blur-md text-center ${
				showSearch & visible ? '' : 'opacity-0 -translate-y-2 h-0'
			}`}>
			<div className='inline-flex items-center justify-center border border-gray-400 focus-within:border-black px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
				<input
					type='text'
					onChange={(e) => setSearch(e.target.value)}
					value={search}
					className='flex-1 outline-none bg-inherit text-sm'
					placeholder='search products...'
				/>
				<img src={assets.search_icon} className='w-4' />
			</div>
			<img
				onClick={() => setShowSearch(false)}
				src={assets.cross_icon}
				className='inline w-3 cursor-pointer'
			/>
		</div>
	);
};

export default SearchBar;
