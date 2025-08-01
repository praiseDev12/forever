const NewsLetterBox = () => {
	const onSubmitHandler = (e) => {
		e.preventDefault();

		alert("Yeah, there's no News Letter 😄");
	};

	return (
		<div className='text-center'>
			<p className='text-2xl font-medium text-gray-900'>
				Subscribe now & get 20% off
			</p>
			<p className='text-gray-400 mt-3'>
				Wanna be the first to know when the our lattests arrive? Subscribe to
				our News Letter
			</p>
			<form
				onSubmit={onSubmitHandler}
				className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
				<input
					type='email'
					className='w-full sm:flex-1 outline-none'
					placeholder='Enter your email'
					required
				/>
				<button
					type='submit'
					className='bg-black text-white text-xs px-10 py-4'>
					SUBSCRIBE
				</button>
			</form>
		</div>
	);
};

export default NewsLetterBox;
