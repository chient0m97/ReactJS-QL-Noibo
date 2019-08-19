import React, { Component } from 'react';
import Request from '@apis/Request'
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Card, Form, Col, Row, Icon, Tooltip, DatePicker, Tabs } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { GoFile, GoOrganization, GoCreditCard } from 'react-icons/go';
import { Value } from 'devextreme-react/range-selector';
import { async } from 'q';
var formatDate = require('dateformat')
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

var data = {
    labels: [
        'Nam',
        'Nữ',
        'Giới Tính'
    ],
    datasets: [{
        data: [2, 5, 5],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }],
};

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            nhansu: [],
            page: 1,
            pageSize: 10,
            countNhanSu: 1,
            countKhachHang: 1,
            countDuAn: 1,
            countHopDong: 1,
            sortBy: '',
            index: 'ns_id',
            khachhangs: [],
            dataChartjs: [],
            dataGetFollowMonth: {},
            dataGetFollowMonthBar: {},
            valueMonth: [],
            valueYear: [],
            stateOpenRangePicker: false
        }
    }

    getNhansu = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        Request('nhansu/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then(async (res) => {
                var countGioiTinhNam = 0
                var countGioiTinhNu = 0
                await res.data.data.resGioitinh.forEach(element => {
                    if (element.ns_gioitinh === "Nam") {
                        countGioiTinhNam++
                    }
                    if (element.ns_gioitinh === "Nữ")
                        countGioiTinhNu++
                });
                await this.setState({
                    nhansu: res.data.data.nhansu,
                    countNhanSu: res.data.data.count,
                    dataChartjs: [countGioiTinhNam, countGioiTinhNu, (res.data.data.count - countGioiTinhNam - countGioiTinhNu)]
                })
                data.datasets[0].data = await [countGioiTinhNam, countGioiTinhNu, (res.data.data.count - countGioiTinhNam - countGioiTinhNu)]
            })

        Request('hotro/getkhachhang', 'POST', {}).then((res) => {
            this.setState({
                countKhachHang: res.data.data.khachhangs.length
            })
        })

        Request('hotro/getidduan', 'POST', {}).then(async (res) => {
            await this.setState({
                countDuAn: res.data.data.duans.length
            })
        })

        Request('hopdong/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then(async (response) => {
                await this.setState({
                    countHopDong: Number(response.data.data.count)
                })
            })
    }

    componentDidMount() {
        this.getNhansu(this.state.pageNumber, this.state.index, this.state.sortBy);

    }

    onClick = () => {
        console.log("Hien thi click")
    }

    setValueMonth = (valueMonth) => {
        this.setState({ valueMonth })
    }

    setValueYear = (valueYear) => {
        this.setState({ valueYear })
    }

    getHotroFollowMonth = (monthStart, monthEnd) => {
        Request('hotro/getfollowmonth', 'POST', { monthStart, monthEnd }).then(async (res) => {
            console.log("hien thi res ",res.data.rows)
            var arrayName = []
            var arrayCount = []
            var arrayBackGround = []
            if (res.data.rows === undefined) { return }
            res.data.rows.map((value, index) => {
                arrayName.push(value.ns_hovaten)
                arrayCount.push(value.count)
                arrayBackGround.push(this.getRandomColor())
            })
            var dataFollowMonth = {
                labels: [],
                datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }]
            }

            dataFollowMonth.labels = arrayName
            dataFollowMonth.datasets[0].data = arrayCount
            dataFollowMonth.datasets[0].backgroundColor = arrayBackGround
            dataFollowMonth.datasets[0].hoverBackgroundColor = arrayBackGround
            await this.setState({
                dataGetFollowMonth: dataFollowMonth
            })
            console.log("Hien thi datastate ", this.state.dataGetFollowMonth)
        })
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        return (
            <div>
                <Form>
                    <div style={{ background: '#ECECEC', padding: '20px' }}>
                        <Row>
                            <Col span={6} >
                                <Card bordered={false} style={{ float: 'left', background: 'red' }}>
                                    <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Nhân Sự </span><Tooltip title="Số Lượng Nhân Sự"><Icon style={{ marginLeft: '70px' }} type="info-circle" /></Tooltip>
                                    <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}> <FiUsers />  {this.state.countNhanSu}</span>
                                </Card>
                            </Col>
                            <Col span={6} >
                                <Card bordered={false} style={{ float: 'left', background: 'orange' }}>
                                    <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Khách Hàng </span><Tooltip title="Số Lượng Khách Hàng"><Icon style={{ marginLeft: '33px' }} type="info-circle" /></Tooltip>
                                    <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}> <GoOrganization /> {this.state.countKhachHang}</span>
                                </Card>
                            </Col>
                            <Col span={6} >
                                <Card bordered={false} style={{ float: 'right', background: 'lime' }}>
                                    <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Dự Án </span><Tooltip title="Số Lượng Dự Án"><Icon style={{ marginLeft: '93px' }} type="info-circle" /></Tooltip>
                                    <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}> <GoCreditCard /> {this.state.countDuAn}</span>
                                </Card>
                            </Col>
                            <Col span={6} >
                                <Card bordered={false} style={{ float: 'right', background: 'blue' }}>
                                    <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Hợp Đồng </span><Tooltip title="Số Lượng Hợp Đồng"><Icon style={{ marginLeft: '50px' }} type="info-circle" /></Tooltip>
                                    <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}> <GoFile /> {this.state.countHopDong}</span>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Card bordered={false}>
                                <Col span={9}>
                                    <Tabs>
                                        <TabPane
                                            tab={
                                                <span>Chọn Theo Tháng</span>
                                            }
                                            key="1"
                                        >
                                            <p style={{ fontSize: '14px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu trong Tháng</p>
                                            <RangePicker
                                                placeholder={['Tháng bắt đầu', 'Tháng kết thúc']}
                                                format="YYYY-MM"
                                                mode={['month', 'month']}
                                                onPanelChange={(value, datestring) => {
                                                    this.setValueMonth(value)
                                                    this.getHotroFollowMonth(formatDate(value[0]._d, 'yyyy-mm-01'), formatDate(value[1]._d, 'yyyy-mm-01'))
                                                }}
                                                value={this.state.valueMonth}
                                                separator="-->"
                                            />
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <span>Chọn Theo Năm</span>
                                            }
                                            key="2"
                                        >
                                            <p style={{ fontSize: '14px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu trong Năm</p>
                                            <RangePicker
                                                placeholder={['Năm bắt đầu', 'Năm kết thúc']}
                                                format="YYYY"
                                                mode={['year', 'year']}
                                                separator="-->"
                                                onPanelChange={(value, datestring) => {
                                                    this.setValueYear(value)
                                                }}
                                                value={this.state.valueYear}
                                            />
                                        </TabPane>
                                    </Tabs>

                                </Col>
                                <Col span={15}>
                                    <Tabs style={{ marginLeft: '200px' }}>
                                        <TabPane
                                            tab={
                                                <span>Biểu Đồ Dạng Cột</span>
                                            }
                                            key="4"
                                        >
                                            <div style={{ marginLeft: '20px' }}>
                                                <Bar
                                                    data={this.state.dataGetFollowMonth}
                                                    options={{
                                                        legend: { display: false },
                                                        scales: {
                                                            yAxes: [{
                                                                display: false,
                                                                ticks: {
                                                                    beginAtZero: true,
                                                                    // max: 5
                                                                }
                                                            }],

                                                        },
                                                        title: {
                                                            display: true,
                                                            text: 'Thống kê'
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <span>Biểu Đồ Dạng Tròn</span>
                                            }
                                            key="3"
                                        >
                                            <div style={{ marginLeft: '70px' }}>
                                                <Pie data={this.state.dataGetFollowMonth} />
                                            </div>
                                        </TabPane>

                                    </Tabs>

                                </Col>
                            </Card>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Card bordered={false}>
                                Khach hang
                            </Card>
                        </Row>
                    </div>,
                </Form>
            </div>
        );
    }
}