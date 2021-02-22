import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import config from '../config'
import useLocalStorage from '../hooks/useLocalStorage'

import Message from './Message'
import SendMessage from './SendMessage'

import{Link} from 'react-router-dom'
import ArrowBackIcon from '../assets/arrow_back-24px.svg'

export default function ChatView(props) {
    const [ token, setToken ] = useLocalStorage('token', '')
    const end = useRef(null)

    const scrollToBottom = () => {
        end.current.scrollIntoView({ behavior: "smooth" })
    }

    const {
        chat,
        participants,
        user,
        closeChat
    }= props

    const [ messages, setMessages ] = useState([])

    useEffect(()=>{
        console.log('chat: ',chat)
        getMessages(chat._id)
    },[chat])
    useEffect(()=>{
        scrollToBottom()
    },[messages])
    useEffect(()=>{
        console.log(chat.participants)
    },[chat])

    const getMessages = async (chatID) => {
        if(!token) return
        const data = await axios.post(`${config.SERVER_URL}/messages/get/${chatID}`, {token} )
        console.log('messages: ',data)
        setMessages(data.data)
    }

    return (
        <div className="ChatView" >
            <div className="chatBar">
                <img src={ArrowBackIcon} onClick={closeChat} />
                <p>{chat.participants.map(participant=>(
                    participant._id!=user._id&&`${participant.name},  `//+ participant._id!=chat.participants[chat.participants.length-2]._id&&',   '//:null
                ))}</p>
            </div>
            <div className="messages" >
                {messages.map( message => (
                    <Message message={message} participants={chat.participants} user={user} key={message._id} />
                ) )}
                <div id="scrollHere" ref={end} ></div>
            </div>
            
            <SendMessage chat={chat} user={user} getMessages={getMessages} />
        </div>
    )
}
