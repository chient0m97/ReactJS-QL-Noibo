import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import '@styles/layout.css';
var socket = io('localhost:6969');
socket.on("server-send-dki-thatbai", function(){
    //alert("Sai Username ( co nguoi dang ky roi )");
});
socket.on("server-send-danhsach-Users", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"</div>")
    });
});
socket.on("server-send-dki-thanhcong", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on("server-send-message", function(data){
    $("#listMessages").append("<div class='ms'>"+data.un+": "+data.nd+"</div>");
});
socket.on("ai-do-dang-go-chu", function(data){
    $("#thongbao").html(data);
});
socket.on("ai-do-stop-go-chu", function(){
    $("#thongbao").html("");
});
$("#txtMessage").focusin(function(){
    socket.emit("toi-dang-go-chu");
});
$("#txtMessage").focusout(function(){
    socket.emit("toi-stop-go-chu");
});
$("#btnRegister").click(function(){
    socket.emit("client-send-Username", $("#txtUsername").val());
});
$("#btnLogout").click(function(){
    socket.emit("logout");
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
});
$("#btnSendMessage").click(function(){
    socket.emit("user-send-message", $("#txtMessage").val());
});
class Chat extends Component {
      componentDidMount() {
        $("#loginForm").show();
        $("#chatForm").hide();
      } 
      clientSendUsername = () => {
        socket.emit("client-send-Username", "da vao");
      }  
    render() {
        return (
            <div id="wrapper">
        <div id="loginForm">
            <h3>WHAT'S YOUR NAME?</h3>
            <input type="text" id="txtUsername"/>
            <input type="button" value="Register" id="btnRegister" onClick={this.clientSendUsername()}/>
        </div>
        <div id="chatForm">
            <div id="left">
                <div id="boxTitle">Users Online</div>
                <div id="boxContent">
                </div>
            </div>
            <div id="right">
                <div id="sayHi">Hello <span id="currentUser">Teo</span><input type="button" id="btnLogout" value="Logout"/></div>
                <div id="listMessages"></div>
                <div id="thongbao"></div>
                <input type="text" id="txtMessage"/>
                <input type="button" id="btnSendMessage" value="Send"/>
            </div>
        </div>
    </div>
        );
    }
}

export default Chat;