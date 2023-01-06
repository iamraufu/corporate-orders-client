import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.jpg'
import products from '../data/products.json';
import { getStoredCart } from '../utilities/localDB';
import useAuth from '../hooks/useAuth';

const Navbar = () => {

    const { user } = useAuth();

    const activeStyles = {
        color: '#dc3545',
        backgroundColor: '#000',
        borderRadius: '5px'
    }

    let savedCart = getStoredCart()
    let cart = [];
    for (let key in savedCart) {
        cart.push({ ...products.find(pd => pd.id === key), quantity: savedCart[key] })
    }

    return (
        <nav style={{ backgroundColor: '#df0100', boxShadow: '0 5px 15px #c4c4c44d' }} className="navbar navbar-expand-md sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/"><img className='img-fluid' width={85} src={logo} alt="logo" /></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <NavLink
                            onClick={() => { window.scrollTo(0, 0); }}
                            style={({ isActive }) => (
                                isActive ? activeStyles : undefined
                            )}
                            className="nav-link text-white fw-bold text-center" to="/">Home</NavLink>
                        <NavLink
                            onClick={() => { window.scrollTo(0, 0); }}
                            style={({ isActive }) => (
                                isActive ? activeStyles : undefined
                            )}
                            className="nav-link text-white fw-bold text-center" to="/products">Products</NavLink>

                        {
                            cart.length > 0 ?
                                <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (
                                    isActive ? activeStyles : undefined
                                )} className="nav-link text-white fw-bold text-center" to="/cart">Cart <sup className='fw-bold bg-warning rounded px-1 text-black'>{cart.reduce((a, b) => { return a + (b.quantity); }, 0)}</sup></NavLink>
                                :
                                <NavLink
                                    onClick={() => { window.scrollTo(0, 0); }}
                                    style={({ isActive }) => (
                                        isActive ? activeStyles : undefined
                                    )}
                                    className="nav-link text-white fw-bold text-center" to="/cart">Cart</NavLink>
                        }

                        {
                            user?.email ?
                                <>
                                    <NavLink
                                        onClick={() => { window.scrollTo(0, 0); }}
                                        style={({ isActive }) => (
                                            isActive ? activeStyles : undefined
                                        )}
                                        className="nav-link text-white fw-bold text-center" to="/profile">Profile</NavLink>
                                    <NavLink
                                        onClick={() => { window.scrollTo(0, 0); }}
                                        style={({ isActive }) => (
                                            isActive ? activeStyles : undefined
                                        )}
                                        className="nav-link text-white fw-bold text-center" to="/dashboard">Dashboard</NavLink>
                                    <NavLink
                                        onClick={() => { window.scrollTo(0, 0); }}
                                        style={({ isActive }) => (
                                            isActive ? activeStyles : undefined
                                        )}
                                        className="nav-link text-white fw-bold text-center" to="/orders">Orders</NavLink>
                                </>
                                :
                                <NavLink
                                    onClick={() => { window.scrollTo(0, 0); }}
                                    style={({ isActive }) => (
                                        isActive ? activeStyles : undefined
                                    )}
                                    className="nav-link text-white fw-bold text-center" to="/login">Login</NavLink>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;