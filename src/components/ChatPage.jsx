import React, {useState, useEffect} from 'react'
import axios from 'axios'
import config from '../config'
import useLocalStorage from '../hooks/useLocalStorage'

import ChatBanner from './ChatBanner'
import ChatView from './ChatView'

import {Link, useParams} from 'react-router-dom'

export default function ChatPage(props) {
    const [ token, setToken ] = useLocalStorage('token', '')

    const { open } = useParams()

    const [ chatList, setChatList ] = useState([]) 
    const [chatOpen, setChatOpen] = useState(null)
    const [participants, setParticipants] = useState([])
    const [addChatOpen, setAddChatOpen] = useState(props.initialNewChatOpen)
    const [searchList, setSearchList] = useState([])
    const [search, setSearch] = useState('')

    

    const{
        user
    } = props

    useEffect(()=>{
        if (token!='') getChatList()
    },[user, token])

    useEffect(()=>{
        checkUsername()
        // setSearchList(searchList.length>0&&searchList.filter(searchItem=>searchItem.username!=user.username))
    },[search])
    useEffect(()=>{
        // 
    },[searchList])
    useEffect(()=>{
        console.log(participants)
    },[participants])
    

    const closeChat = () => {
        setChatOpen(false)
    }

    

    const getChatList = async () => {
        const data = await axios.post(`${config.SERVER_URL}/chat`, {token})
        console.log(data)
        setChatList(data.data)
    }

    const addChat = async (e) => {
        e.preventDefault()
        setAddChatOpen(false)
        const data = await axios.post(`${config.SERVER_URL}/chat/create`, {token, participants})
        setParticipants([])
        
        console.log('close')
        window.location.href='/user/chat'

    }

    const checkUsername = async (e) => {
        e&&e.preventDefault()
        const data = await axios.get(`${config.SERVER_URL}/users/all/${search}`)
        console.log(data)
        setSearchList(data.data)
    }

    const findSearchItem = (item) =>{
        console.log(item.username)
        console.log(participants)
        console.log(participants.filter(participant=>participant==item.username))
        
    }


    return (
        <div className='ChatPage' >
             <div className="left">
                {addChatOpen&&<div className="newChat">
                <div className="closeArea" onClick={()=>setAddChatOpen(false)} ></div>
                    <div className="modal">
                        <div className="addBar"></div>
                        <form onSubmit={checkUsername}>
                            <input type="text" value={search} placeholder='Search . . .' onChange={e=>setSearch(e.target.value) } />
                            <button type="submit" >+</button>
                        </form>
                        <div className="results">
                            {searchList.length>0?<div className="searchList">
                                {searchList.map(item=>(
                                    <div className={participants.filter(participant=>participant==item.username).length!=0?'searchItem selected': 'searchItem'} style={item.username==user.username?{display:'none'}:null} >
                                        <div className="details">
                                            <p className="username"> {item.username} </p>
                                            <p className="name"> {item.name} </p>
                                        </div>
                                        {participants.filter(participant=>participant==item.username).length!=0?
                                        <button className="remove" onClick={()=>{findSearchItem(item);setParticipants(participants.filter(participant=>participant!=item.username));}}  >X</button>
                                        :
                                        <button className="add" onClick={()=>{findSearchItem(item);setParticipants([...participants,item.username]);}}  >+</button>}
                                        
                                    </div>
                                ))}
                            </div>:null}
                        </div><div className="buttons">
                            <button className="back" onClick={()=>{setAddChatOpen(false);setParticipants([])}} >{'BACK'}</button>
                            <button className={participants.length<1?'createChat inactive':"createChat"} onClick={addChat} >{'CREATE CHAT'}</button>
                        </div>
                    </div>
                </div>}
                    <button className="addChat" onClick={()=>{setAddChatOpen(true);}} >Add Chat</button>
                <div className="ChatList">
                    
                    {chatList.length==0? null :<div>{chatList.map(eachChat => (
                        //<Link to='/user/chat/dialog'> 
                            <ChatBanner open={chatOpen&&(eachChat._id==chatOpen._id)} key={eachChat._id} chat={eachChat} user={user} setChatOpen={setChatOpen} />
                        //</Link> 
                    ))}</div>}
                </div>
             </div>
            
            {chatOpen?<ChatView chat={chatOpen} user={user} closeChat={closeChat}  />:null}
            
        </div>
    )
}
