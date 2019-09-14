import React, { Component } from 'react';
import { Tag, Icon, Input, Button, Select } from 'antd';
import io from 'socket.io-client';
import '@styles/request.css';
import cookie from 'react-cookies'
const { Option } = Select;
const { TextArea } = Input;
var socket = io('localhost:6969');
var ten = cookie.load('user');
var formatDateHMS = require('dateformat')
class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNow: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
      dateStart: '',
      dateEnd: '',
      selectWho: '',
      textReason: ''
    }
  }
  isChangeDateStart = (date) => {
    console.log(date.target.value, 'date');
    console.log(formatDateHMS(date.target.value, "dd/mm/yyyy"),'date format start');
    this.setState({
      dateStart: formatDateHMS(date.target.value, "dd/mm/yyyy")
    });
  }
  isChangeDateEnd = (date) => {
    console.log(date.target.value, 'date');
    console.log(formatDateHMS(date.target.value, "dd/mm/yyyy"),'date format end');
    this.setState({
      dateEnd: formatDateHMS(date.target.value, "dd/mm/yyyy")
    });
  }
  isChangeSelect = (select) => {
    console.log(select, 'select');
    this.setState({
      selectWho: select
    });
  }
  isChangeReason = (reason) => {
    console.log(reason.target.value, 'reason');
    this.setState({
      textReason: reason.target.value
    });
  }
  onClickRegistration = (e) => {
    console.log(e, 'e');
    socket.emit("user-send-registration", e);
    
  }
  render() {
    var obj = {
      thoiGianDangKy: this.state.timeNow,
      ngayBatDau: this.state.dateStart,
      ngayKetThuc: this.state.dateEnd,
      dangKy: this.state.selectWho,
      lyDo: this.state.textReason,
      nguoiDangKy: ten
    }
    console.log(this.state.timeNow, 'time now');
    return (
      <div>
        <div id="timeNow">
          <Tag color="#f50">Thời gian đăng ký</Tag>
          <Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>
        </div>
        <div id="datePickerStart">
          <Tag color="#f50">Chọn ngày bắt đầu</Tag>
          <input type="date" onChange={(date) => this.isChangeDateStart(date)} />
        </div>
        <div id="datePickerEnd">
          <Tag color="#f50">Chọn ngày kết thúc</Tag>
          <input type="date" onChange={(date) => this.isChangeDateEnd(date)} />
        </div>
        <div id="select">
          <Select style={{ width: 316 }} placeholder="Đăng ký cho ai?" onChange={(select)=>this.isChangeSelect(select)}>
            <Option value="nhuan">anh Nhuận</Option>
            <Option value="phe">anh Phê</Option>
            <Option value="hoai">chị Hoài</Option>
            <Option value="hoa">chị Hoa</Option>
          </Select>
        </div>
        <div id="textArea">
          <TextArea
            style={{ width: 316 }}
            placeholder="Lý do nghỉ"
            autosize={{ minRows: 3, maxRows: 5 }}
            onChange={(reason)=>this.isChangeReason(reason)}
          />
        </div>
        <div id="button">
          <Button type="primary" onClick={()=>this.onClickRegistration(obj)}>Đăng ký</Button>
        </div>
      </div>
    );
  }
}

export default Request;