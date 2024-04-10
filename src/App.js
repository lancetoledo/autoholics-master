import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar } from './redux/slices/cartSlice';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Product from './pages/Product';

import './styles/Home.css';
import './styles/Login.css';
import './styles/Shop.css';
import './styles/Product.css';
import CheckOut from './pages/CheckOut';

import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './services/stripe'; 

function App() {
  const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);
  const dispatch = useDispatch();

  // Function to close the sidebar by toggling its state
  const handleCloseSidebar = () => {
    dispatch(toggleCartSidebar());
  };

  return (
    <Elements stripe={stripePromise} >
    <div className="App">
      {/* Overlay div that becomes clickable only when the sidebar is visible */}
      {isSidebarVisible && <div className="app-overlay" onClick={handleCloseSidebar}></div>}

      {/* Routes are always rendered */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/checkouts' element={<CheckOut />} />
      </Routes>
    </div>
    </Elements>
  );
}

export default App;
