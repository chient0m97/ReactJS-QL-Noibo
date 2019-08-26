import React, { Component } from 'react';
import Request from '@apis/Request'
import { Pie, Bar, HorizontalBar } from 'react-chartjs-2';
import { Card, Form, Col, Row, Icon, Tooltip, DatePicker, Tabs, Table, Typography, Divider, Button, Statistic, Descriptions } from 'antd';
import cookie from 'react-cookies'
import moment from 'moment';
// import { FiUsers } from 'react-icons/fi';
// import { GoFile, GoOrganization, GoCreditCard } from 'react-icons/go';
import { Value } from 'devextreme-react/range-selector';
import { async } from 'q';
// import { Button } from 'devextreme-react/select-box';
var formatDate = require('dateformat')
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Column } = Table;
const { Text } = Typography;
const ButtonGroup = Button.Group;
const dateFormat = 'YYYY/MM/DD';
var format = require('dateformat')
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
            valueMonth: [moment('2019/01/01', dateFormat), moment('2019/12/01', dateFormat)],
            valueYear: [moment('2018/01/01', dateFormat), moment('2019/12/30', dateFormat)],
            stateOpenRangePicker: false,
            myself: [],
            dataRank: [],
            dataKhachHang: []
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
                if (res.data.data.resGioitinh) {
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
                }
            })

        Request('hotro/getkhachhang', 'POST', {}).then((res) => {
            if (res.data.data.khachhangs) {
                this.setState({
                    countKhachHang: res.data.data.khachhangs.length
                })
            }

        })

        Request('hotro/getidduan', 'POST', {}).then(async (res) => {
            if (res.data.data.duans) {
                await this.setState({
                    countDuAn: res.data.data.duans.length
                })
            }
        })

        var user_cookie = cookie.load('user');

        Request('hotro/getmyself', 'POST', { user_cookie }).then(async (res) => {
            if (res.data.data.myself) {
                await this.setState({
                    myself: res.data.data.myself
                })
            }
        })

        Request('hotro/gethopdong', 'POST', {})
            .then(async (response) => {
                if (response) {
                    await this.setState({
                        countHopDong: Number(response.data.data.hopdongs.length)
                    })
                }

            })
    }

    getDataKhachHang = async (kh_id) => {
        await Request('hotro/getdatakhachhang', 'POST', { kh_id }).then(async (res) => {
            // if (res.data.data.khachhangs) {
            //     await this.setState({
            //         dataKhachHang: res.data.data.khachhangs
            //     })
            // }
        })
    }

    componentDidMount() {
        this.getNhansu(this.state.pageNumber, this.state.index, this.state.sortBy);
        this.getHotroFollowMonth('2019-01-01', '2019-12-30')
        document.getElementsByClassName('ant-statistic-title')[0].style.fontSize = '18px'
        document.getElementsByClassName('ant-statistic-title')[1].style.fontSize = '18px'
        document.getElementsByClassName('ant-statistic-title')[2].style.fontSize = '18px'
        document.getElementsByClassName('ant-statistic-title')[3].style.fontSize = '18px'
    }

    onClick = () => {
        console.log("day la onClick")
    }

    setValueMonth = (valueMonth) => {
        this.setState({ valueMonth })
    }

    setValueYear = (valueYear) => {
        this.setState({ valueYear })
    }

    getHotroFollowMonth = (monthStart, monthEnd) => {
        Request('hotro/getfollowmonth', 'POST', { monthStart, monthEnd }).then(async (res) => {
            var arrayName = []
            var arrayCount = []
            var arrayBackGround = []
            if (res.data.rows === undefined) { return }
            this.setState({
                dataRank: res.data.rows
            })
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
        }).catch((err) => {
            console.log(err)
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

    onChangeTab = (key) => {
        if (key === "1") {
            this.getHotroFollowMonth('2019-01-01', '2019-12-30')
        }
        else
            this.getHotroFollowMonth('2018-01-01', '2019-12-30')
    }

    render() {
        return (
            <div>
                <Form>
                    <div style={{ background: '#ECECEC', padding: '20px' }}>
                        <div id="dasboard-widget-top">
                            {/* <Row gutter={16}>
                                <Col span={6} >
                                    <Card bordered={false} style={{ float: 'left', background: 'red' }}>
                                        <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Nhân Sự </span><Tooltip title="Số Lượng Nhân Sự"><Icon style={{ marginLeft: '70px' }} type="info-circle" /></Tooltip>
                                        <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}>  {this.state.countNhanSu}</span>
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card bordered={false} style={{ float: 'left', background: 'orange' }}>
                                        <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Khách Hàng </span><Tooltip title="Số Lượng Khách Hàng"><Icon style={{ marginLeft: '33px' }} type="info-circle" /></Tooltip>
                                        <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}>  {this.state.countKhachHang}</span>
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card bordered={false} style={{ float: 'right', background: 'brown' }}>
                                        <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Dự Án </span><Tooltip title="Số Lượng Dự Án"><Icon style={{ marginLeft: '93px' }} type="info-circle" /></Tooltip>
                                        <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}>  {this.state.countDuAn}</span>
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card bordered={false} style={{ float: 'right', background: 'blue' }}>
                                        <span style={{ fontSize: '24px', margin: '15px', color: 'white' }}> Hợp Đồng </span><Tooltip title="Số Lượng Hợp Đồng"><Icon style={{ marginLeft: '50px' }} type="info-circle" /></Tooltip>
                                        <span style={{ fontSize: '24px', display: 'block', textAlign: 'center', borderTop: '1px solid #e8e8e8', color: 'white' }}>  {this.state.countHopDong}</span>
                                    </Card>
                                </Col>
                            </Row> */}

                            <Row gutter={16}>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <Statistic
                                            title={
                                                <span>
                                                    Nhân Sự
                                                    <Tooltip title="Số lượng Nhân Sự">
                                                        <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                    </Tooltip>
                                                </span>
                                            }
                                            value={this.state.countNhanSu}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="user" />}
                                            style={{ textAlign: 'center', color: '1890ff' }}
                                            valueStyle={{ fontSize: '30px', color: 'red', borderTop: '1px solid #e8e8e8' }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <Statistic
                                            title={
                                                <span>
                                                    Khách Hàng
                                                        <Tooltip title="Số lượng Khách Hàng">
                                                        <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                    </Tooltip>
                                                </span>
                                            }
                                            value={this.state.countKhachHang}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="team" />}
                                            style={{ textAlign: 'center' }}
                                            valueStyle={{ fontSize: '30px', color: 'orange', borderTop: '1px solid #e8e8e8' }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <Statistic
                                            title={
                                                <span>
                                                    Dự Án
                                                        <Tooltip title="Số lượng Dự Án">
                                                        <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                    </Tooltip>
                                                </span>
                                            }
                                            value={this.state.countDuAn}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="project" />}
                                            style={{ textAlign: 'center' }}
                                            valueStyle={{ fontSize: '30px', color: 'brown', borderTop: '1px solid #e8e8e8' }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <Statistic
                                            title={
                                                <span>
                                                    Hợp Đồng
                                                        <Tooltip title="Số lượng Hợp Đồng">
                                                        <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                    </Tooltip>
                                                </span>
                                            }
                                            value={this.state.countHopDong}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="file-text" />}
                                            style={{ textAlign: 'center' }}
                                            valueStyle={{ fontSize: '30px', color: 'lime', borderTop: '1px solid #e8e8e8' }}
                                        />
                                    </Card>
                                </Col>
                            </Row>

                        </div>
                        <Row style={{ marginTop: '15px' }}>
                            <Card>
                                {/* <h1 style={{ textAlign: 'center' }}> Bảng công việc cá nhân</h1> */}
                                <Text mark style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>Bảng công việc cá nhân</Text>
                                <Divider style={{ margin: '5px' }} />
                                <Row>
                                    <span style={{ fontSize: '16px' }}> Loại công việc      </span>
                                    <ButtonGroup style={{ marginBottom: '5px', marginLeft: '15px' }}>
                                        <Button >Tất cả</Button>
                                        <Button >Gấp</Button>
                                        <Button >Đã xong</Button>
                                        <Button >Đang xử lý</Button>
                                    </ButtonGroup>
                                </Row>
                                <Table bordered dataSource={this.state.myself} rowKey="ht_id" size="small" scroll={{ x: 500 }}
                                    // expandedRowRender={(record, selectedRowKeys) => {
                                    //     console.log("ex", record.kh_id)
                                    //     let kh_id = record.kh_id
                                    //     var dataKH=[]
                                    //     Request('hotro/getdatakhachhang', 'POST', { kh_id }).then( (res) => {
                                    //         dataKH=res.data.data.khachhangs[0]
                                            
                                    //     })
                                    //     console.log("day la datakh ",dataKH)
                                    //     return <div>
                                    //         <Descriptions title="Thông tin khách hàng">

                                    //             <Descriptions.Item label="Tên khách hàng"> {dataKH.kh_ten} </Descriptions.Item>
                                    //             <Descriptions.Item label="Tỉnh/ TP"> Tỉnh </Descriptions.Item>
                                    //             <Descriptions.Item label="Huyện/ Quận"> Huyện </Descriptions.Item>
                                    //             <Descriptions.Item label="Xã/ Phường"> Xã </Descriptions.Item>
                                    //             <Descriptions.Item label="Địa chỉ"> Địa chỉ </Descriptions.Item>
                                    //             <Descriptions.Item label="Đơn vị"> Đơn vị </Descriptions.Item>
                                    //             <Descriptions.Item label="Đơn vị công tác"> Đơn vị công tác </Descriptions.Item>
                                    //             <Descriptions.Item label="Liên lạc"> Liên lạc </Descriptions.Item>
                                    //         </Descriptions>
                                    //     </div>
                                    // }}
                                >
                                    <Column title="Dự án" dataIndex="dm_duan_ten" width={150} />
                                    <Column title="Khách hàng" dataIndex="kh_ten" width={100} />
                                    <Column title="Người tạo" dataIndex="ns_hoten" width={150} />
                                    <Column title="Người được giao" dataIndex="ns_hovaten" width={150} />
                                    <Column title="Trạng thái" dataIndex="ht_trangthai" width={100}
                                        render={
                                            text => {
                                                if (text === 'tiepnhan') { return "Tiếp nhận" }
                                                if (text === 'dangxuly') { return "Đang xử lý" }
                                                if (text === 'dangxem') { return "Đang xem" }
                                                return "Đã xong"
                                            }
                                        }
                                    />
                                    <Column title="Phân loại" dataIndex="ht_phanloai" width={70} />
                                    <Column title="Ưu tiên" dataIndex="ht_uutien" />
                                    <Column title="Thời gian tiếp nhận" dataIndex="ht_thoigiantiepnhan" width={150}
                                        render={text => {
                                            return format(text, "dd/mm/yyyy")
                                        }}
                                    />
                                    <Column title="Thời gian dự kiến hoàn thành" dataIndex="ht_thoigian_dukien_hoanthanh" width={150}
                                        render={text => {
                                            return format(text, "dd/mm/yyyy")
                                        }}
                                    />
                                    <Column title="Thời gian hoàn thành" dataIndex="ht_thoigian_hoanthanh" width={150}
                                        render={text => {
                                            return format(text, "dd/mm/yyyy")
                                        }}
                                    />
                                </Table>
                            </Card>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Card >
                                {/* <h1 >Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu trong Tháng</h1> */}
                                <Text mark style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu theo Tháng, Năm</Text>
                                <Divider style={{ margin: '5px' }} />
                                <Row>
                                    <Col span={12}>
                                        <Tabs onChange={this.onChangeTab} size={'small'} style={{ padding: '5px' }}>
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px' }}>Chọn Theo Tháng</span>
                                                }
                                                key="1"
                                            >
                                                <p style={{ fontSize: '14px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu theo Tháng</p>
                                                <RangePicker
                                                    placeholder={['Tháng bắt đầu', 'Tháng kết thúc']}
                                                    format="YYYY-MM"
                                                    mode={['month', 'month']}
                                                    onPanelChange={(value, datestring) => {
                                                        this.setValueMonth(value)
                                                        this.getHotroFollowMonth(formatDate(value[0]._d, 'yyyy-mm-01'), formatDate(value[1]._d, 'yyyy-mm-30'))
                                                    }}
                                                    value={this.state.valueMonth}
                                                    separator="Đến"
                                                />
                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px' }}>Chọn Theo Năm</span>
                                                }
                                                key="2"
                                            >
                                                <p style={{ fontSize: '14px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu theo Năm</p>
                                                <RangePicker
                                                    placeholder={['Năm bắt đầu', 'Năm kết thúc']}
                                                    format="YYYY"
                                                    mode={['year', 'year']}
                                                    separator="Đến"
                                                    onPanelChange={(value, datestring) => {
                                                        this.setValueYear(value)
                                                        this.getHotroFollowMonth(formatDate(value[0]._d, 'yyyy-01-01'), formatDate(value[1]._d, 'yyyy-12-30'))
                                                    }}
                                                    value={this.state.valueYear}
                                                />
                                            </TabPane>
                                        </Tabs>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={15}>
                                        <Tabs >
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px', margin: '5px' }}>Biểu Đồ Cột <Icon type="bar-chart" /></span>
                                                }
                                                key="4"
                                                id="tabs1"
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
                                                    <span style={{ fontSize: '16px' }}>Biểu Đồ Tròn <Icon type="pie-chart" /></span>
                                                }
                                                key="3"
                                            >
                                                <div style={{ marginLeft: '70px' }}>
                                                    <Pie
                                                        data={this.state.dataGetFollowMonth}
                                                        options={{
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
                                                    <span style={{ fontSize: '16px' }}>Biểu Đồ Ngang <Icon type="bar-chart" style={{ transform: 'rotate(90deg)' }} /></span>
                                                }
                                                key="5"
                                            >
                                                <HorizontalBar
                                                    data={this.state.dataGetFollowMonth}
                                                    options={{
                                                        legend: { display: false }
                                                    }}
                                                />
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <Table style={{ margin: '5px' }} title={() => 'Thông tin chi tiết'} dataSource={this.state.dataRank} rowKey="ns_hovaten" size="small" style={{ marginTop: '45px' }} >
                                            <Column title="Tên" dataIndex="ns_hovaten" />
                                            <Column title="Số CV hoàn thành" dataIndex="count" />
                                        </Table>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}