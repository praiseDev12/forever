import { assets } from '../assets/frontend_assets/assets';
import { policies } from '../constants';

const OurPolicy = () => {
	return (
		<div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
			{policies.map((item, index) => (
				<div key={index}>
					<img src={item.image} className='w-12 m-auto mb-5' />
					<p className='font-semibold capitalize'>{item.title}</p>
					<p className='text-gray-400'>{item.policy}</p>
				</div>
			))}
		</div>
	);
};

export default OurPolicy;
