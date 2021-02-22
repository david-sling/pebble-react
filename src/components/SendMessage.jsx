import React, {useState, useEffect} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
import config from '../config'

import socket from '../services/socket'

import sendMessageIcon from '../assets/sendMessage.svg'

export default function SendMessage({chat,user, getMessages}) {
    const [ token, setToken ] = useLocalStorage('token', '')

    const [ message, setMessage ] = useState('')
    const [ messageSent, setMessageSent ] = useState(false)

    useEffect(() => {
        console.log('useEffect()')
        socket.on(user._id, data => {
          console.log(data);
          if(data.chat==chat._id)  getMessages(chat._id)
          // if (data.sender==user._id) {
          //   setMessage('')
          //   console.log('set')
          // }
        });
      },[]);

      useEffect(()=>{
        if(messageSent){
          setMessage('')
          setMessageSent(false)
        }
      },[messageSent])

   
    
    const handleSend = async (e) => {
        e.preventDefault()
        // const data = await axios.post(`${config.SERVER_URL}/messages/${chat._id}`, {token, message})
        // console.log(data)
        await socket.emit("message",
          {
            token,
            message,
            chatID: chat._id
          })
          setMessage('')

          // setInterval(()=>setMessage(''),5000)
          

    }

    return (
        <div className="SendMessage" >
            <form onSubmit={handleSend} >
                <div className="input"  ><input aria-multiline value={message} onChange={e=>{setMessage(e.target.value);console.log('e ')}} placeholder='Type your message . . .' type="text"/></div>
                <button type='submit' > <img src={sendMessageIcon} alt=""/> </button>
            </form>
        </div>
    )
}
