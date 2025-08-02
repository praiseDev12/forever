import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
	return (
		<div>
			<div className='text-2xl text-center pt-8 border-t'>
				<Title text1='about' text2='us' cl1='about' cl2='us' cl3='about-us' />
			</div>

			<div className='my-10 flex flex-col md:flex-row gap-16'>
				<img
					src={assets.about_img}
					alt='about us'
					className='w-full md:max-w-[450px]'
				/>
				<div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
					<p>
						Forever was born out of a passion for innovation and a desire to
						revolutionize the way people shop online. Our journey began with a
						simple idea to provide a platform where customer can easily
						discover, explore and purchase a wide range of products from the
						comfort of their homes.
					</p>
					<p>
						Since our inception, we've worked tirelessly to curate a diverse
						selection of high-quality products to cater to every taste and
						prefrence From fashion and beauty to electronics and home essentials
						we offer an extensive collection sourced from trusted brands and
						suppliers.
					</p>
					<p className='text-gray-800 font-bold'>Our Mission</p>
					<p>
						Our mission at Forever is to empower customers with choice,
						convinience,and confidence. We're decicated to providing a seamless
						experience that exceeds expectations, from browsing and ordering to
						delivery and beyond.
					</p>
				</div>
			</div>

			<div className='text-xl py-4'>
				<Title
					text1='Why'
					text2='choose us'
					cl1='why'
					cl2='choose'
					cl3='why-choose'
				/>
			</div>

			<div className='flex flex-col md:flex-row text-sm mb-20'>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b>Quality Assurance:</b>
					<p>
						We meticulously select and vet each product to ensure it meets our
						stringent Quality standards
					</p>
				</div>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b>Convinience:</b>
					<p>
						With our user-friendly interface and hassle-free ordering process,
						shopping has never been easier.
					</p>
				</div>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b>Exeptional Customer Service:</b>
					<p>
						Our team of dedicated professionals is here to assist you the way,
						ensuring your satisfaction is our priority.
					</p>
				</div>
			</div>

			<NewsLetterBox />
		</div>
	);
};

export default About;
