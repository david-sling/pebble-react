import React, { useState } from 'react'
import axios from 'axios'
import config from '../config'

import useLocalStorage from '../hooks/useLocalStorage'

import { Redirect } from 'react-router-dom'

const { SERVER_URL } = config

export default function LoginForm() {

    const [ token, setToken ] = useLocalStorage('token', '')
    console.log(token)

    const [ formData, setFormData ] = useState({ username:'', password:'' })
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submittedUser = await axios.post(`${SERVER_URL}/auth/login`,formData)
            console.log(submittedUser)
            setToken(submittedUser.data.token)
            if (submittedUser.data.token) window.location.replace('/user/chat')
            
        } catch (error) {
            console.log(error)
            alert('Invalid username or password')
        }
        
        //if (submittedUser.data.token) {window.location.replace('/user'); return}
        //alert('invalid')
    }

    return (
        <div className = 'eachForm' >
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} >
                
                
                <div className="formInput">
                    <label><p>Username</p></label>
                    <input 
                        type="text"
                        name='username'
                        value={ formData.username }
                        onChange= {(e)=> setFormData({...formData, [e.target.name]: e.target.value}) }
                    />
                    <div className="underline"></div>
                </div>

                <div className="formInput">
                    <label><p>Password</p></label>
                    <input 
                        type="password"
                        name='password'
                        value={ formData.password }
                        onChange= {(e)=> setFormData({...formData, [e.target.name]: e.target.value}) }
                    />
                    <div className="underline"></div>
                </div>

                <button type='submit'>Login</button>
                
            </form>
        </div>
    )
}
