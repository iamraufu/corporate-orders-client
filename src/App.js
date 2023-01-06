import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AuthProvider from './context/AuthProvider';
import { Suspense } from 'react';
import logo from './images/logo.jpg';
import PrivateOutlet from './components/PrivateOutlet';
import Dashboard from './pages/Dashboard';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Product from './pages/Product';
import Category from './pages/Category';

function App() {

  const renderLoader = () =>
    <div style={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px' }}>
      {/* <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div> */}
      <img src={logo} id='breathing' width={100} height={100} className='img-fluid' alt="logo of Skill Shikhun" />
      {/* <p>Swapno Corporate Orders are Loading...</p> */}
      <p className='text-center'>Loading...</p>
    </div>

  return (
    <AuthProvider>
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<PrivateOutlet />}>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="payment" element={<Payment />} />
            <Route path='orders' element={<Orders />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;