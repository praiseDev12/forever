import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, className }) => {
	const { currency } = useContext(ShopContext);

	return (
		<Link
			to={`/product/${id}`}
			className={`text-gray-700 project-cards cursor-pointer ${className}`}>
			<div className='overflow-hidden'>
				<img
					src={image[0]}
					className='hover:scale-110 transtion duration-300 ease-in-out'
					alt={name}
				/>
			</div>
			<p className='pt-3 pb-1 text-sm'>{name}</p>
			<p className='text-sm font-medium'>
				{currency}
				{price}
			</p>
		</Link>
	);
};

export default ProductItem;
