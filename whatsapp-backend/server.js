
//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app= express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: '1069473',
    key: '64217f0f74b8fc7b482b',
    secret: '757b7afec8e41afb850b',
    cluster: 'ap2',
    encrypted: true
  }); 
//middleware
app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
// })

//DB Config
const connection_url = 'mongodb+srv://admin:admin@cluster0.y4x8c.mongodb.net/whatsapp-mern-backend?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log("error", err ));

const db=mongoose.connection;
console.log("db.once");
db.once("open",()=>{
    console.log("DB Connected");
    const msgCollection=db.collection("messagecontents");
    console.log("msgCollection",msgCollection);
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            });
        }else{
            console.log("Error Triggering pusher")
        }
    })
});
//????

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/message/new',(req,res)=>{
    const dbMessage =req.body;
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(`new message create${data}`)
        }
    })
})
//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`))