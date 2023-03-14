import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
// import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AuthProvider from './context/AuthProvider';
import { Suspense } from 'react';
import logo from './images/logo.jpg';
import PrivateOutlet from './components/PrivateOutlet';
import Shipping from './pages/Shipping';
// import Product from './pages/Product';
import Category from './pages/Category';
import Search from './pages/Search';
import AdminDashboard from './pages/AdminDashboard';
import ToPrint from './components/ToPrint';

function App() {

  const renderLoader = () =>
    <div style={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px' }}>
      <img src={logo} id='breathing' width={100} height={100} className='img-fluid' alt="logo of Shwapno Corporate Orders" />
      <p className='text-center'>Loading...</p>
    </div>

  return (
    <AuthProvider>
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          {/* <Route path="/product/:id" element={<Product />} /> */}
          <Route path="/search/:id" element={<Search />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/:id" element={<Category />} />
          {/* <Route path='/cart' element={<Cart />} /> */}
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<PrivateOutlet />}>
            <Route path="profile" element={<Profile />} />
            <Route path="print" element={<ToPrint />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path='orders' element={<Orders />} />
            <Route path='admin' element={<AdminDashboard />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;