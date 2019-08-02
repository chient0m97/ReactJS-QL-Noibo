import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import '@styles/style.css'
import { Height } from 'devextreme-react/range-selector';
import { async } from 'q';
const { Column } = Table;
const { Option } = Select
const { Search, TextArea } = Input;

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
            console.log("hien thi gia tri value ", value)
            if (value === "9298eb00-a6d9-11e9-bd04-0986e022adbf") {
                this.props.trangthaibutton = false
            }
        }
        render() {
            var formatDateHMS = require('dateformat')
            var id_duan = this.props.setidduan;
            var nhansu = this.props.setNhansu;
            var khachhang = this.props.setKhachHang;
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, onTodoChange, assignme, trangthaibutton, changeButton } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
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
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "9298eb00-a6d9-11e9-bd04-0986e022adbf"
                                    })(<Select
                                        size={"small"}
                                        onChange={changeButton}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="9298eb00-a6d9-11e9-bd04-0986e022adbf" > <Icon type="user" /> &nbsp;&nbsp;&nbsp; Assignd to Me</Option>
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
                                        rules: [{ required: true, message: 'Trường không được để trống', }], initialValue: "eb7d059c-b36f-481a-9ad3-0a7c593bbedc"
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
                                        <Option value="GAP"><Badge color={"red"} />  Gấp</Option>
                                        <Option value="CAO"><Badge color={"orange"} />  Cao</Option>
                                        <Option value="TB"><Badge color={"gold"} />  Trung Bình</Option>
                                        <Option value="THAP"><Badge color={"lime"} />  Thấp</Option>
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
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "KH000001"
                                    })(<Select
                                        size={"small"}
                                        onChange={this.handleChange}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            khachhang.map((value, index) => {
                                                return (<Option value={value.kh_id}>{value.kh_hovaten}</Option>)
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
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "9298eb00-a6d9-11e9-bd04-0986e022adbf"
                                    })(<Tag>&ensp;<Icon type="user" /> &emsp;&emsp; Tạ Văn Toàn &emsp;&emsp;&emsp;&ensp;</Tag>)}
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
                                    })(<Input type="date" size={"small"} min={format(new Date(), "yyyy-mm-dd")} disabled={this.props.trangthai} />)}
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
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
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
            trangthaiinput: false,
            trangthaibutton: false,
            colorcolumn: 'yellow',
            selectedId: [],
            statebuttonedit: true,
            statebuttondelete: true,
            stateconfirmdelete: false,
            rowthotroselected: {}
        }
    }

    set_Select_id_duan() {
        Request('hotro/getidduan', 'POST', {}).then((res) => {
            this.setState({
                id_duanfillmodal: res.data.data.hotros
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
                this.setState({
                    hotro: res.data.data.hotros,
                    count: res.data.data.count
                })
                this.props.fetchLoading({
                    loading: false
                })
                var array_duan = []
                res.data.data.hotros.map((data, index) => {
                    array_duan.push({ name: data.dm_duan_ten, id: data.dm_duan_id })
                    array_ht_trangthai.push(data.ht_trangthai)
                })
                this.setState({
                    id_duanfilltable: array_duan
                })
            })
    }

    insertOrUpdate = async () => {
        const { form } = await this.formRef.props;
        await form.validateFields((err, values) => {
            console.log("trong validatefields ", values)
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'hotro/insert' : 'hotro/update'
            console.log('url is: ', url)
            if (values.ht_thoigian_dukien_hoanthanh === "")
                values.ht_thoigian_dukien_hoanthanh = null
            Request(url, 'POST', values)
                .then((response) => {
                    console.log("hien thi gia tri values ", values)
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

                    console.log("check response ", response.data.message)
                    if (!!!response.data.success) {
                        message = 'Co loi xay ra !'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getHotro(this.state.page)
                    window.location.reload()
                })
        })
    }

    deleteHotro = (ht_id) => {
        console.log("day la delete")
        Request(`hotro/delete`, 'DELETE', { ht_id: ht_id })
            .then((res) => {
                console.log("log res ", res)
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thong Bao',
                    description: res.data.message
                });
                this.getHotro(this.state.page)
                console.log("Hien thi state confirm ",this.state.statebuttondelete)
            })
    }

    refresh = async (pageNumber) => {

        await this.getHotro(this.state.pageNumber)
        console.log(this.state.hotro, 'asdasdasdasdasdasdasd')
    }

    componentDidMount() {
        this.getHotro(this.state.pageNumber, this.state.index, this.state.sortBy);
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
        console.log("hien thi gia tri truyen vao ", hotro)
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
                // date: null
                date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</a>
            })
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        form.setFieldsValue({ ht_thoigiantiepnhan: formatDateModal(new Date(), "yyyy-mm-dd") });
        if (hotro.ht_id !== undefined) {
            console.log("day la update")
            this.setState({
                id_visible: true,
                action: 'update'
            })
            // hotro.ht_thoigiantiepnhan = formatDateModal(new Date(), "yyyy-mm-dd")
            // hotro.ht_thoigiantiepnhan = formatDateModal(hotro.ht_thoigiantiepnhan, "yyyy-mm-dd")
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

    handleChangeInput = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        console.log('Change ')
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
        console.log(e);
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
        console.log(value, 'value change')
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
        await console.log('Hien thi thoi gian hoan thanh ', this.state.date)
    }

    Assignme = () => {
        const { form } = this.formRef.props
        form.setFieldsValue({ ns_id_ass: '9298eb00-a6d9-11e9-bd04-0986e022adbf' })
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
        if (array_ht_trangthai[(this.state.page - 1) * 10 + j] === "daxong") {
            return <a style={{ color: 'brown' }}>{text}</a>
        }
        if (check === 1)
            return <a style={{ color: 'red' }}>{text}</a>
        return <span>{text}</span>
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

    render() {
        var i = 0
        var j = 0
        var formatDate = require('dateformat')

        const rowSelection = {
            hideDefaultSelections: true,
            fixed: 'left',
            onChange: async (selectedRowKeys, selectedRows) => {
                var arrayselected = []
                arrayselected.push(selectedRowKeys)
                if (selectedRowKeys.length > 0) {
                    await this.setState({
                        statebuttondelete: false
                    })
                }
                else
                    await this.setState({
                        statebuttondelete: true
                    })
                if (selectedRowKeys.length === 1) {
                    await this.setState({
                        statebuttonedit: false,
                        rowthotroselected: selectedRows[0]
                    })
                    await console.log("hien thi object selectrow ", selectedRows[0])
                    await console.log("hien thi object rowselect ", this.state.rowthotroselected)
                }
                else
                    this.setState({
                        statebuttonedit: true
                    })
                await this.setState({
                    selectedId: arrayselected[0]
                })
            },

            getCheckboxProps: record => ({
                disabled: Column.title === 'Id', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div>
                <Form>
                    <Card>
                    <Row >
                        <Col span={2}>
                            <Tooltip title="Thêm Hỗ Trợ">
                                <Button shape="circle" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                    <Icon type="user-add" />
                                </Button>
                            </Tooltip>
                        </Col>
                        <Col span={2}>
                            <Tooltip title="Sửa Hỗ Trợ">
                                <Button type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
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
                                    // visible={false}
                                    >
                                    <Button type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                        <Icon type="delete" />
                                    </Button>
                                </Popconfirm>
                            </Tooltip>
                        </Col>
                        <Col span={2}>
                            <Tooltip title="Tải Lại">
                                <Button shape="circle" type="primary" size="default" style={{ marginLeft: '18px' }} onClick={this.refresh.bind(null)}>
                                    <Icon type="reload" />
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
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
                        <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.hotro} rowKey="ht_id"  bordered scroll={{ x: 1000 }} >
                            <Column dataIndex="ht_thoigian_dukien_hoanthanh" align='center'  
                                render={
                                    text => {
                                        j++
                                        if (array_ht_trangthai[(this.state.page - 1) * 10 + j - 1] === "daxong") {
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
                            <Column title="Dự án" dataIndex="dm_duan_ten" width={100}
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Khách hàng" dataIndex="ns_hovaten"
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                width={150} onHeaderCell={this.onHeaderCell} />
                            <Column title="Người được giao" dataIndex="kh_hovaten"
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                width={150} onHeaderCell={this.onHeaderCell} />
                            <Column title="Trạng thái" dataIndex="ht_trangthai" width={100}
                                render={
                                    text => {
                                        if (text === 'tiepnhan') { return this.checkDate(i, "Tiếp nhận", j) }
                                        if (text === 'dangxuly') { return this.checkDate(i, "Đang xử lý", j) }
                                        if (text === 'dangxem') { return this.checkDate(i, "Đang xem", j) }
                                        return this.checkDate(i, "Đã xong", j)
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Phân loại" dataIndex="ht_phanloai" width={100}
                                render={text => {
                                    if (text === 'bug') { return this.checkDate(i, "Lỗi", j) }
                                    if (text === 'new') { return this.checkDate(i, "Việc mới", j) }
                                    return this.checkDate(i, this.checkDate(i, "Việc tương lai", j))
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Ưu tiên" dataIndex="ht_uutien"
                                width={100}
                                render={text => {
                                    if (text === 'GAP') { return this.checkDate(i, "Gấp", j) }
                                    if (text === 'CAO') { return this.checkDate(i, "Cao", j) }
                                    if (text === 'TB') { return this.checkDate(i, "Trung bình", j) }
                                    return this.checkDate(i, "Thấp", j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian tiếp nhận" dataIndex="ht_thoigiantiepnhan"
                                render={text => {
                                    return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian dự kiến hoàn thành" dataIndex="ht_thoigian_dukien_hoanthanh"
                                render={text => {
                                    if (text === null) { return '' }
                                    return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian hoàn thành" dataIndex="ht_thoigian_hoanthanh"
                                render={text => {
                                    if (text === null) { return '' }
                                    return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Nội dung yêu cầu" dataIndex="ht_noidungyeucau" width={100}
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Ghi chú" dataIndex="ht_ghichu"
                                render={text => {
                                    return this.checkDate(i, text, j)
                                }}
                                onHeaderCell={this.onHeaderCell} />
                            {/* <Column
                                visible={false}
                                title="Hành động"
                                key="action"
                                align="center"
                                render={(text, record) => (
                                    <span>
                                        <Button style={{ marginRight: 20 }} type="primary" onClick={this.showModal.bind(record.ht_id, text)}>
                                            <Icon type="edit" />
                                        </Button>
                                    </span>
                                )}
                            /> */}
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} style={{marginTop: 10}} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
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