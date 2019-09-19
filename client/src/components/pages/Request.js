import React, { Component } from 'react';
import { Tag, Icon, Input, Button, Select, Collapse } from 'antd';
import io from 'socket.io-client';
import '@styles/request.css';
import cookie from 'react-cookies'
import Request from '@apis/Request'
const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
var socket = io('localhost:6969');
var ten = cookie.load('user');
var formatDateHMS = require('dateformat')
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNow: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
      dateStart: '',
      dateEnd: '',
      selectWho: '',
      textReason: '',
      halfDay: '',
      selectDate: '',
      selectPerson: '',
      reason: ''
    }
  }
  isChangeDateStart = (date) => {
    console.log(date.target.value, 'date');
    console.log(formatDateHMS(date.target.value, "dd/mm/yyyy"), 'date format start');
    this.setState({
      dateStart: formatDateHMS(date.target.value, "dd/mm/yyyy")
    });
  }
  isChangeDateEnd = (date) => {
    console.log(date.target.value, 'date');
    console.log(formatDateHMS(date.target.value, "dd/mm/yyyy"), 'date format end');
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
  onClickRegistrationRequest = (e) => {
    console.log(e, 'e');
    socket.emit("user-send-registration", e);
    Request('several/insert', 'POST', e).then(() => {
      console.log('da vao insert');
    })
  }
  onChangeHalfDay = (day) => {
    this.setState({
      halfDay: day
    });
  }

  onChangeDate = (date) => {
    this.setState({
      selectDate: formatDateHMS(date.target.value, "dd/mm/yyyy")
    });
  }

  onChangePerson = (person) => {
    this.setState({
      selectPerson: person
    });
  }

  onChangeReason = (reason) => {
    this.setState({
      reason: reason.target.value
    });
  }

  onClickRegistrationHalf = (obj) => {
    console.log('obj', obj);
    Request('several/insert1', 'POST', obj).then(() => {
      console.log('da vao insert');
    })
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
    var obj1 = {
      registration_time: this.state.timeNow,
      day: this.state.halfDay,
      date: this.state.selectDate,
      person: this.state.selectPerson,
      reason: this.state.reason,
      name: ten
    }
    return (
      <div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Đăng ký nghỉ 1 hoặc nhiều ngày" key="1">
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
              <Select style={{ width: 316 }} placeholder="Đăng ký cho ai?" onChange={(select) => this.isChangeSelect(select)}>
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
                onChange={(reason) => this.isChangeReason(reason)}
              />
            </div>
            <div id="button">
              <Button type="primary" onClick={() => this.onClickRegistrationRequest(obj)}>Đăng ký</Button>
            </div>
          </Panel>
          <Panel header="Đăng ký nghỉ nửa ngày" key="2">
            <div id="thoiGianDangKy">
              <Tag color="#f50">Thời gian đăng ký</Tag>
              <Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>
            </div>
            <div id="thoiGianNghi">
              <InputGroup style={{ width: 316 }} compact>
                <Select placeholder="Chọn" onChange={(day) => this.onChangeHalfDay(day)} size="small" style={{ width: '26%' }} >
                  <Option value="sang">Sáng</Option>
                  <Option value="chieu">Chiều</Option>
                </Select>
                <input type="date" onChange={(date) => this.onChangeDate(date)} style={{ width: '74%' }} />
              </InputGroup>
            </div>
            <div id="nguoiDuocChon">
              <Select onChange={(person) => this.onChangePerson(person)} style={{ width: 316 }} placeholder="Đăng ký cho ai?">
                <Option value="nhuan">anh Nhuận</Option>
                <Option value="phe">anh Phê</Option>
                <Option value="hoai">chị Hoài</Option>
                <Option value="hoa">chị Hoa</Option>
              </Select>
            </div>
            <div id="lyDo">
              <TextArea
                onChange={(reason) => this.onChangeReason(reason)}
                style={{ width: 316 }}
                placeholder="Lý do nghỉ"
                autosize={{ minRows: 3, maxRows: 5 }}
              />
            </div>
            <Button type="primary" onClick={() => this.onClickRegistrationHalf(obj1)}>Đăng ký</Button>
          </Panel>
        </Collapse>

      </div>
    );
  }
}

export default Requests;