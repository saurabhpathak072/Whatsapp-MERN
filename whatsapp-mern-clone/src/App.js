import React,{useEffect,useState} from 'react';
import './App.css';
import Sidebar from './Components/Sidebar.js/Sidebar';
import Chat from './Components/Chat/Chat';
import Pusher from 'pusher-js';
import axios from './Axios/axios';

function App() {

  const [meaasage, setmeaasage] = useState([])

  useEffect(() => {
    axios.get('/messages/sync')
    .then(res=>setmeaasage(res.data))
    
  }, [])
  
  useEffect(()=>{
   

    const pusher = new Pusher('64217f0f74b8fc7b482b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (nreMessages)=> {
      // alert(JSON.stringify(nreMessages));
      setmeaasage([...meaasage,nreMessages])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[meaasage])
console.log("meaasage",meaasage);
  return (
    <div className="app">
      <div className="app__body">
       {/*Sidebar Component*/}
       <Sidebar/>
        {/**Chat Component */}
       <Chat messages={meaasage}/>
      </div>
     
    </div>
  );
}

export default App;
