import React from 'react'
import User from './User'

export default function Message({message, participants, user}) {


    const [sender, setSender] = React.useState({})
    const [messageWas, setMessageWas] = React.useState('')

    React.useEffect(()=>{
        // console.log(participants)
        setSender(participants.filter( participant => participant._id==message.sender )[0])
    },[])
    React.useEffect(()=>{
        //console.log(sender)
        if (!sender) return
        if (sender._id==user._id) setMessageWas('sent')
        else setMessageWas('recieved')
    },[sender])

    return (
        <div className={`Message ${messageWas}`} >
            <h3 className="from"> {sender?sender.name:null} </h3>
            <p className="content"> {message.message} </p>
        </div>
    )
}
