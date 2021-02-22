import React, { useState } from 'react'
import Logo from '../logo.svg'
import Type from '../type.svg'
//import 'dotenv/config'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

export default function FormPage(props) {

    const {
        formName,
        
    } = props

    console.log(process.env.REACT_APP_SERVER_URL)
    return (
        <div className="FormPage">
            <div className="Logo">
                <img src={Logo} alt="Logo-pebble"/>
            </div>
            
            <div className="left">
                <div className="type">
                    <img src={Type} alt="pebble-type"/>
                </div>
            </div>
            <div className="right">
                <div className="form">
                    <nav>
                        <div className="link">
                            <Link to={formName=='register'? '/login': '/register' } >{formName=='register'? 'Login': 'Register' }</Link>
                        </div>
                        <div className="absolute">
                            <div className="link expand">
                                <Link to={formName=='register'? '/login': '/register' } >{formName=='register'? 'Login': 'Register' }</Link>
                            </div>
                        </div>
                    </nav>
                    {formName=='register'? <RegisterForm />: <LoginForm />}
                    <p> {formName=='register'? <p>Already have an account? <Link to='/login'> Login </Link> </p>:<p>Don't have an account? <Link to='/register'> Register </Link> </p> } </p>
                </div>
            </div>
        </div>
    )
}
