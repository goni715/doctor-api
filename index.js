const app = require("./app");
const dotenv = require('dotenv')
dotenv.config();
const http = require('http');
const socketIo = require('socket.io')
const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
        origin: '*',
        credentials: true
    }
})





io.on("connection", (socket)=>{

    // console.log("connected"+socket.id)

    //confirm-request
    socket.on("send-notification", (data)=>{
        if(data){
            //console.log(data);
            io.emit("receive-notification", socket.id)
        }

    })

    socket.on('disconnect', () => {
        // console.log('disconnected'+socket.id)
    })

})



server.listen(5000,function(){
    console.log("Server run @5000");
});