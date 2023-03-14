import React, {
    useEffect,
    // useState 
} from 'react';
import '../styles/ProfileDropDown.css'
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.jpg'
// import { getStoredCart } from '../utilities/localDB';
import useAuth from '../hooks/useAuth';
// import categories from '../images/categories.svg'
// import cartImage from '../images/cart.svg'
// import ProfileDropDown from './ProfileDropDown';
import ProfileNameDropDown from './ProfileNameDropDown';
// import searchIcon from '../images/search.svg'
import { useForm } from "react-hook-form";

const Navbar = () => {

    const { credential, getStoredCart } = useAuth();
    const savedCart = getStoredCart()
    const productKeys = Object.keys(savedCart)
    // const [cart, setCart] = useState([])

    const activeStyles = {
        // color: '#dc3545',
        color: '#fff',
        backgroundColor: '#000',
        borderRadius: '5px'
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = data => handleSearch(data);

    const handleSearch = data => {
        // const handler = setTimeout(() => {
        //     navigate(`/search/${data.searchKey}`)
        // }, 1200)
        // return () => {
        //     clearTimeout(handler);
        // };
        // navigate(`/search/${data.searchKey}`)
        window.location = `/search/${data.searchKey}`
    }

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(getStoredCart()).length > 0) {

                const response = await fetch('https://corporate-orders-server.onrender.com/productsByCodes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productKeys)
                })
                const data = await response.json();
                // setData(data);
                let tempCart = []
                for (let key in savedCart) {
                    tempCart.push({ ...data.find(pd => pd.code === key), count: savedCart[key] })
                }
                // setCart(tempCart)
                localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
            }
        };
        fetchData();
        // fetch('https://corporate-orders-server.onrender.com/productsByCodes', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(productKeys)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         let tempCart = []
        //         for (let key in savedCart) {
        //             tempCart.push({ ...data.find(pd => pd.code === key), count: savedCart[key] })
        //         }
        //         // setCart(tempCart)
        //         localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
        //     })
        // }, [productKeys, savedCart])
        // eslint-disable-next-line
    }, [])

    // const handleChange = data => {
    //     // document.getElementById('search_icon').style.display = 'none'
    //     navigate(`/search/${data}`)
    // }

    return (
        <nav style={{ backgroundColor: '#df0100', boxShadow: '0 5px 15px #c4c4c44d' }} className="navbar navbar-expand-md sticky-top">
            <div className="container-fluid p-0">

                {/* d-none d-lg-block */}
                <Link onClick={() => { window.scrollTo(0, 0); }} className="navbar-brand m-0 p-0" to="/"><img className='img-fluid px-1' width={70} src={logo} alt="logo" /></Link>

                {/* <img src={categories} width={30} className='img-fluid d-lg-none' alt="categories" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop" /> */}

                <div className="search-bar form-group p-1 d-flex justify-content-center align-items-center">
                    <form className='w-100 d-flex' onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder='Search for Alu, shak by typing'
                            className='form-control mx-auto d-block' type="search" name="" id=""
                            {...register("searchKey", { required: true })}
                        // onChange={(e) => handleChange(e.target.value)} 
                        // defaultValue={searchKey} 
                        // autoFocus 
                        />
                        <button
                            style={{
                                // marginLeft: '-2.7rem', 
                                // background: '#f4f4f4' 
                            }}
                            className=' text-white btn btn-dark ms-2'>
                            {/* <img id='search_icon' className='img-fluid' src={searchIcon} alt="search" /> */}
                            Search
                        </button>
                    </form>
                </div>

                <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop" className="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="d-md-none">
                    <img src={cartImage} width={30} className='img-fluid' alt="shopping cart" />
                    <sup className='fw-bold bg-warning rounded px-1 text-black'>
                        {cart.reduce((a, b) => { return a + (b.count); }, 0)}
                    </sup>
                </div> */}

                <div
                    style={{ maxWidth: '400px' }}
                    className="collapse navbar-collapse d-none d-lg-block" id="navbarNavAltMarkup">

                    {/* <div className="form-group p-1 w-50 d-flex justify-content-center mx-auto d-block">
                    <input placeholder='Search for Alu, shak by typing' onChange={(e) => handleChange(e.target.value)} className='rounded form-control' type="search" name="" id="" defaultValue={searchKey} autoFocus />
                    <img id='search_icon' style={{ marginLeft: '-1.5rem' }} className='img-fluid' src={searchIcon} alt="search" />
                </div> */}

                    <div className="navbar-nav ms-auto pt-2 pe-2">
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

                        <NavLink
                            onClick={() => { window.scrollTo(0, 0); }}
                            style={({ isActive }) => (
                                isActive ? activeStyles : undefined
                            )}
                            className="nav-link text-white fw-bold text-center" to="/profile">Profile</NavLink>
                        <button style={{ background: 'transparent', border: 'none' }} className="nav-link text-white fw-bold text-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Request Product</button>

                        {
                            credential.user?.email ?
                                <>
                                    <NavLink
                                        onClick={() => { window.scrollTo(0, 0); }}
                                        style={({ isActive }) => (
                                            isActive ? activeStyles : undefined
                                        )}
                                        className="nav-link text-white fw-bold text-center" to="/orders">Orders</NavLink>
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