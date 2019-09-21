import React, { Component } from 'react';
import { Input, Button, Select, Tag, Radio, DatePicker, notification } from 'antd';
import '@styles/request.css';
import '@styles/style.css';
import Request from '@apis/Request'
import cookie from 'react-cookies'
const { Option } = Select;
const { TextArea } = Input;
var formatDateHMS = require('dateformat')
var ten = cookie.load('user');

class Half extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaiDangKy: '',
            chonNgay: '',
            chonNgayBatDau: '',
            chonNgayKetThuc: '',
            nguoiDuyetDu: '',
            nguoiDuyetThieu: '',
            lyDo: '',
            name: '',
            registration_time: '',
            day: '',
            date: '',
            person: '',
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

    onChangeReason = (e) => {
        this.setState({
            lyDo: e.target.value
        });
    }

    onClickRegistrationHalf = (obj) => {
        ////console.log('obj', obj);
        Request('several/insert1', 'POST', obj).then(() => {
            ////console.log('da vao insert');
        })
    }

    onChange = (e) => {
        console.log(e._d, 'e day');
        console.log(formatDateHMS(e._d, "dd/mm/yyyy"), "e day");
        this.setState({
            chonNgayBatDau: formatDateHMS(e._d, "dd/mm/yyyy")
        });
    }
    onChange1 = (e) => {
        console.log(e._d, 'e day');
        console.log(formatDateHMS(e._d, "dd/mm/yyyy"), "e day 1");
        this.setState({
            chonNgay: formatDateHMS(e._d, "dd/mm/yyyy")
        });
    }
    onChange2 = (e) => {
        console.log(e._d, 'e day');
        console.log(formatDateHMS(e._d, "dd/mm/yyyy"), "e day 2");
        this.setState({
            chonNgayKetThuc: formatDateHMS(e._d, "dd/mm/yyyy")
        });
    }
    onChangeApprover = (e) => {
        console.log(e, 'e nguoi duyet day');
        this.setState({
            nguoiDuyetDu: e
        });
    }
    onChangeApprover1 = (e) => {
        console.log(e, 'e nguoi duyet day');
        this.setState({
            nguoiDuyetThieu: e
        });
    }
    onChangeA = (e) => {
        document.getElementById("id_name").style.display = 'none';
        document.getElementById("id_name1").style.display = 'block';
        document.getElementById("id_name2").style.display = 'none';
        document.getElementById("id_name3").style.display = 'block';
        document.getElementById("id_name4").style.display = 'none';
        document.getElementById("id_name5").style.display = 'block';
        document.getElementById("id_name6").style.display = 'block';
        this.setState({
            loaiDangKy: e.target.value
        });
    }
    onChangeB = (e) => {
        document.getElementById("id_name").style.display = 'none';
        document.getElementById("id_name1").style.display = 'block';
        document.getElementById("id_name2").style.display = 'none';
        document.getElementById("id_name3").style.display = 'block';
        document.getElementById("id_name4").style.display = 'none';
        document.getElementById("id_name5").style.display = 'block';
        document.getElementById("id_name6").style.display = 'block';
        this.setState({
            loaiDangKy: e.target.value
        });
    }
    onChangeC = (e) => {
        document.getElementById("id_name").style.display = 'none';
        document.getElementById("id_name1").style.display = 'block';
        document.getElementById("id_name2").style.display = 'none';
        document.getElementById("id_name3").style.display = 'block';
        document.getElementById("id_name4").style.display = 'none';
        document.getElementById("id_name5").style.display = 'block';
        document.getElementById("id_name6").style.display = 'block';
        this.setState({
            loaiDangKy: e.target.value
        });
    }
    onChangeD = (e) => {
        document.getElementById("id_name").style.display = 'block';
        document.getElementById("id_name1").style.display = 'none';
        document.getElementById("id_name2").style.display = 'block';
        document.getElementById("id_name3").style.display = 'none';
        document.getElementById("id_name4").style.display = 'block';
        document.getElementById("id_name5").style.display = 'block';
        document.getElementById("id_name6").style.display = 'block';
        this.setState({
            loaiDangKy: e.target.value
        });
    }
    componentWillMount() {
        //document.getElementById("id_name1").style.display = 'none';
    }
    componentDidMount() {
        document.getElementById("id_name").style.display = 'none';
        document.getElementById("id_name1").style.display = 'none';
        document.getElementById("id_name2").style.display = 'none';
        document.getElementById("id_name3").style.display = 'none';
        document.getElementById("id_name4").style.display = 'none';
        document.getElementById("id_name5").style.display = 'none';
        document.getElementById("id_name6").style.display = 'none';
    }
    onClickRegistration = () => {
        console.log(ten, 'ten');
        console.log(this.state.loaiDangKy, 'loai dang ky');
        console.log(this.state.chonNgay, 'chon ngay');
        console.log(this.state.chonNgayBatDau, 'chon ngay bat dau');
        console.log(this.state.chonNgayKetThuc, 'chon ngay ket thuc');
        console.log(this.state.nguoiDuyetDu, 'nguoi duyet du');
        console.log(this.state.nguoiDuyetThieu, 'nguoi duyet thieu');
        console.log(this.state.lyDo, 'ly do');
        if (this.state.loaiDangKy === "a") {
            if (this.state.chonNgay !== "" && this.state.nguoiDuyetDu !== "" && this.state.lyDo !== "") {
                Request('half/insert2', 'POST', {
                    name: ten,
                    registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
                    date: this.state.chonNgay,
                    person: this.state.nguoiDuyetDu,
                    reason: this.state.lyDo
                }).then((res) =>
                    notification[res.data.success === true ? 'success' : 'error']({
                        message: 'Thông Báo',
                        description: res.data.message
                    })
                ).catch((err) => {
                    console.log(err)
                })
            }
            else {
                notification['error']({
                    message: 'Lỗi',
                    description: 'Bạn chưa điền đủ thông tin'
                })
            }
        }
        else if (this.state.loaiDangKy === "b") {
            if (this.state.chonNgay !== "" && this.state.nguoiDuyetDu !== "" && this.state.lyDo !== "") {
                Request('half/insert3', 'POST', {
                    name: ten,
                    registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
                    date: this.state.chonNgay,
                    person: this.state.nguoiDuyetDu,
                    reason: this.state.lyDo
                }).then((res) =>
                    notification[res.data.success === true ? 'success' : 'error']({
                        message: 'Thông Báo',
                        description: res.data.message
                    })
                ).catch((err) => {
                    console.log(err)
                })
            }
            else {
                notification['error']({
                    message: 'Lỗi',
                    description: 'Bạn chưa điền đủ thông tin'
                })
            }
        }
        else if (this.state.loaiDangKy === "c") {
            if (this.state.chonNgay !== "" && this.state.nguoiDuyetDu !== "" && this.state.lyDo !== "") {
                Request('several/insert2', 'POST', {
                    name: ten,
                    registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
                    day_start: this.state.chonNgay,
                    day_end: this.state.chonNgay,
                    who: this.state.nguoiDuyetDu,
                    reason: this.state.lyDo
                }).then((res) =>
                    notification[res.data.success === true ? 'success' : 'error']({
                        message: 'Thông Báo',
                        description: res.data.message
                    })
                ).catch((err) => {
                    console.log(err)
                })
            }
            else {
                notification['error']({
                    message: 'Lỗi',
                    description: 'Bạn chưa điền đủ thông tin'
                })
            }
        }
        else if (this.state.loaiDangKy === "d") {
            if (this.state.chonNgayBatDau !== "" && this.state.chonNgayKetThuc !== "" && this.state.nguoiDuyetThieu !== "" && this.state.lyDo !== "") {
                console.log('da vao api');
                
                Request('several/insert3', 'POST', {
                    name: ten,
                    registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
                    day_start: this.state.chonNgayBatDau,
                    day_end: this.state.chonNgayKetThuc,
                    who: this.state.nguoiDuyetThieu,
                    reason: this.state.lyDo
                }).then((res) =>
                    notification[res.data.success === true ? 'success' : 'error']({
                        message: 'Thông Báo',
                        description: res.data.message
                    })
                ).catch((err) => {
                    console.log(err)
                })
            }
            else {
                notification['error']({
                    message: 'Lỗi',
                    description: 'Bạn chưa điền đủ thông tin'
                })
            }
        }
        else {
            //mac dinh
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button onClick={(e) => this.onChangeA(e)} value="a">1/2 Ngày - Sáng</Radio.Button>
                        <Radio.Button onClick={(e) => this.onChangeB(e)} value="b">1/2 Ngày - Chiều</Radio.Button>
                        <Radio.Button onClick={(e) => this.onChangeC(e)} value="c">1 Ngày</Radio.Button>
                        <Radio.Button onClick={(e) => this.onChangeD(e)} value="d">Nhiều ngày</Radio.Button>
                    </Radio.Group>
                </div>
                <div id="id_name" style={{ marginTop: 16 }}>
                    <Tag color="#f50">Chọn ngày bắt đầu</Tag>
                    <DatePicker onChange={(e) => this.onChange(e)} style={{ width: '191px' }} />
                </div>
                <div id="id_name1" style={{ marginTop: 16 }}>
                    <Tag color="#f50">Chọn ngày</Tag>
                    <DatePicker onChange={(e) => this.onChange1(e)} style={{ width: '234px' }} />
                </div>
                <div id="id_name2" style={{ marginTop: 16 }}>
                    <Tag color="#f50">Chọn ngày kết thúc</Tag>
                    <DatePicker onChange={(e) => this.onChange2(e)} style={{ width: '188px' }} />
                </div>
                <div id="id_name3" style={{ marginTop: 16 }}>
                    <Select id="selectPerson"
                        style={{ width: 316 }}
                        placeholder="Người duyệt"
                        onChange={(e) => this.onChangeApprover(e)}
                    >
                        <Option value="nhuan">anh Nhuận</Option>
                        <Option value="phe">anh Phê</Option>
                        <Option value="hoai">chị Hoài</Option>
                        <Option value="hoa">chị Hoa</Option>
                    </Select>
                </div>
                <div id="id_name4" style={{ marginTop: 16 }}>
                    <Select id="selectPerson"
                        style={{ width: 316 }}
                        placeholder="Người duyệt"
                        onChange={(e) => this.onChangeApprover1(e)}
                    >
                        <Option value="nhuan">anh Nhuận</Option>
                        <Option value="phe">anh Phê</Option>
                    </Select>
                </div>
                <div id="id_name5" style={{ marginTop: 16 }}>
                    <TextArea
                        style={{ width: 316 }}
                        placeholder="Lý do nghỉ"
                        autosize={{ minRows: 3, maxRows: 5 }}
                        onChange={(e) => this.onChangeReason(e)}
                    />
                </div>
                <div id="id_name6" style={{ marginTop: 16 }}>
                    <Button type="primary"
                        onClick={() => this.onClickRegistration()}
                    >Đăng ký</Button>
                </div>
            </div>
        );
    }
}
export default Half;