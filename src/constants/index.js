import { assets } from '../assets/frontend_assets/assets';

const navlinks = [
	{
		path: '/',
		name: 'Home',
	},
	{
		path: '/collection',
		name: 'Collection',
	},
	{
		path: '/about',
		name: 'About',
	},
	{
		path: '/contact',
		name: 'Contact',
	},
];

const policies = [
	{
		image: assets.exchange_icon,
		title: 'easy exchange policy',
		policy: 'We offer hassle free exchange policy',
	},
	{
		image: assets.quality_icon,
		title: '7 Days Return Policy',
		policy: 'We provide 7 days free return policy',
	},
	{
		image: assets.support_img,
		title: 'best customer support',
		policy: 'We provide 24/7 customer support',
	},
];

const paymentMethods = [
	{
		cod: false,
		method: 'stripe',
		name: 'stripe',
		img: assets.stripe_logo,
		indicator: 'bg-purple-900',
	},
	// {
	// 	cod: false,
	// 	method: 'razorpay',
	// 	name: 'razor pay',
	// 	img: assets.razorpay_logo,
	// 	indicator: 'bg-blue-800',
	// },
	{
		cod: true,
		method: 'cod',
		name: 'cash on delivery',
		img: assets.logo,
		indicator: 'bg-gray-500',
	},
];

const categories = ['Men', 'Women', 'Kids'];
const subcategories = ['Topwear', 'Bottomwear', 'Winterwear'];

export { navlinks, policies, categories, subcategories, paymentMethods };
