import React, {
    useEffect,
    // useState 
} from 'react';
import '../styles/ProfileDropDown.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg'
import { getStoredCart } from '../utilities/localDB';
import useAuth from '../hooks/useAuth';
import categories from '../images/categories.svg'
// import cartImage from '../images/cart.svg'
// import ProfileDropDown from './ProfileDropDown';
import ProfileNameDropDown from './ProfileNameDropDown';
import searchIcon from '../images/search.svg'

const Navbar = ({ searchKey }) => {

    const { user } = useAuth();
    const navigate = useNavigate()
    const savedCart = getStoredCart()
    const productKeys = Object.keys(savedCart)
    // const [cart, setCart] = useState([])

    const activeStyles = {
        color: '#dc3545',
        backgroundColor: '#000',
        borderRadius: '5px'
    }

    useEffect(() => {
        fetch('https://shwapno.up.railway.app/productsByCodes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                let tempCart = []
                for (let key in savedCart) {
                    tempCart.push({ ...data.find(pd => pd.code === key), count: savedCart[key] })
                }
                // setCart(tempCart)
                localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
            })
    }, [productKeys, savedCart])

    const handleChange = data => {
        // document.getElementById('search_icon').style.display = 'none'
        navigate(`/search/${data}`)
    }

    return (
        <nav style={{ backgroundColor: '#df0100', boxShadow: '0 5px 15px #c4c4c44d' }} className="navbar navbar-expand-md sticky-top">
            <div className="container">

                <img src={categories} width={30} className='img-fluid d-lg-none' alt="categories" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop" />

                <Link onClick={() => { window.scrollTo(0, 0); }} className="navbar-brand d-none d-lg-block" to="/"><img className='img-fluid' width={85} src={logo} alt="logo" /></Link>

                <div className="form-group p-1 w-50 d-flex">
                    <input style={{ border: '1px solid black' }} onChange={(e) => handleChange(e.target.value)} className='rounded form-control' type="search" name="" id="" defaultValue={searchKey} autoFocus />
                    <img id='search_icon' style={{ marginLeft: '-1.5rem' }} className='img-fluid' src={searchIcon} alt="search" />
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="d-md-none">
                    <img src={cartImage} width={30} className='img-fluid' alt="shopping cart" />
                    <sup className='fw-bold bg-warning rounded px-1 text-black'>
                        {cart.reduce((a, b) => { return a + (b.count); }, 0)}
                    </sup>
                </div> */}

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    <div className="navbar-nav ms-auto pt-2">
                        <NavLink
                            onClick={() => { window.scrollTo(0, 0); }}
                            style={({ isActive }) => (
                                isActive ? activeStyles : undefined
                            )}
                            className="nav-link text-white fw-bold text-center" to="/">Home</NavLink>

                        {/* {
                            cart?.length > 0 ?
                                <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (
                                    isActive ? activeStyles : undefined
                                )} className="nav-link text-white fw-bold text-center" to="/cart">Cart
                                    <sup className='fw-bold bg-warning rounded px-1 text-black'>
                                        {cart.reduce((a, b) => { return a + (b.count); }, 0)}
                                    </sup>
                                </NavLink>
                                :
                                <NavLink
                                    onClick={() => { window.scrollTo(0, 0); }}
                                    style={({ isActive }) => (
                                        isActive ? activeStyles : undefined
                                    )}
                                    className="nav-link text-white fw-bold text-center" to="/cart">Cart</NavLink>
                        } */}

                        {
                            user?.email ?
                                <>
                                    <NavLink
                                        onClick={() => { window.scrollTo(0, 0); }}
                                        style={({ isActive }) => (
                                            isActive ? activeStyles : undefined
                                        )}
                                        className="nav-link text-white fw-bold text-center" to="/orders">Orders</NavLink>
                                    <NavLink
                                        onClick={() => { window.scrollTo(0, 0); }}
                                        style={({ isActive }) => (
                                            isActive ? activeStyles : undefined
                                        )}
                                        className="nav-link text-white fw-bold text-center" to="/profile">Profile</NavLink>
                                    <button style={{ background: 'transparent', border: 'none' }} className="nav-link text-white fw-bold text-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Request Product</button>

                                    {/* <ProfileDropDown /> */}
                                    <ProfileNameDropDown />
                                </>
                                :
                                <NavLink
                                    onClick={() => { window.scrollTo(0, 0); }}
                                    style={({ isActive }) => (
                                        isActive ? activeStyles : undefined
                                    )}
                                    className="nav-link text-white fw-bold text-center" to="/login">Login</NavLink>
                        }

                        {/* <div style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="d-none d-md-block ps-2">
                            <img src={cartImage} width={25} className='img-fluid mt-2' alt="shopping cart" />
                            <sup className='fw-bold bg-warning rounded px-1 text-black'>
                                {cart.reduce((a, b) => { return a + (b.count); }, 0)}
                            </sup>
                        </div> */}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;