import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import Modal_Khachhangs from '@pages/Modal/Modal_Khachhangs.js';
import cookie from 'react-cookies'
import '@styles/style.css'
const { Column } = Table;
const { Option } = Select
const { TextArea } = Input;
var format = require('dateformat')

var g = "9298eb00-a6d9-11e9-bd04-0986e022adbf"
const FormModal = Form.create({ name: 'from_in_modal' })(
    class extends React.Component {
        clear = e => {
            console.log(e);
        }

        onChange = () => {
            console.log("hien thi change button")
        };

        onDateChange = value => {
            this.onChange('dateValue', value);
        }

        handleOpenChange = open => {
            if (!open) {
                this.setState({ dateOpen: true })
            }
        }

        handleChange = async (value) => {
            g = ''
            if (value === "9298eb00-a6d9-11e9-bd04-0986e022adbf") {
                this.props.trangthaibutton = false
            }
        }
        render() {
            var formatDateHMS = require('dateformat')
            var id_duan = this.props.setidduan;
            var nhansu = this.props.setNhansu;
            var khachhang = this.props.setKhachHang;
            var first_kh_id = null;
            var first_da_id = null;
            var first_ns_id = null;
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, onTodoChange, assignme, trangthaibutton, changeButton } = this.props;
            const { getFieldDecorator } = form;
            if (khachhang.length !== 0) {
                first_kh_id = khachhang[0].kh_id
            }
            if (id_duan.length !== 0) {
                first_da_id = id_duan[0].dm_duan_id
            }
            if (nhansu.length !== 0) {
                first_ns_id = nhansu[0].ns_id
            }
            var user_cookie = cookie.load('user');
            return (
                <Modal
                    centered
                    visible={visible}
                    title={title}
                    okText="Lưu lại"
                    onCancel={onCancel}
                    onOk={onSave}
                    confirmLoading={confirmLoading}
                    width={'60%'}
                >
                    <Form layout={formtype} >
                        <Row gutter={24} align="middle">
                            <Col span={8}>
                                <div style={{ position: 'absolute', top: '2px', right: '95px', zIndex: '99999' }}>
                                    <Button size="small" onClick={assignme} disabled={trangthaibutton}> <Icon type="user" /> Tôi &emsp;</Button>
                                </div>
                                <Form.Item label="Gán cho">
                                    {getFieldDecorator('ns_id_ass', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: first_ns_id
                                    })(<Select
                                        size={"small"}
                                        onChange={changeButton}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            nhansu.map((value, index) => {
                                                return (<Option value={value.ns_id}>{value.ns_hovaten}</Option>)
                                            })
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8} >
                                <Form.Item label="Dự án">
                                    {getFieldDecorator('dm_duan_id', {
                                        rules: [{ required: true, message: 'Trường không được để trống', }], initialValue: first_da_id
                                    })(<Select

                                        size={"small"}
                                        onChange={this.handleChange}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            id_duan.map((value, index) => {
                                                return (<Option value={value.dm_duan_id}> {value.dm_duan_ten} </Option>)
                                            })
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Ưu tiên">
                                    {getFieldDecorator('ht_uutien', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "TB"
                                    })(<Select
                                        size={"small"}
                                        onChange={this.handleChange}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="GAP"> <Icon type="double-right" style={{ transform: 'rotate(-90deg)', color: 'red' }} /> &ensp; Gấp </Option>
                                        <Option value="CAO"> <Icon type="up" style={{ color: 'orange' }} /> &ensp; Cao</Option>
                                        <Option value="TB"> <Icon type="pause" style={{ transform: 'rotate(-90deg)', color: 'gold' }} /> &ensp; Trung Bình</Option>
                                        <Option value="THAP"> <Icon type="down" style={{ color: 'lime' }} /> &ensp; Thấp</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={12}>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item  >
                                        {getFieldDecorator('ht_id')(<Input type="text" hidden />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={8}>
                                <Form.Item label="Khách hàng">
                                    {getFieldDecorator('kh_id', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: first_kh_id
                                    })(<Select
                                        size={"small"}
                                        // onChange={this.handleChange}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            khachhang.map((value, index) => {
                                                return (<Option value={value.kh_id}>{value.kh_ten}</Option>)
                                            })
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Trạng thái">
                                    {getFieldDecorator('ht_trangthai', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "dangxuly"
                                    })(<Select
                                        onChange={onTodoChange}
                                        size={"small"}

                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="tiepnhan">Tiếp nhận</Option>
                                        <Option value="dangxuly">Đang xử lý</Option>
                                        <Option value="dangxem">Đang xem</Option>
                                        <Option value="daxong">Đã xong</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Phân loại">
                                    {getFieldDecorator('ht_phanloai', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "new"
                                    })(<Select

                                        size={"small"}
                                        onChange={this.handleChange}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="bug">Lỗi</Option>
                                        <Option value="new">Chức năng/ Việc mới</Option>
                                        <Option value="tl">Chức năng/ Việc tương lai</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="Người tạo">
                                    {getFieldDecorator('ns_id_nguoitao', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }]
                                    })(<Tag>&ensp;<Icon type="user" /> &emsp;&emsp; {user_cookie} &emsp;&emsp;&emsp;&ensp;</Tag>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Thời gian tiếp nhận">
                                    {getFieldDecorator('ht_thoigiantiepnhan', {
                                        rules: [{}],
                                    })(<Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="TG dự kiến hoàn thành">
                                    {getFieldDecorator('ht_thoigian_dukien_hoanthanh', {
                                        rules: [{}],
                                    })(<Input type="date" size={"small"} min={format(new Date(), "yyyy-mm-dd")} disabled={this.props.trangthai} style={{ paddingLeft: 35, paddingTop: 4 }} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Thời gian hoàn thành" >
                                    {getFieldDecorator('ht_thoigian_hoanthanh', {
                                        rules: [{}],
                                    })(<Tag > <Icon type="clock-circle" /> {this.props.date} </Tag>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={24}>
                                <Form.Item label="Nội dung yêu cầu">
                                    {getFieldDecorator('ht_noidungyeucau', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }],
                                    })(<TextArea type="text" size={"small"} style={{ Height: 20 }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={24}>
                                <Form.Item label="Ghi chú">
                                    {getFieldDecorator('ht_ghichu', {
                                        rules: [{}],
                                    })(<TextArea type="text" size={"small"} style={{ Height: 20 }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    }
)
var formatDateModal = require('dateformat');
var array_ht_trangthai = []
class Hotro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotro: [],
            id_duanfilltable: [],
            id_duanfillmodal: [],
            nhansu: [],
            khachhang: [],
            pageNumber: 1,
            page: 1,
            pageSize: 10,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Hỗ Trợ',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            searchText: '',
            columnSearch: 'ht_uutien',
            isSort: true,
            sortBy: '',
            index: 'ht_id',
            orderby: 'arrow-up',
            date: null,
            trangthaibutton: false,
            selectedId: [],
            statebuttonedit: true,
            statebuttondelete: true,
            stateconfirmdelete: false,
            rowthotroselected: {},
            visible_kh: false,
            khachhangs: [],
            selectedrow: [],
            selectedRowKeys: [],
        }
    }

    set_Select_id_duan() {
        Request('hotro/getidduan', 'POST', {}).then((res) => {
            this.setState({
                id_duanfillmodal: res.data.data.duans
            })
        })
    }

    set_Select_NhanSu() {
        Request('hotro/getnhansu', 'POST', {}).then((res) => {
            this.setState({
                nhansu: res.data.data.nhansu
            })
        })
    }

    set_Select_KhachHang() {
        Request('hotro/getkhachhang', 'POST', {}).then((res) => {
            this.setState({
                khachhang: res.data.data.khachhangs
            })
        })
    }

    getHotro = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('hotro/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {
                console.log("Read res ", res)
                this.setState({
                    hotro: res.data.data.hotros,
                    count: res.data.data.count
                })
                this.props.fetchLoading({
                    loading: false
                })
                var array_duan = []
                array_ht_trangthai = []
                res.data.data.hotros.map((data, index) => {
                    array_duan.push({ name: data.dm_duan_ten, id: data.dm_duan_id })
                    array_ht_trangthai.push(data.ht_trangthai)
                })
                this.setState({
                    id_duanfilltable: array_duan
                })
            })
        let user_cookie = cookie.load('user');
    }

    getkhachhang = () => {
        Request('hotro/getkhachhang', 'POST', {}).then((res) => {
            this.setState({
                khachhangs: res.data.data.khachhangs
            })
        })
    }

    insertOrUpdate = async () => {
        const { form } = await this.formRef.props;

        await form.validateFields((err, values) => {
            if (err) {
                return
            }

            var url = this.state.action === 'insert' ? 'hotro/insert' : 'hotro/update'
            this.setState({
                rowthotroselected: values
            })
            if (url === 'hotro/update') {
                let user_cookie = cookie.load('user');
                values.ns_id_capnhat = user_cookie
                values.nkht_thoigiancapnhat = new Date()
            }
            if (values.ht_thoigian_dukien_hoanthanh === null) {
                values.ht_thoigian_dukien_hoanthanh = null
            }
            Request(url, 'POST', values)
                .then(async (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visible: false,
                            message: response.data.message
                        })
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thanh Cong'

                    console.log("check response ", response.data.success)
                    if (await !!!response.data.success) {
                        message = 'Co loi xay ra !'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    await notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getHotro(this.state.page)
                    this.render()
                })
        })
    }

    deleteHotro = (ht_id) => {
        Request(`hotro/delete`, 'DELETE', { ht_id: ht_id })
            .then((res) => {
                ht_id.map((values, index) => {
                    arraydelete.push(values)
                })
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thong Bao',
                    description: res.data.message
                });
                this.getHotro(this.state.page)
                this.setState({
                    stateconfirmdelete: false,
                    statebuttondelete: true,
                    statebuttonedit: true,
                    selectedRowKeys: []
                })
                this.render()
            })
    }

    refresh = async (pageNumber) => {
        message.success('Refresh success', 1);
        await this.getHotro(this.state.pageNumber)
    }

    async componentDidMount() {
        await this.getHotro(this.state.pageNumber, this.state.index, this.state.sortBy);
        document.getElementsByClassName('ant-table-expand-icon-th')[0].innerHTML = 'Yêu cầu / Ghi chú'
        document.getElementsByClassName('ant-table-expand-icon-th')[0].style.width='85px'
        document.getElementsByClassName('ant-table-expand-icon-th')[0].style.display='block'
    }

    onchangpage = (page) => {
        this.setState({
            page: page
        })
        this.getHotro(page);
        if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getHotro(page)
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
                array_ht_trangthai = []
                this.getHotro(this.state.page)
            },

        };
    }

    showModal = async (hotro) => {
        this.setState({
            action: 'insert'
        })
        if (hotro.ht_trangthai === "daxong") {
            this.setState({
                trangthai: true,
                date: formatDateModal(hotro.ht_thoigian_hoanthanh, "dd / mm / yyyy -- HH : MM : ss")
            })
        }
        else
            this.setState({
                trangthai: false,
                date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</a>
            })
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });

        await form.resetFields();
        let user_cookie = cookie.load('user');
        form.setFieldsValue({ ns_id_nguoitao: user_cookie })
        form.setFieldsValue({ ht_thoigiantiepnhan: formatDateModal(new Date(), "yyyy-mm-dd") });
        if (hotro.ht_id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update'
            })
            form.setFieldsValue(hotro);
            if (hotro.ht_thoigian_dukien_hoanthanh !== null) {
                form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: formatDateModal(hotro.ht_thoigian_dukien_hoanthanh, "yyyy-mm-dd") })
            }
        }
        this.set_Select_id_duan();
        this.set_Select_NhanSu();
        this.set_Select_KhachHang();
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            id_visible: false
        });
    };

    handleCancelModalKhachhang = e => {
        this.setState({
            visible_kh: false
        })
    }

    handleChangeInput = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleCount = () => {
        let count = this.state.count;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => {
        message.success('Bấm yes để xác nhận');
    }

    cancel = (e) => {
        this.setState({
            stateconfirmdelete: false
        })
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    onChange = async (value) => {
        await this.setState({
            columnSearch: value,
        })
        if (this.state.searchText) {
            this.search(this.state.searchText);
        }
    }

    onTodoChange = async (value) => {
        const { form } = this.formRef.props
        if (value === "daxong") {
            await this.setState({
                date: formatDateModal(new Date(), "dd / mm / yyyy -- HH : MM : ss"),
                trangthai: true
            })
            form.setFieldsValue({ ht_thoigian_hoanthanh: formatDateModal(new Date(), "yyyy-mm-dd") })
            form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: formatDateModal(new Date(), "yyyy-mm-dd") })
        }
        else {
            await this.setState({
                date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</a>,
                trangthai: false
            })
            form.setFieldsValue({ ht_thoigian_hoanthanh: null })
        }
    }

    Assignme = () => {
        const { form } = this.formRef.props
        form.setFieldsValue({ ns_id_ass: user_cookie })
        this.setState({
            trangthaibutton: true
        })
    }

    changeButton = (value) => {
        if (value !== "9298eb00-a6d9-11e9-bd04-0986e022adbf")
            this.setState({
                trangthaibutton: false
            })
        else
            this.setState({
                trangthaibutton: true
            })
    }

    convertDateToInt = (date) => {
        return formatDateModal(date, 'yyyymmdd')
    }

    checkDate = (check, text, j) => {
        j = j - 1
        // if (array_ht_trangthai[(this.state.page - 1) * 10 + j] === "daxong") {
        if (array_ht_trangthai[j] === "daxong") {
            return <a style={{ color: 'brown' }}>{text}</a>
        }
        if (check === 1)
            return <a style={{ color: 'red' }} >{text}</a>
        return <span >{text}</span>
    }

    checkDateConvert = (x) => {
        var y = 0
        y = ((format(x, "mm") - format(new Date(), "mm")) * 30) + (format(x, "dd") - format(new Date(), "dd"))
        return y
    }

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
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
    };

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.ht_id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.ht_id], [row])
        }
    }

    render() {
        var i = 0
        var j = 0
        var formatDate = require('dateformat')
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
            onHeaderCell: this.click
        };

        return (
            <div>
                <Form>
                    <Card >
                        <Row >
                            <Col span={2}>
                                <Tooltip title="Thêm Hỗ Trợ">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                        <Icon type="user-add" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Sửa Hỗ Trợ">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                                        <Icon type="edit" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Xóa Hỗ Trợ">
                                    <Popconfirm
                                        title="Bạn chắc chắn muốn xóa?"
                                        onConfirm={this.deleteHotro.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                        visible={this.state.stateconfirmdelete}
                                    >
                                        <Button shape="round" type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '18px' }} onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
                        <Table rowSelection={rowSelection}
                         onRowClick={this.onRowClick}
                          pagination={false} 
                          dataSource={this.state.hotro}
                           rowKey="ht_id" bordered scroll={{ x: 1000 }}
                            expandedRowRender={(record, selectedRowKeys) => {
                                return (
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '18px' }}> Yêu cầu: </div>
                                        <Row style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1200' }} >{this.state.hotro[selectedRowKeys].ht_noidungyeucau}</Row>
                                        <div style={{ paddingTop: '10px', fontSize: '18px' }}> Ghi chú: </div>
                                        <Row style={{ paddingTop: '7px' }}>{this.state.hotro[selectedRowKeys].ht_ghichu}</Row>
                                    </div>
                                )
                            }}>
                            <Column dataIndex="ht_thoigian_dukien_hoanthanh" align='center' className="hidden-action" width={150}
                                render={
                                    text => {
                                        j++
                                        // console.log("Hien thi array trang thai ", array_ht_trangthai[(this.state.page - 1) * 10 + j - 1])
                                        // if (array_ht_trangthai[(this.state.page - 1) * 10 + j - 1] === "daxong") {
                                        if (array_ht_trangthai[j - 1] === "daxong") {
                                            return <Badge color={"brown"} />
                                        }
                                        if (this.checkDateConvert(text) <= 1) {
                                            i = 1
                                            return <Badge color={"red"} />
                                        }
                                        else {
                                            i = 0
                                            return <Badge color={"green"} />
                                        }
                                    }}
                            />
                            <Column title="Dự án" dataIndex="dm_duan_ten" width={150}
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Khách hàng" dataIndex="kh_ten" width={100}
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                width={150} onHeaderCell={this.onHeaderCell} />
                            <Column title="Người tạo" dataIndex="ns_hoten"
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                width={150} onHeaderCell={this.onHeaderCell} />
                            <Column title="Người được giao" dataIndex="ns_hovaten"
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                width={150} onHeaderCell={this.onHeaderCell} />
                            <Column title="Trạng thái" dataIndex="ht_trangthai" width={150}
                                render={
                                    text => {
                                        if (text === 'tiepnhan') { return this.checkDate(i, "Tiếp nhận", j) }
                                        if (text === 'dangxuly') { return this.checkDate(i, "Đang xử lý", j) }
                                        if (text === 'dangxem') { return this.checkDate(i, "Đang xem", j) }
                                        return this.checkDate(i, "Đã xong", j)
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Phân loại" dataIndex="ht_phanloai" width={150}
                                render={text => {
                                    if (text === 'bug') { return this.checkDate(i, "Lỗi", j) }
                                    if (text === 'new') {
                                        return this.checkDate(i, "Việc mới", j)
                                    }
                                    return this.checkDate(i, this.checkDate(i, "Việc tương lai", j))
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Ưu tiên" dataIndex="ht_uutien"
                                width={150}
                                align='left'
                                render={text => {
                                    if (text === 'GAP') { return <span> <Icon type="double-right" style={{ transform: 'rotate(-90deg)', color: 'red' }} /> &nbsp; {this.checkDate(i, "Gấp", j)} </span> }
                                    if (text === 'CAO') { return <span> <Icon type="up" style={{ color: 'orange' }} /> &nbsp; {this.checkDate(i, "Cao", j)} </span> }
                                    if (text === 'TB') { return <span> <Icon type="pause" style={{ transform: 'rotate(-90deg)', color: 'gold' }} /> &nbsp; {this.checkDate(i, "Trung bình", j)}</span> }
                                    return <span> <Icon type="down" style={{ color: 'lime' }} /> &nbsp; {this.checkDate(i, "Thấp", j)} </span>
                                }}
                            />
                            <Column title="Thời gian tiếp nhận" dataIndex="ht_thoigiantiepnhan" width={150}
                                render={text => {
                                    return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian dự kiến hoàn thành" dataIndex="ht_thoigian_dukien_hoanthanh" width={150}
                                render={text => {
                                    if (text === null) { return '' }
                                    return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian hoàn thành" dataIndex="ht_thoigian_hoanthanh" width={100}
                                render={text => {
                                    if (text === null) { return '' }
                                    return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} style={{ marginTop: 10 }} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
                    <FormModal
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        title={this.state.title}
                        formtype={this.state.formtype}
                        id_visible={this.state.id_visible}
                        setidduan={this.state.id_duanfillmodal}
                        setNhansu={this.state.nhansu}
                        setKhachHang={this.state.khachhang}
                        onTodoChange={this.onTodoChange}
                        date={this.state.date}
                        trangthai={this.state.trangthai}
                        assignme={this.Assignme}
                        trangthaibutton={this.state.trangthaibutton}
                        changeButton={this.changeButton}
                    />
                    <Modal_Khachhangs
                        title="Thêm Khách Hàng"
                        visible={true}
                        visible_kh={this.state.visible_kh}
                        onCancel={this.handleCancelModalKhachhang}
                        formtype={this.state.formtype}
                    />
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchUser,
        fetchLoading
    }
)(Hotro);