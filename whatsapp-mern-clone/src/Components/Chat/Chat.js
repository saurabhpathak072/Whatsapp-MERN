import React,{useState} from 'react'
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import {SearchOutlined,AttachFile,MoreVert, InsertEmoticon,Mic} from '@material-ui/icons'
import axios from '../../Axios/axios';

const Chat = ({messages}) => {
    const [input, setInput] = useState('');
    const sendmessage=async(e)=>{
        e.preventDefault();

        await axios.post("/message/new",{

    message:input,
    name:"pm",
    timestamp:"far far away",
    received:false
        });
        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
            
            <div className="chat__headerInfo">
                <h3>Room Name</h3>
                <p>Last seen at ...</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chat__body">
                {messages.map(msg=>(
                    <p className={`chat__message ${msg.received && "chat__reciever"}`} >
                    <span className="chat__name">{msg.name}</span>
                    {msg.message}
                    <span className="chat__timestamp">{msg.timestamp}</span>
                </p>
                ))}
                
{/* 
                <p className="chat__message chat__reciever">
                    <span className="chat__name">Saurabh</span>
                    this is a message
    <span className="chat__timestamp">{new Date().toLocaleString()}</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Saurabh</span>
                    this is a message
    <span className="chat__timestamp">{new Date().toLocaleString()}</span>
                </p> */}
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input
                      value={input} 
                      onChange={(e)=>setInput(e.target.value)}
                     placeholder="Type a message"
                     type="text"
                     />
                     <button
                       onClick={sendmessage} 
                      type="submit">
                         Send a message
                     </button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat
