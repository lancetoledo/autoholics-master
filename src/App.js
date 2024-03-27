import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Product from './pages/Product';

import './styles/Home.css';
import './styles/Login.css';
import './styles/Shop.css'
import './styles/Product.css'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:productId' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
