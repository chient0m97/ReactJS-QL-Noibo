// const express = require('express');
// const path = require('path');
// const app = express();
// var server = require('http').Server(app);
// var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
// var io = require('socket.io')(server);
// server.listen(port, () => console.log('Server running in port ' + port));
// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'dist', './')));
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', './index.html'));
// })
// io.on("connection", function(socket){
//     console.log('co nguoi ket noi '+socket.id);
//     socket.on("user-send-message", function(data){
//         io.sockets.emit("server-send-message", {un:data.user, nd:data.text});
//     });
//     socket.on("toi-dang-go-chu", function(){
//         socket.broadcast.emit("ai-do-dang-go-chu", "ai đó đang nhập tin nhắn");
//     });
//     socket.on("toi-stop-go-chu", function(){
//         io.sockets.emit("ai-do-stop-go-chu");
//     });
//     socket.on("user-send-registration", function(data){
//         console.log(data,'data');
//         if(data.dangKy==="nhuan")
//         {
//             io.sockets.emit("server-send-nhuan", data);
//             console.log(data, 'data to nhuan');
//         }
//         else if(data.dangKy==="phe")
//         {
//             io.sockets.emit("server-send-phe", data);
//         }
//         else if(data.dangKy==="hoai")
//         {
//             io.sockets.emit("server-send-hoai", data);
//         }
//         else
//         {
//             io.sockets.emit("server-send-hoa", data);
//         }
//     })
// }); 
