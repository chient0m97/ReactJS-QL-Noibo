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
// var socket = io('fscvn.ddns.net:6969');
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
    this.setState({
      dateStart: formatDateHMS(date.target.value, "dd/mm/yyyy")
    });
  }

  isChangeDateEnd = (date) => {
    this.setState({
      dateEnd: formatDateHMS(date.target.value, "dd/mm/yyyy")
    });
  }

  isChangeSelect = (select) => {
    if ((ten === "vuson" && select === "hoai") || (ten === "nguyennhuan" && select === "nhuan") || (ten === "tranhoa" && select === "hoa") || (ten === "lephe" && select === "phe")) {
      alert("Bạn không được phép đăng ký nghỉ cho chính mình")
      this.setState({
        selectWho: ''
      })
    }
    else {
      this.setState({
        selectWho: select
      });
    }
  }

  isChangeReason = (reason) => {
    this.setState({
      textReason: reason.target.value
    });
  }

  onClickRegistrationRequest = (e) => {
    socket.emit("user-send-registration", e);
    if (e.dangKy !== "" && e.lyDo !== "" && e.ngayBatDau !== "" && e.ngayKetThuc !== "") {
      Request('several/insert', 'POST', e).then(() => {
        alert("Đăng ký nghỉ thành công")
      })
    }
    else if (e.dangKy === "" && e.lyDo !== "" && e.ngayBatDau !== "" && e.ngayKetThuc !== "") {
      alert("Bạn chưa chọn người để đăng ký nghỉ hoặc chọn sai")
    }
    else {
      alert("Bạn chưa điền đủ thông tin")
    }
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
    if ((ten === "vuson" && person === "hoai") || (ten === "nguyennhuan" && person === "nhuan") || (ten === "tranhoa" && person === "hoa") || (ten === "lephe" && person === "phe")) {
      alert("Bạn không được phép đăng ký nghỉ cho chính mình")
      this.setState({
        selectPerson: ''
      })
    }
    else {
      this.setState({
        selectPerson: person
      });
    }
  }

  onChangeReason = (reason) => {
    this.setState({
      reason: reason.target.value
    });
  }

  onClickRegistrationHalf = (obj) => {
    if (obj.date !== "" && obj.day !== "" && obj.person !== "" && obj.reason !== "") {
      Request('several/insert1', 'POST', obj).then(() => {
        alert("Đăng ký nghỉ thành công")
      })
    }
    else if (obj.person === "" && obj.date !== "" && obj.day !== "" && obj.reason !== "") {
      alert("Bạn chưa chọn người để đăng ký nghỉ hoặc chọn sai")
    }
    else {
      alert("Bạn chưa điền đủ thông tin")
    }
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
              <Select id="selectPerson" style={{ width: 316 }} placeholder="Đăng ký cho ai?" onChange={(select) => this.isChangeSelect(select)}>
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