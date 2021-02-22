import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'

const { SERVER_URL } = config

export default function RegisterForm() {

    const [ formData, setFormData ] = useState({ name:'', username:'', password:'' })
    const [username, setUsername] = useState('')
    const [ usernameAvailable, setUsernameAvailable ] = useState(false)
    const [alertMsg, setAlert] = useState('')

    useEffect(()=>{
        setUsername(formData.username)
        setAlert('')
        if (formData.name === '') setAlert('Please Provide a name')
        else if (!usernameAvailable) setAlert('Username not available')
    },[formData])

    useEffect(()=>{
        console.log(username)
        checkUsername()
    },[username])

    const checkUsername = async () => {
        const data = await axios.get(`${SERVER_URL}/users/${username}`)
        console.log(data)
        if (data.data.name) setUsernameAvailable(false)
        else setUsernameAvailable(true)
    }

    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (alertMsg!='') return alert(alertMsg)
        const submittedUser = await axios.post(`${SERVER_URL}/auth/register`,formData)
        console.log(submittedUser)
        if(submittedUser.data) window.location.replace('/login')
    }

    return (
        <div className = 'eachForm' >
            <h1>Join Now!</h1>
            <form onSubmit={handleSubmit} >
                <div className="formInput">
                    <label><p>Name</p></label>
                    <input 
                        type="text"
                        name='name'
                        value={ formData.name }
                        onChange= {(e)=> setFormData({...formData, [e.target.name]: e.target.value}) }
                    />
                    <div className="underline"></div>
                </div>
                
                <div className="formInput">
                    <label><p>Username</p></label>
                    <input 
                        type="text"
                        name='username'
                        value={ formData.username }
                        onChange= {(e)=> setFormData({...formData, [e.target.name]: e.target.value}) }
                    />
                    <div className="underline" style={usernameAvailable? {backgroundColor: 'green'} : {backgroundColor: 'red'} } ></div>
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

                <button type='submit'>Sign up</button>
                
            </form>
        </div>
    )
}
