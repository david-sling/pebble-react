import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'

import useLocalStorage from '../hooks/useLocalStorage'
import { Link } from 'react-router-dom'

export default function Nav(props) {

    const{
        user,
        setUser
    } = props
    
    const [ token, setToken ] = useLocalStorage('token', '')
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        getUser()
        console.log(token)
        if (token=='') window.location.replace('/')
    }, [token])

    const getUser = async () =>{
        const data = await axios.post(`${config.SERVER_URL}/users/details`, {token})
        setUser(data.data)
        console.log(data)
        setLoading(false)
    }

    const handleLogout = () => {
        setToken('')

    }

    return (
        <div>
            {loading? 'loading': <div className="Nav">
                <Link to='/'> <h2>pebble</h2></Link>
                <nav>
                    <p>Name: {user.name} </p>
                    <p>Username: {user.username} </p>
                    <button onClick= {handleLogout} >LOGOUT</button>
                </nav>

            </div> }
        </div>
    )
}
