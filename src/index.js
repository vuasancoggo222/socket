import express  from "express"
import http from 'http'
import  {Server}  from "socket.io"
const app = express()
const httpServer = http.createServer(app)
const port = 4000
app.use(express.json())
const io = new Server(httpServer)
const path = require('node:path');
app.use( express.static('./'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../')+'/index.html');
  });
let messsage = []
io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('messsage',messsage)
    socket.on('value',(data)=>{
       messsage.push(data)
       io.emit('messsage',messsage)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

httpServer.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})