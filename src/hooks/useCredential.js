import { useEffect, useState } from "react";

const useCredential = () => {

    const id = localStorage.getItem('uId')
    const [user, setUser] = useState({});

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        fetch('https://corporateorders.herokuapp.com/user/' + id)
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
    }

    return {
        setUser,
        user,
        logOut
    }
};

export default useCredential;