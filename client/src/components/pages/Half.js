import React, { Component } from 'react';
import { Icon, Input, Button, Select, Tag } from 'antd';
import '@styles/request.css';
import Request from '@apis/Request'
import cookie from 'react-cookies'
const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;
var formatDateHMS = require('dateformat')
var ten = cookie.load('user');
class Half extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeNow: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
            halfDay: '',
            selectDate: '',
            selectPerson: '',
            reason: ''
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
            registration_time: this.state.timeNow,
            day: this.state.halfDay,
            date: this.state.selectDate,
            person: this.state.selectPerson,
            reason: this.state.reason,
            name: ten
          }
          console.log(obj,'obj');
          
        var formatDateHMS = require('dateformat')
        return (
            <div>
                <div id="thoiGianDangKy">
                <Tag color="#f50">Thời gian đăng ký</Tag>              
                <Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>
                </div>
                <div id="thoiGianNghi">
                <InputGroup style={{ width: 316 }} compact>
                    <Select placeholder="Chọn" onChange={(day)=>this.onChangeHalfDay(day)} size="small" style={{ width: '26%' }} >
                        <Option value="sang">Sáng</Option>
                        <Option value="chieu">Chiều</Option>
                    </Select>
                    <input type="date" onChange={(date)=>this.onChangeDate(date)} style={{ width: '74%' }}/>
                </InputGroup>
                </div>
                <div id="nguoiDuocChon">
                <Select onChange={(person)=>this.onChangePerson(person)} style={{ width: 316 }} placeholder="Đăng ký cho ai?">
                    <Option value="nhuan">anh Nhuận</Option>
                    <Option value="phe">anh Phê</Option>
                    <Option value="hoai">chị Hoài</Option>
                    <Option value="hoa">chị Hoa</Option>
                </Select>
                </div>
                <div id="lyDo">
                <TextArea
                    onChange={(reason)=>this.onChangeReason(reason)}
                    style={{ width: 316 }}
                    placeholder="Lý do nghỉ"
                    autosize={{ minRows: 3, maxRows: 5 }}
                />
                </div>
                <Button type="primary" onClick={()=>this.onClickRegistrationHalf(obj)}>Đăng ký</Button>
            </div>
        );
    }
}
export default Half;