import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCredential = () => {

    const navigate = useNavigate();

    const id = localStorage.getItem('uId')
    const [user, setUser] = useState({});
    const [searchProducts, setSearchProducts] = useState([])

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        fetch('https://corporate-orders-server.onrender.com/user/' + id)
            .then(response => response.json())
            .then(data => setUser(data))
    }

    useEffect(() => {
        if (id) {
            userData()
        }
        else {
            setUser({})
        }
        //eslint-disable-next-line
    }, [])

    const logOut = () => {
        localStorage.removeItem('uId')
        setUser({})
        navigate('/')
    }

    return {
        setUser,
        user,
        logOut,
        searchProducts, 
        setSearchProducts
    }
};

export default useCredential;