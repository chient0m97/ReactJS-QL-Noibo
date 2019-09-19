import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import '@styles/layout.css';
import cookie from 'react-cookies'
import { Button, Input } from 'antd'
var socket = io('localhost:6969');
var ten = cookie.load('user');
socket.on("server-send-danhsach-Users", function (data) {
    $("#boxContent").html("");
    data.forEach(function (i) {
        $("#boxContent").append("<div class='user'>" + i + "</div>")
    });
});
socket.on("server-send-dki-thanhcong", function (data) {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on("server-send-message", function (data) {
    $("#listMessages").append("<div class='ms'>" + data.un + ": " + data.nd + "</div>");
});
socket.on("ai-do-dang-go-chu", function (data) {
    $("#thongbao").html(data);
});
socket.on("ai-do-stop-go-chu", function () {
    $("#thongbao").html("");
});
$("#txtMessage").focusin(function () {
    socket.emit("toi-dang-go-chu");
});
$("#txtMessage").focusout(function () {
    socket.emit("toi-stop-go-chu");
});
$("#btnRegister").click(function () {
    socket.emit("client-send-Username", $("#txtUsername").val());
});
$("#btnLogout").click(function () {
    socket.emit("logout");
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
});
$("#btnSendMessage").click(function () {
    socket.emit("user-send-message", $("#txtMessage").val());
});
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempValue: '',
        }
    }

    clientSendUsername = (tempValue) => {
        console.log(tempValue, 'tempValue');
        socket.emit("user-send-message", tempValue);
        document.getElementById("txtMessage").value=''
        document.getElementById('txtMessage').focus();
    }
    textChat(event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);//text
        console.log(value);
        this.setState({
            tempValue: event.target.value
        });
    }
    componentDidMount() {
        $("#txtMessage").focusin(function () {
            socket.emit("toi-dang-go-chu");
        });
        $("#txtMessage").focusout(function () {
            socket.emit("toi-stop-go-chu");
        });
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            var obj = {
                text: this.state.tempValue,
                user: ten
            }
            this.clientSendUsername(obj)
          }
    }

    render() {
        var obj = {
            text: this.state.tempValue,
            user: ten
        }
        return (
            <div id="wrapper">
                <div id="chatForm">
                    <div id="right">
                        <div id="sayHi">Hello <span id="currentUser">{ten}</span></div>
                        <div id="listMessages"></div>
                        <div id="thongbao"></div>
                        <div>
                            <Input style={{marginBottom: "15px"}} type="text" name="text" id="txtMessage" placeholder="Type your message here..." onChange={(event) => this.textChat(event)} onKeyDown={this._handleKeyDown}/>
                        </div>
                        <div>
                            <Button onClick={() => this.clientSendUsername(obj)}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;