const WebSocket = require('ws')
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port)
const wss = new WebSocket.Server({server,path:'/'})

wss.on('listening',()=>{
    console.log('Server up and running')
})

wss.on('connection',ws=>{

    ws.on('message',data=>{
        
        const info = data.split(' ');

        if(info[0] === 'grupo'){
            ws.class = info[1]
        }
        else if(info[0] === 'mensaje'){ 
            wss.clients.forEach(client=>{
                if(client.class === info[1] && client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(info[2])
                }
            })
        }
    })
})