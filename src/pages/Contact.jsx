import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';

const Contact = () => {
	return (
		<div>
			<div className='text-center text-2xl pt-10 border-t'>
				<Title
					text1='contact'
					text2='us'
					cl1='contact'
					cl2='con-us'
					cl3='contact-us'
				/>
			</div>

			<div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
				<img src={assets.contact_img} className='w-full md:max-w-[480px]' />
				<div className='flex flex-col justify-center items-start gap-6'>
					<p className='font-semibold text-xl text-gray-600'>Our Store</p>
					<p className='text-gray-500'>
						419911 Fake street <hr /> Fake state, Nigeria
					</p>
					<p className='text-gray-500'>
						Tel: +234 9032694335 <br /> abuchipraise@gmail.com
					</p>
					<p className='font-semibold text-xl text-gray-600'>
						Carrers at Forever
					</p>
					<p className='text-gray-500'>
						Learn more about our teams and job openings.
					</p>
					<button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>
						Explore Jobs
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
