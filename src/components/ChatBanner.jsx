import React, {useState, useEffect} from 'react'
import axios from 'axios'
import config from '../config'
import {Link} from 'react-router-dom'
export default function ChatBanner(props) {

    const{
        chat,
        user,
        setChatOpen,
        open
    } = props

    const [participants, setParticipants] = useState([])

    useEffect(()=>{
        getParticipants()
    },[chat])

    

    const getParticipants = async () => {
        // const participantsID = chat.participants.filter((p)=>p!=user._id)
        // console.log(participantsID)
        const data = await axios.post(`${config.SERVER_URL}/users/id`, {users: chat.participants} )
        console.log(data)
        setParticipants(data.data)
    }

    

    return (
        <div className={open?"ChatBanner active":'ChatBanner'} onClick={()=>setChatOpen({...chat, participants})} >
            
            {/* <label htmlFor="">participants</label> */}
            <div className="participants"> {participants.map((participant)=>(
                <div>
                    {participant._id!=user._id? <p>{participant.name}</p>:null }
                </div>
            ))} </div>
        </div>
    )
}
