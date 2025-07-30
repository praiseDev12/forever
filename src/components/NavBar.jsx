import { assets } from '../assets/frontend_assets/assets';
import { Navlink } from 'react-router-dom';

const NavBar = () => {
	return (
		<div className='flex items-center justify-between py-5 font-medium'>
			<img src={assets.logo} className='w-36' alt='forever' />

			<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
				<Navlink className='flex flex-col items-center gap-1'>
					<p>Home</p>
					<hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
				</Navlink>
			</ul>
		</div>
	);
};

export default NavBar;
