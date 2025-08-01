import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Title = ({ text1, text2, cl1, cl2, cl3, dependecy }) => {
	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${cl1}`,
				start: 'top 60%',
				toggleActions: 'play none none reverse',
			},
		});

		tl
			.fromTo(
				`.${cl2}`,
				{
					x: -20,
					opacity: 0,
					duration: 0.5,
					ease: 'expo.inOut',
				},
				{
					x: 0,
					opacity: 1,
					duration: 0.5,
				}
			)
			.fromTo(
				`.${cl3}`,
				{
					opacity: 0,
					x: 20,
					ease: 'expo.inOut',
				},
				{
					opacity: 1,
					x: 0,
				}
			),
			'<';
	}, [dependecy]);

	return (
		<div className={`inline-flex gap-2 items-center mb-3 ${cl1}`}>
			<p className={`text-gray-500 uppercase ${cl2}`}>
				{text1} <span className='text-gray-700 font-medium'>{text2}</span>
			</p>
			<p className={`w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 ${cl3}`}></p>
		</div>
	);
};

export default Title;
