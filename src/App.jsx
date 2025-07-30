import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Product from './pages/Product';
import Contact from './pages/Contact';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const App = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-all duration-300'>
			<NavBar />
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/collection' element={<Collection />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/product' element={<Product />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/login' element={<Login />} />
				<Route path='/place-order' element={<PlaceOrder />} />
				<Route path='/orders' element={<Orders />} />
			</Routes>
		</div>
	);
};

export default App;
