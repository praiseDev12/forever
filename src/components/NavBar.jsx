import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { navlinks } from '../constants/index';
import { useState } from 'react';

const NavBar = () => {
	const [visible, setVisible] = useState(false);

	return (
		<div className='flex items-center justify-between py-5 font-medium'>
			<img src={assets.logo} className='w-36' alt='forever' />

			<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
				{navlinks.map((nav, index) => (
					<NavLink
						key={index}
						to={nav.path}
						className='flex flex-col items-center gap-1'>
						<p className='transition-all duration-300 active:-translate-y-3 hover:text-black'>
							{nav.name}
						</p>
						<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
				))}
			</ul>

			<div className='flex items-center gap-6'>
				<img src={assets.search_icon} className='w-5 cursor-pointer' />

				<div className='group relative'>
					<img src={assets.profile_icon} className='w-5 cursor-pointer' />
					<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
						<div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
							<p className='cursor-pointer hover:text-black'>My Profile</p>
							<p className='cursor-pointer hover:text-black'>Order</p>
							<p className='cursor-pointer hover:text-black'>Logout</p>
						</div>
					</div>
				</div>
				<Link to='/cart' className='relative'>
					<img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' />
					<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
						10
					</p>
				</Link>
				<img src={assets.menu_icon} alt='' />
			</div>
		</div>
	);
};

export default NavBar;
