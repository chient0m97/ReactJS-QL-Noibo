import React, { Component } from 'react';
import { Tag, Icon, Input, Button, Select, DatePicker } from 'antd';
import io from 'socket.io-client';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
class Request extends Component {
  componentWillMount(){
    this.socket = io('localhost:6969');
  }
  render() {
    var formatDateHMS = require('dateformat')
    return (
      <div>
        <Tag color="#f50">Thời gian đăng ký</Tag>
        <Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>
        <hr style={{ width: '0px' }} />
        <RangePicker />
        <hr style={{ width: '0px' }} />
        <Select style={{ width: 316 }} placeholder="Đăng ký cho ai?">
          <Option value="nhuan">anh Nhuận</Option>
          <Option value="phe">anh Phê</Option>
          <Option value="hoai">chị Hoài</Option>
          <Option value="hoa">chị Hoa</Option>
        </Select>
        <hr style={{ width: '0px' }} />
        <TextArea
          style={{ width: 316 }}
          placeholder="Lý do nghỉ"
          autosize={{ minRows: 3, maxRows: 5 }}
        />
        <hr style={{ width: '0px' }} />
        <Button type="primary" onClick={()=>sendData()}>Đăng ký</Button>
      </div>
    );
  }
}

export default Request;