import React, { useState, useEffect } from "react";
import socket from './services/socket'
import './css/App.css'
import useLocalStorage from './hooks/useLocalStorage'
import {  BrowserRouter as Router,  Switch,  Route,  Link,  Redirect} from "react-router-dom";

//IMPORT routes
import FormPage from './components/FormPage.jsx'
import Nav from './components/Nav.jsx'
import User from './components/User.jsx'
import ChatPage from './components/ChatPage.jsx'

function App() {
  const [ token, setToken ] = useLocalStorage('token', '')
  // const [response, setResponse] = useState("");
  // const [value, setValue] = useState('')
  // const [ID, setID] = useState('')
  // const [reciever, setReciever] = useState('')
  const [ user, setUser ] = useState({})
  
  // useEffect(() => {
  //   console.log('useEffect()')
  //   socket.on(ID, data => {
  //     setResponse(data);
  //   });
  // },[]);

  // const send = value => {
  //   socket.emit("message",
  //     {
  //       ID,
  //       message: value,
  //       recievers:[reciever],
  //       chatID: 'chatID',
  //       token
  //     }
  //   )
  // }

  return (
    // <p>
    //   Response from socket: {response.message} <br/>
    //   ID<input value={ID} onChange={e=> {setID(e.target.value)}} /><br/>
    //   message<input value={value} onChange={e=> {setValue(e.target.value)}} /><br/>
    //   reciever<input value={reciever} onChange={e=> {setReciever(e.target.value)}} /><br/>
    //   <button onClick={()=>{if(value!='') send(value)}} >send</button>
    // </p>
    <div className="App">
      
      <Router>
        <Route exact path="/">
          {token!='' ? <Redirect to='/user/chat'/> :  <Redirect to='/register'/>}
        </Route>
        <Route exact path="/register">
          <FormPage formName={'register'} />
        </Route>
        <Route exact path="/login">
          <FormPage formName={'login'} />
        </Route>
        <Route path="/user">
          {token!='' ? <Nav user={user} setUser={setUser} /> :  <Redirect to='/register'/>}
        </Route>
        <Route exact path="/user">
          <User user={user} setUser={setUser} />
        </Route>
        <Route exact path="/user/chat">
          <ChatPage user={user} initialNewChatOpen={false} />
        </Route>
        {/* <Route exact path="/user/chat/add">
          <ChatPage user={user} initialNewChatOpen={true} />
        </Route> */}
        {/* <Route exact path="/user/chat/dialog/:open">
          <ChatPage user={user} initialNewChatOpen={false} />
        </Route> */}
        
        
      </Router>
    </div>
  );
}

export default App;