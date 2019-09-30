import React, { Component } from 'react';
import { Table, Divider, Tag, Row, Pagination, Tabs, Collapse } from 'antd';
import io from 'socket.io-client';
import cookie from 'react-cookies'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action';
import { connect } from 'react-redux'
// var socket = io('fscvn.ddns.net:6969');
var socket = io('localhost:6969');
var ten = cookie.load('user');
const { Column } = Table;
const { TabPane } = Tabs;
const { Panel } = Collapse;
class Approved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSeveral: [],
            selectedRowKeys: [],
            rowthotroselected: {},
            statebuttonedit: true,
            statebuttondelete: true,
            stateconfirmdelete: false,
            selectedId: [],
            pageSize: 10,
            pageNumber: 1,
            page: 1,
            count1: 1,
            count2: 1,
            count3: 1,
            count4: 1,
            count5: 1,
            count6: 1,
            current: 1,
            isSort: true,
            sortBy: '',
            index: 'id',
            isSearch: 0,
        }
    }

    getHopdongs = (pageNumber) => { //cho phe duyet
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        if (ten === "nguyennhuan") { //tai khoan anh Nhuan
            Request('several/get', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res data count ", response.data.data.count)
                    if (response)
                        this.setState({
                            several: response.data.data.several,
                            count1: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "lephe") //tai khoan anh Phe
        {
            Request('several/get1', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res ", response)
                    if (response)
                        this.setState({
                            several: response.data.data.several,
                            count1: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "vuson") // tai khoan chi Hoai
        {
            Request('several/get2', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res ", response)
                    if (response)
                        this.setState({
                            several: response.data.data.several,
                            count1: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "tranhoa")// tai khoan chi Hoa
        {
            Request('several/get3', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res ", response)
                    if (response)
                        this.setState({
                            several: response.data.data.several,
                            count1: Number(response.data.data.count)
                        })
                })
        }
        else {
            <h1>Bạn không có quyền vào đây</h1>
        }
        this.props.fetchLoading({
            loading: false
        })
    }
    getHopdong = (pageNumber) => { //da phe duyet
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        if (ten === "nguyennhuan") { //tai khoan anh Nhuan
            Request('several/getaccept', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severals: response.data.data.several,
                            count2: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "lephe") //tai khoan anh Phe
        {
            Request('several/getaccept1', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severals: response.data.data.several,
                            count2: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "vuson") // tai khoan chi Hoai
        {
            Request('several/getaccept2', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severals: response.data.data.several,
                            count2: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "tranhoa")// tai khoan chi Hoa
        {
            Request('several/getaccept3', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severals: response.data.data.several,
                            count2: Number(response.data.data.count)
                        })
                })
        }
        else {
            <h1>Bạn không có quyền vào đây</h1>
        }
        this.props.fetchLoading({
            loading: false
        })
    }
    getHopdongss = (pageNumber) => { //khong phe duyet
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        if (ten === "nguyennhuan") { //tai khoan anh Nhuan
            Request('several/getrefuse', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severalss: response.data.data.several,
                            count3: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "lephe") //tai khoan anh Phe
        {
            Request('several/getrefuse1', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severalss: response.data.data.several,
                            count3: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "vuson") // tai khoan chi Hoai
        {
            Request('several/getrefuse2', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severalss: response.data.data.several,
                            count3: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "tranhoa")// tai khoan chi Hoa
        {
            Request('several/getrefuse3', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res 1", response)
                    if (response)
                        this.setState({
                            severalss: response.data.data.several,
                            count3: Number(response.data.data.count)
                        })
                })
        }
        else {
            <h1>Bạn không có quyền vào đây</h1>
        }
        this.props.fetchLoading({
            loading: false
        })
    }
    getHalf = (pageNumber) => { //cho phe duyet
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        if (ten === "nguyennhuan") { //tai khoan anh Nhuan
            Request('half/get', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res half", response)
                    if (response)
                        this.setState({
                            half: response.data.data.half,
                            count4: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "lephe") //tai khoan anh Phe
        {
            Request('half/get1', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res half", response)
                    if (response)
                        this.setState({
                            half: response.data.data.half,
                            count4: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "vuson") // tai khoan chi Hoai
        {
            Request('half/get2', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res half", response)
                    if (response)
                        this.setState({
                            half: response.data.data.half,
                            count4: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "tranhoa")// tai khoan chi Hoa
        {
            Request('half/get3', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    //console.log("day la res half", response)
                    if (response)
                        this.setState({
                            half: response.data.data.half,
                            count4: Number(response.data.data.count)
                        })
                })
        }
        else {
            <h1>Bạn không có quyền vào đây</h1>
        }
        this.props.fetchLoading({
            loading: false
        })
    }
    getHalfs = (pageNumber) => { //da phe duyet
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        if (ten === "nguyennhuan") { //tai khoan anh Nhuan
            Request('half/getaccept', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfs: response.data.data.half,
                            count5: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "lephe") //tai khoan anh Phe
        {
            Request('half/getaccept1', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfs: response.data.data.half,
                            count5: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "vuson") // tai khoan chi Hoai
        {
            Request('half/getaccept2', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfs: response.data.data.half,
                            count5: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "tranhoa")// tai khoan chi Hoa
        {
            Request('half/getaccept3', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfs: response.data.data.half,
                            count5: Number(response.data.data.count)
                        })
                })
        }
        else {
            <h1>Bạn không có quyền vào đây</h1>
        }
        this.props.fetchLoading({
            loading: false
        })
    }
    getHalfss = (pageNumber) => { //khong phe duyet
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        if (ten === "nguyennhuan") { //tai khoan anh Nhuan
            Request('half/getrefuse', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfss: response.data.data.half,
                            count6: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "lephe") //tai khoan anh Phe
        {
            Request('half/getrefuse1', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfss: response.data.data.half,
                            count6: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "vuson") // tai khoan chi Hoai
        {
            Request('half/getrefuse2', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfss: response.data.data.half,
                            count6: Number(response.data.data.count)
                        })
                })
        }
        else if (ten === "tranhoa")// tai khoan chi Hoa
        {
            Request('half/getrefuse3', 'POST', {
                pageSize: this.state.pageSize,
                pageNumber: pageNumber,
                index: this.state.index,
                sortBy: this.state.sortBy
            })
                .then((response) => {
                    if (response)
                        this.setState({
                            halfss: response.data.data.half,
                            count6: Number(response.data.data.count)
                        })
                })
        }
        else {
            <h1>Bạn không có quyền vào đây</h1>
        }
        this.props.fetchLoading({
            loading: false
        })
    }

    handleCount = () => {
        let count1 = this.state.count1;
        let count2 = this.state.count2;
        let count3 = this.state.count3;
        let count4 = this.state.count4;
        let count5 = this.state.count5;
        let count6 = this.state.count6;
        this.setState({
            count1: count1 + 1,
            count2: count2 + 1,
            count3: count3 + 1,
            count4: count4 + 1,
            count5: count5 + 1,
            count6: count6 + 1
        })
    }

    componentWillMount() {
        if (ten === "nguyennhuan") { //anh Nhuan
            socket.on("server-send-nhuan", function (data) {
                //console.log(data, 'data');
            })
        }
        else if (ten === "lephe") { //anh Phe
            socket.on("server-send-phe", function (data) {
                //console.log(data, 'data');
            })
        }
        else if (ten === "vuson") //chi Hoai
        {
            socket.on("server-send-hoai", function (data) {
                //console.log(data, 'data');
            })
        }
        else if (ten === "tranhoa") //chi Hoa
        {
            socket.on("server-send-hoa", function (data) {
                //console.log(data, 'data');
            })
        }
        else {
            alert("Bạn không có quyền vào đây")
        }
    }

    async componentDidMount() {
        await this.getHopdongs(this.state.pageNumber, this.state.index);
        await this.getHopdong(this.state.pageNumber, this.state.index);
        await this.getHopdongss(this.state.pageNumber, this.state.index);
        await this.getHalf(this.state.pageNumber, this.state.index);
        await this.getHalfs(this.state.pageNumber, this.state.index);
        await this.getHalfss(this.state.pageNumber, this.state.index);
        document.getElementsByClassName('ant-table-expand-icon-th')[0].innerHTML = 'Lý do'
        document.getElementsByClassName('ant-table-expand-icon-th')[0].style.width = '85px'
    }

    onClickPheDuyet = (text) => {
        //console.log(text, 'text');
        if (ten === "nguyennhuan") { // tai khoan anh Nhuan
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "lephe") { // tai khoan anh Phe
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update1', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "vuson") { // tai khoan chi Hoai
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update2', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else if(ten === "tranhoa")//tai khaon chi Hoa
        {
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update3', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else
        {
            alert("Bạn không có quyền vào đây")
        }
    }
    onClickPheDuyetHalf = (text) => {
        if (ten === "nguyennhuan") { // tai khoan anh Nhuan
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "lephe") { // tai khoan anh Phe
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update1', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "vuson") { // tai khoan chi Hoai
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update2', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else if(ten === "tranhoa")//tai khaon chi Hoa
        {
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update3', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else
        {
            alert("Bạn không có quyền vào đây")
        }
    }
    onClickKhongPheDuyet = (text) => {
        //console.log(text, 'text');
        if (ten === "nguyennhuan") { // tai khoan anh Nhuan
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update4', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "lephe") { // tai khoan anh Phe
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update5', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "vuson") { // tai khoan chi Hoai
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update6', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else if(ten === "tranhoa")//tai khaon chi Hoa
        {
            //console.log(this.state.several, 'several');
            this.state.several.map((value) => {
                if (text === value.id) {
                    //console.log(value, 'value');
                    Request('several/update7', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHopdong(this.state.page)
                            this.getHopdongs(this.state.page)
                            this.getHopdongss(this.state.page)
                        }
                    })
                }
            })
        }
        else
        {
            alert("Bạn không có quyền vào đây")
        }
    }
    onClickKhongPheDuyetHalf = (text) => {
        if (ten === "nguyennhuan") { // tai khoan anh Nhuan
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update4', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "lephe") { // tai khoan anh Phe
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update5', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else if (ten === "vuson") { // tai khoan chi Hoai
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update6', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else if(ten === "tranhoa")//tai khaon chi Hoa
        {
            this.state.half.map((value) => {
                if (text === value.id) {
                    Request('half/update7', 'POST', value).then((response) => {
                        if (response.status === 200 & response.data.success === true) {
                            this.getHalf(this.state.page)
                            this.getHalfs(this.state.page)
                            this.getHalfss(this.state.page)
                        }
                    })
                }
            })
        }
        else
        {
            alert("Bạn không có quyền vào đây")
        }
    }

    onchangpage1 = (page) => {
        this.setState({
            page: page
        })
        this.getHopdongs(page);
    }
    onchangpage2 = (page) => {
        this.setState({
            page: page
        })
        this.getHopdong(page);
    }
    onchangpage3 = (page) => {
        this.setState({
            page: page
        })
        this.getHopdongss(page);
    }
    onchangpage4 = (page) => {
        this.setState({
            page: page
        })
        this.getHalf(page);
    }
    onchangpage5 = (page) => {
        this.setState({
            page: page
        })
        this.getHalfs(page);
    }
    onchangpage6 = (page) => {
        this.setState({
            page: page
        })
        this.getHalfss(page);
    }

    refresh = () => {
        this.getHopdongs(this.state.pageNumber)
    }

    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedId: selectedRowKeys
        });
        if (selectedRowKeys.length > 0) {
            this.setState({
                statebuttondelete: false
            })
        }
        else
            this.setState({
                statebuttondelete: true
            })
        if (selectedRowKeys.length === 1) {
            this.setState({
                statebuttonedit: false,
                rowthotroselected: selectedRows[0]
            })
        }
        else
            this.setState({
                statebuttonedit: true
            })
    }

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.id], [row])
        }
    }

    onHeaderCell = (column) => {
        return {
            onClick: async () => {
                if (this.state.isSort) {
                    await this.setState({
                        sortBy: 'DESC',
                        orderby: 'arrow-down'
                    })
                }
                else {
                    await this.setState({
                        sortBy: 'ASC',
                        orderby: 'arrow-up'
                    })
                }
                this.setState({
                    isSort: !this.state.isSort,
                    index: column.dataIndex
                })
                if (this.state.isSearch === 1) {
                    this.search(this.state.searchText)
                }
                else {
                    this.getHopdongs(this.state.page)
                    this.getHopdongss(this.state.page)
                    this.getHopdong(this.state.page)
                    this.getHalf(this.state.page)
                    this.getHalfs(this.state.page)
                    this.getHalfss(this.state.page)
                }
            },
        };
    }

    render() {
        return (
            <div>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Phê duyệt nghỉ 1 hoặc nhiều ngày" key="1">
                        <Tabs type="card">
                            <TabPane tab="Chờ phê duyệt" key="1">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.several} bordered rowKey="id" 
                                    expandedRowRender={(record, selectedRowKeys) => {
                                        return (
                                            <div style={{ textAlign: 'left' }}>
                                                <div style={{ paddingTop: '10px', fontSize: '18px' }}> Lý do: </div>
                                                <Row style={{ paddingTop: '7px' }}>{this.state.several[selectedRowKeys].reason}</Row>
                                            </div>
                                        )
                                    }}>
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày bắt đầu" dataIndex="day_start" key="day_start" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày kết thúc" dataIndex="day_end" key="day_end" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Lý do" className="hidden-action" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Hành động" dataIndex="id" key='id' render={(text) =>
                                            (<span>
                                                <Tag color="geekblue" onClick={() => this.onClickPheDuyet(text)}>Phê duyệt</Tag>
                                                <Divider type="vertical" />
                                                <Tag color="volcano" onClick={() => this.onClickKhongPheDuyet(text)}>Không phê duyệt</Tag>
                                            </span>)
                                        } />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage1} total={this.state.count1} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                            <TabPane tab="Đã phê duyệt" key="2">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.severals} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày bắt đầu" dataIndex="day_start" key="day_start" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày kết thúc" dataIndex="day_end" key="day_end" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage2} total={this.state.count2} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                            <TabPane tab="Không phê duyệt" key="3">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.severalss} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày bắt đầu" dataIndex="day_start" key="day_start" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày kết thúc" dataIndex="day_end" key="day_end" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage3} total={this.state.count3} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Panel>
                    <Panel header="Phê duyệt nghỉ nửa ngày" key="2">
                        <Tabs type="card">
                            <TabPane tab="Chờ phê duyệt" key="1">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.half} bordered rowKey="id" 
                                   expandedRowRender={(record, selectedRowKeys) => {                                   
                                    return (
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ paddingTop: '10px', fontSize: '18px' }}> Lý do: </div>
                                            <Row style={{ paddingTop: '7px' }}>{this.state.half[selectedRowKeys].reason}</Row>
                                        </div>
                                    )
                                }}>
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày nghỉ" dataIndex="date" key="date" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian nghỉ" dataIndex="day" key="day" onHeaderCell={this.onHeaderCell} 
                                        render={text => {
                                            if(text==="sang")
                                            return "Sáng"
                                            else
                                            return "Chiều"
                                        }}
                                        />
                                        <Column title="Lý do" className="hidden-action" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Hành động" dataIndex="id" key='id' render={(text) =>
                                            (<span>
                                                <Tag color="geekblue" onClick={() => this.onClickPheDuyetHalf(text)}>Phê duyệt</Tag>
                                                <Divider type="vertical" />
                                                <Tag color="volcano" onClick={() => this.onClickKhongPheDuyetHalf(text)}>Không phê duyệt</Tag>
                                            </span>)
                                        } />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage4} total={this.state.count4} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                            <TabPane tab="Đã phê duyệt" key="2">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.halfs} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày nghỉ" dataIndex="date" key="date" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian nghỉ" dataIndex="day" key="day" onHeaderCell={this.onHeaderCell} 
                                        render={text => {
                                            if(text==="sang")
                                            return "Sáng"
                                            else
                                            return "Chiều"
                                        }}
                                        />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage5} total={this.state.count5} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                            <TabPane tab="Không phê duyệt" key="3">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.halfss} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày nghỉ" dataIndex="date" key="date" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian nghỉ" dataIndex="day" key="day" onHeaderCell={this.onHeaderCell} 
                                        render={text => {
                                            if(text==="sang")
                                            return "Sáng"
                                            else
                                            return "Chiều"
                                        }}
                                        />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage6} total={this.state.count6} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Panel>
                </Collapse>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    ...state
})
export default connect(mapStateToProps,
    {
        fetchLoading
    }
)(Approved);
//export default Approved;