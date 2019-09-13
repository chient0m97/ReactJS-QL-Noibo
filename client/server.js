const express = require('express');
const path = require('path');

const app = express();
var server = require('http').Server(app);
var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
var io = require('socket.io')(server);
server.listen(port, () => console.log('Server running in port ' + port));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist', './')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', './index.html'));
})

var mangUsers=[];
io.on("connection", function(socket){
    console.log('co nguoi ket noi '+socket.id);
    socket.on("client-send-Username", function(data){
        console.log('da co nguoi vao', data);
        
        if(mangUsers.indexOf(data)>=0){
            socket.emit("server-send-dki-thatbai");
        }else{
            mangUsers.push(data);
            socket.Username=data;
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach-Users", mangUsers);
        }     
    });
    socket.on("logout", function(){
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("server-send-danhsach-Users", mangUsers);
    });
    socket.on("user-send-message", function(data){
        io.sockets.emit("server-send-message", {un:socket.Username, nd:data});
    });
    socket.on("toi-dang-go-chu", function(){
        var s = socket.Username+" dang go chu"; 
        socket.broadcast.emit("ai-do-dang-go-chu", s);
    });
    socket.on("toi-stop-go-chu", function(){
        io.sockets.emit("ai-do-stop-go-chu");
    });
});
//app.listen(88)