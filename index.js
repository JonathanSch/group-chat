const WebSocket = require('ws')
const wss = new WebSocket.Server({port:8080})

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