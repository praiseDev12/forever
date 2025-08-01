import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
	return (
		<div>
			<div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
				<div>
					<img src={assets.logo} className='mb-5 w-32' alt='Forever' />
					<p className='w-full md:w-2/3 text-gray-600'>
						Forever, the home of affordable wears, our goal is to make buying
						the latest in fashion easy and comfortable
					</p>
				</div>
				<div>
					<p className='text-xl font-medium mb-5'>COMPANY</p>
					<ul className='flex flex-col gap-1 text-gray-600'>
						<a href='/' className='hover:border-l duration-300 hover:pl-1'>
							Home
						</a>
						<a href='/about' className='hover:border-l duration-300 hover:pl-1'>
							About us
						</a>
						<a href='/' className='hover:border-l duration-300 hover:pl-1'>
							Delivery
						</a>
						<a href='/' className='hover:border-l duration-300 hover:pl-1'>
							Privacy Policy
						</a>
					</ul>
				</div>
				<div>
					<p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
					<ul className='flex flex-col gap-1 text-gray-600'>
						<li>+234 9032694335</li>
						<li>abuchipraise@gmail.com</li>
					</ul>
				</div>
			</div>

			<div>
				<hr />
				<p className='py-5 text-sm text-center'>
					{new Date().getFullYear()} Forever Ltd. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
