import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { categories, subcategories } from '../constants';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Collection = () => {
	const { products, search, showSearch } = useContext(ShopContext);

	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState('relevant');
	const [title, setTitle] = useState('All');

	useGSAP(() => {
		gsap.utils.toArray('.product-card').forEach((card, index) => {
			const delay = () => {
				if (index % 5 === 0) {
					return 0.02;
				}
				if (index % 5 === 1) {
					return 0.06;
				}
				if (index % 5 === 2) {
					return 0.08;
				}
				if (index % 5 === 3) {
					return 0.1;
				}
				if (index % 5 === 4) {
					return 0.12;
				}
			};

			gsap.fromTo(
				card,
				{
					y: 20,
					opacity: 0,
					duration: 0.5,
					ease: 'power1.inOut',
					delay: delay(),
					scrollTrigger: {
						trigger: card,
						start: 'top 70%',
					},
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					ease: 'power1.inOut',
					delay: delay(),
					scrollTrigger: {
						trigger: card,
						start: 'top 70%',
					},
				}
			);
		});
	}, [category, subCategory]);

	const toggleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setCategory((prev) => [...prev, e.target.value]);
		}
	};

	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};

	const checkTitle = () => {
		if (category.length > 2) {
			setTitle('All');
			return;
		}

		if (category.length > 0) {
			if (category.includes('Men') && category.includes('Women')) {
				setTitle('Men & Women');
				return;
			}
			if (category.includes('Women') && category.includes('Kids')) {
				setTitle('Women & Kids');
				return;
			}
			if (category.includes('Kids')) {
				setTitle('Kids');
				return;
			}
			if (category.includes('Women')) {
				setTitle('Women');
				return;
			}
			if (category.includes('Men')) {
				setTitle('Men');
				return;
			}
		} else {
			setTitle('All');
		}
	};

	const applyFilter = () => {
		let productCopy = products.slice();

		if (showSearch && search) {
			productCopy = productCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category.length > 0) {
			productCopy = productCopy.filter((item) =>
				category.includes(item.category)
			);
			setFilterProducts(productCopy);
		}

		if (subCategory.length > 0) {
			productCopy = productCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}
		setFilterProducts(productCopy);
	};

	const sortProduct = () => {
		let fpCopy = filterProducts.slice();

		switch (sortType) {
			case 'low-high':
				setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
				break;

			case 'high-low':
				setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
				break;

			default:
				applyFilter();
				break;
		}
	};

	useEffect(() => {
		applyFilter();
		checkTitle();
	}, [category, subCategory, search]);

	useEffect(() => {
		sortProduct();
	}, [sortType]);

	return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-600'>
			{/* Filter options */}
			<div className={`min-w-60 ${!showFilter && 'max-sm:max-h-10'}`}>
				<p
					onClick={() => setShowFilter((prev) => !prev)}
					className='my-2 text-xl flex items-center cursor-pointer gap-2'>
					FILTERS
					<img
						src={assets.dropdown_icon}
						className={`h-3 duration-500 ${showFilter ? 'rotate-90' : ''}`}
					/>
				</p>
				{/* Category Filter */}
				<div
					className={`border transition-all duration-500 ease-in-out border-gray-300 pl-5 py-5 mt-6 ${
						showFilter ? '-translate-x-0' : 'opacity-0 size-0 -translate-x-30'
					}`}>
					<p className='mb-3 text-sm font-medium'>CATEGORIES</p>
					<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
						{categories.map((category, index) => (
							<p key={index} className='flex gap-2'>
								<input
									type='checkbox'
									onChange={(e) => toggleCategory(e)}
									className='w-3'
									value={category}
								/>{' '}
								{category}
							</p>
						))}
					</div>
				</div>
				{/* SubCategory Filter */}
				<div
					className={`border transition-all duration-500 ease-in-out border-gray-300 pl-5 py-5 my-5 ${
						showFilter ? '-translate-x-0' : 'opacity-0 w-0 -translate-x-40'
					}`}>
					<p className='mb-3 text-sm font-medium'>TYPE</p>
					<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
						{subcategories.map((category, index) => (
							<p key={index} className='flex gap-2'>
								<input
									type='checkbox'
									className='w-3'
									onChange={(e) => toggleSubCategory(e)}
									value={category}
								/>{' '}
								{category}
							</p>
						))}
					</div>
				</div>
			</div>

			{/* Right Side */}
			<div className='flex-1'>
				<div className='flex justify-between text-base sm:text-2xl mb-4'>
					<Title
						text1={title}
						text2='collections'
						cl1='all'
						cl2='collect'
						cl3='all-coll'
						dependecy={filterProducts}
					/>
					<select
						onChange={(e) => setSortType(e.target.value)}
						className='border-2 border-gray-300 text-sm px-2'>
						<option value='relevant'>Sort By: Relevant</option>
						<option value='low-high'>Sort By: Low to High</option>
						<option value='high-low'>Sort By: High to Low</option>
					</select>
				</div>
				{/* Map Products */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
					{filterProducts.map((item, index) => (
						<ProductItem
							key={index}
							id={item._id}
							image={item.image}
							name={item.name}
							price={item.price}
							className='product-card'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Collection;
