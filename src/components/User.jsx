import React from 'react'

export default function User(props) {

    const {
        user,
        setUser
    } = props

    return (
        <div className='User' >
            {user.name} | {user.username}
        </div>
    )
}
