import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Tooltip } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import '@styles/style.css';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
var formDateModal = require('dateformat');

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            current: 1,
            pageSize: 10,
            page: 1,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            kh_id_visible: false,
            action: 'insert',
            isSearch: 0,
            textSearch: '',
            columnSearch: '',
            isSort: true,
            sortBy: 'ASC',
            index: 'kh_ten',
            orderby: 'arrow-up',
            corlor: '#d9d9d9',
            select_donvicha: [],
            customers: [],
            select_tinh: [],
            select_huyen: [],
            select_xa: [],
            select_diabantinh: [],
            select_diabanhuyen: [],
            select_diabanxa: [],
            select_tendv: [],
            select_tenkh: [],
            formtype_dv: 'horizontal',
            rowcustomerselected: {},
            statebuttondelete: true,
            statebuttonedit: true,
            stateconfirmdelete: false,
            selectedId: [],
            selectedrow: [],
            title_dv: 'Thêm mới đơn vị',
            stateoption: true,
            visible_dv: false
        }
    }

    formatDate(strDate, strFormat) {
        if (strDate == null)
            return null;
        var d = new Date(strDate);
        return d;
    }

    deleteCustomer = (kh_id) => {
        console.log('snubuifbeufiewb', kh_id)
        Request(`customer/delete`, 'DELETE', { kh_id: kh_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.getCustomers(this.state.page)
            })
    }

    getDonvis = () => {
        console.log('get dv')
        Request('customer/getdonvi', 'POST', {
        }).then((response) => {
            let data = response.data;
            console.log('data dv', data)
            if (data.data)
                this.setState({
                    customers: data.data.customers,
                })
        })
    }

    getCustomers = (pageNumber) => {
        console.log('getdata')
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('customer/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy,
        })
            .then(async (response) => {
                let data = response.data;
                console.log(data, 'data trả về')
                if (data.data)

                    await this.setState({
                        customers: data.data.customers,
                        count: Number(data.data.count)
                    })
                var i = 0;
                console.log("hien thi count ", this.state.count)
                for (i = 0; i < this.state.customers.length; i++) {
                    if (this.state.customers[i].kh_tenlot.length === 0) {
                        this.state.customers[i].kh_hovaten = this.state.customers[i].kh_ho + " " + this.state.customers[i].kh_ten
                    }
                    else {
                        this.state.customers[i].kh_hovaten = this.state.customers[i].kh_ho + " " + this.state.customers[i].kh_tenlot + " " + this.state.customers[i].kh_ten
                    }
                }
                console.log("Họ và tên", this.state.customers[0].kh_hovaten)
                this.props.fetchLoading({
                    loading: false
                })
            })

        // this.props.fetchLoading({
        //     loading: false
        // })
    }

    // InsertOrUpdateCustomer = () => {
    //     const { form } = this.formRef.props;
    //     form.validateFields((err, values) => {
    //         if (err) {
    //             return
    //         }
    //         var url = this.state.action === 'insert' ? 'customer/insert' : 'customer/update'
    //         Request(url, 'POST', values)
    //             .then((response) => {
    //                 if (response.status === 200 & response.data.success === true) {
    //                     form.resetFields();
    //                     this.setState({
    //                         visible: false,
    //                         message: response.data.message
    //                     })
    //                 }
    //                 var description = response.data.message
    //                 var notifi_type = 'success'
    //                 var message = 'Thành công !!'

    //                 if (!!!response.data.success) {
    //                     message = 'Có lỗi xảy ra !!'
    //                     notifi_type = 'error'
    //                     description = response.data.message.map((values, index) => {
    //                         return <Alert type='error' message={values}></Alert>
    //                     })
    //                 }
    //                 notification[notifi_type]({
    //                     message: message,
    //                     description: description
    //                 })
    //                 this.getCustomers(this.state.page)
    //             })
    //     });
    // }
    InsertOrUpdateCustomer = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            var url = this.state.action === 'insert' ? 'customer/insert' : 'customer/update'
            Request(url, 'POST', values)
                .then((response) => {
                    this.setState({
                        rowcustomerselected: values
                    })
                    if (response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visible: false,
                            message: response.data.message
                        })
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thành công !!'

                    if (!!!response.data.success) {
                        console.log(response.data.message, 'dcmc mcmasdasdas')
                        message = 'Có lỗi xảy ra !!'
                        notifi_type = 'error'
                        description = response.data.message.map((values, index) => {
                            return <Alert type='error' message={values}></Alert>
                        })
                    }
                    //thông báo lỗi vào thành công
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getCustomers(this.state.page)
                })
        })
    }

    refresh = (pageNumber) => {
        this.getCustomers(this.state.pageNumber)
    }
    componentDidMount() {
        this.getCustomers(this.state.pageNumber, this.state.index, this.state.sortBy);
    }
    onchangpage = async (page) => {
        await this.setState({
            page: page
        })
        if (this.state.isSearch === 1) {
            this.search(this.state.textSearch)
        }
        this.getCustomers(page)
    }
    // showDataSourceParent() {
    //     this.getCustomers(this.state.dataSource_Select_Parent);
    // }

    //Modal
    showModalUpdate = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false
        });
        form.resetFields();
        form.setFieldsValue({ kh_lienlac: 'DD' })
        form.setFieldsValue({ kh_gioitinh: 'Nam' })
        if (customer.kh_id !== undefined) {
            await this.setState({
                kh_id_visible: true,
                action: 'update'
            })
            await this.set_select_tendv();
            await form.setFieldsValue({ dm_dv_id: this.state.select_tendv[0].dm_dv_id })
            await this.set_select_tinh();
            if (this.state.select_tinh.length > 0) {
                await form.setFieldsValue({ dm_db_id_tinh_customer: 1 })
                await this.set_select_huyen(1);
            } else {
                await form.setFieldsValue({ dm_db_id_tinh_customer: '' })
            }
            if (this.state.select_huyen.length > 0) {
                await form.setFieldsValue({ dm_db_id_huyen_customer: this.state.select_huyen[0].dm_db_id })
                await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            }
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa_customer: '' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
            }
            customer.kh_ngaysinh = formDateModal(customer.kh_ngaysinh, 'yyyy-mm-dd')
            form.setFieldsValue(customer);
        }   
    };

    showModalInsert = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false
        });
        form.resetFields();
        form.setFieldsValue({ kh_lienlac: 'DD' })
        form.setFieldsValue({ kh_gioitinh: 'Nam' })
        if (customer.kh_id === undefined) {
            await this.setState({
                action: 'insert'
            })
            await this.set_select_tendv();
            // await form.setFieldsValue({ dm_dv_id: this.state.select_tendv[0].dm_dv_id })
            await this.set_select_tinh();
            if (this.state.select_tinh.length > 0) {
                await form.setFieldsValue({ dm_db_id_tinh_customer: 1 })
                await this.set_select_huyen(1);
            } else {
                await form.setFieldsValue({ dm_db_id_tinh_customer: '' })
            }
            if (this.state.select_huyen.length > 0) {
                await form.setFieldsValue({ dm_db_id_huyen_customer: this.state.select_huyen[0].dm_db_id })
                await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            }
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa_customer: '' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
            }
            customer.kh_ngaysinh = formDateModal(customer.kh_ngaysinh, 'dd/mm/yyyy')
            form.setFieldsValue(customer);
        }
    };

    set_select_tendv = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            console.log('data donvi', res.data)
            await this.setState({
                select_tendv: res.data
            })
        })
    }

    set_select_donvicha = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            console.log("hien thi res ", res)
            await this.setState({
                select_donvicha: res.data
            })
        })
    }

    set_select_tenkh = async () => {
        await Request('unit/getkhachhang', 'POST', {
        }).then(async (res) => {
            await this.setState({
                select_tenkh: res.data
            })
        })
    }

    set_select_tinh = async () => {
        await Request('customer/gettinh', 'POST', {
        }).then(async (res) => {
            console.log(res.data, 'data tinh')
            await this.setState({
                select_tinh: res.data
            })
        })
    }

    set_select_huyen = async (id_db_tinh) => {
        console.log('select diab an tinh', id_db_tinh)
        await Request('customer/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            console.log(res.data, 'data res huyen')
            await this.setState({
                select_huyen: res.data
            })
        })
    }

    set_select_xa = async (id_db_huyen) => {
        await Request('customer/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            await this.setState({
                select_xa: res.data
            })
        })
    }

    onSelectDv = async (value) => {
        if (value === 'add_donvi') {
            await this.setState({
                visible_dv: true,
                stateoption: true
            })
            var form = null
            if (this.state.visible_dv) {
                form = this.formRef.props.form
                form.setFieldsValue({ dm_dv_trangthai: 'HD' })
                try {
                    this.set_select_donvicha()
                    await this.set_select_diabantinh();
                    if (this.state.select_diabantinh.length > 0) {
                        await form.setFieldsValue({ dm_db_id_tinh: 1 })
                        await this.set_select_diabanhuyen(1);
                    } else {
                        await form.setFieldsValue({ dm_db_id_tinh: '' })
                    }
                    if (this.state.select_diabanhuyen.length > 0) {
                        await form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
                        await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id);
                    } else {
                        await form.setFieldsValue({ dm_db_id_huyen: '' })
                    }
                    if (this.state.select_diabanxa.length === 0) {
                        await form.setFieldsValue({ dm_db_id_xa: '' })
                    }
                    else {
                        await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
                    }
                    await this.set_select_tenkh();
                    // await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
                }
                catch (err) {
                    console.log(err)
                }
            }
        }


        await this.set_select_tendv(value);
        if (this.state.select_tendv.length === 0) {
            await form.setFieldsValue({ dm_dv_id: '' })
        } else {
            await form.setFieldsValue({ dm_dv_id: 0 })
        }
    }

    set_select_tenkh = async () => {
        await Request('unit/getkhachhang', 'POST', {
        }).then(async (res) => {
            console.log('data khach hang', res.data)
            await this.setState({
                select_tenkh: res.data
            })
        })
    }

    onSelectTinh = async (value) => {
        console.log('dia ban tinh')
        const { form } = this.formRef.props
        console.log(form, 'dday laf value')
        await this.set_select_huyen(value);
        if (this.state.select_huyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            await this.set_select_xa(-1);
            await form.setFieldsValue({ dm_db_id_xa_customer: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_huyen_customer: this.state.select_huyen[0].dm_db_id })
            await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa_customer: ' ' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
            }
        }
    }
    onSelectHuyen = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_xa(value);
        if (this.state.select_xa.length === 0) {
            await form.setFieldsValue({ dm_db_id_xa_customer: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id });
        }
    }


    set_select_diabantinh = async () => {
        await Request('customer/gettinh', 'POST', {
        }).then(async (res) => {
            await this.setState({
                select_diabantinh: res.data
            })
        })
    }

    set_select_diabanhuyen = async (id_db_tinh) => {
        console.log('select diab an tinh', id_db_tinh)
        await Request('customer/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            await this.setState({
                select_diabanhuyen: res.data
            })
        })
    }

    set_select_diabanxa = async (id_db_huyen) => {
        await Request('customer/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            await this.setState({
                select_diabanxa: res.data
            })
        })
    }

    onSelectDiaBanTinh = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_diabanhuyen(value);
        if (this.state.select_diabanhuyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen: '' })
            await this.set_select_diabanxa(-1);
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
            await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id);
            if (this.state.select_diabanxa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa: ' ' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
            }
        }
    }
    onSelectDiaBanHuyen = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_diabanxa(value);
        if (this.state.select_diabanxa.length === 0) {
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id });
        }
    }

    // showDataSourceParent() {
    //     this.getUnits(this.state.dataSource_Select_Parent);
    // }

    handleOk = e => {
        this.setState({
            visible: false,
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            kh_id_visible: false
        });
    };

    handleChangeInput = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleChange(value) {
        console.log(`selecet ${value}`);
    }

    handleCount = () => {
        let count = this.state;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => {
        console.log(e);
        message.success('Bấm yes để xác nhận')
    }

    cancel = (e) => {
        console.log(e);
        this.setState({
            stateconfirmdelete: true
        })
    }

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
    }

    showTotal = (total) => {
        return `Total ${total} item`;
    }

    onShowSizeChange = async (current, size) => {
        console.log('size', size);
        console.log('curent', current);
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            console.log('xxxx')
            this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
            console.log(this.state.page)
        }
        else {
            this.getCustomers(this.state.page, this.state.index, this.state.sortBy)
        }
    }

    search = async (xxxx) => {
        console.log('Đây là tìm kiếm', xxxx)
        console.log('cái dkm', this.state.columnSearch)
        Request('customer/search', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: this.state.page,
            textSearch: xxxx,
            columnSearch: this.state.columnSearch,
            p1: this.state.index,
            p2: this.state.sortBy
        })
            .then((response) => {
                let data = response.data;
                console.log('aaaaaaaaaaaaaaaaa', data)
                if (data.data)
                    this.setState({
                        customers: data.data.customers,
                        count: Number(data.data.count),
                        textSearch: xxxx,
                        isSearch: 1
                    })
                console.log('data------', data);
            })
    }

    onChangeSearchType = async (value) => {
        console.log('qfqif', this.state.textSearch)
        console.log(value)
        await this.setState({
            columnSearch: value,
        })
        if (this.state.textSearch) {
            this.search(this.state.textSearch);
        }
        console.log(`selected ${value}`);
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    onHeaderCell = (column) => {
        return {
            onClick: async () => {
                console.log('ccmnr', column.dataIndex)
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
                console.log('xx', this.state.isSort)
                if (this.state.isSearch == 1) {
                    this.search(this.state.textSearch)
                }
                else {
                    this.getCustomers(this.state.page)
                }
            },
        };
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    saveFormRefCreate = formRef => {
        this.saveFormRefCreate = formRef;
    }

    onCancel_dv = () => {
        this.setState({
            visible_dv: false
        })
    }

    onOk_dv = async () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'unit/insert' : 'customer/update'
            Request(url, 'POST', values)
                .then(async (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields()
                        await this.setState({
                            visible_dv: false,
                            message: response.data.message
                        })

                        if (!this.state.visible_dv) {
                            var formdonvi = this.formRef.props.form
                            try {
                                formdonvi.setFieldsValue({ dm_dv_id: response.data.id_unit })
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thành công !!'

                    if (!!!response.data.success) {
                        message = 'Có lỗi xảy ra !!'
                        notifi_type = 'error'
                        description = response.data.message.map((values, index) => {
                            return <Alert type='error' message={values}></Alert>
                        })
                    }
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.set_select_tendv();
                })
        })
    }

    removeSearch = () => {
        this.setState({
            textSearch: ''
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
        else {
            this.setState({
                statebuttondelete: true
            })
        }
        if (selectedRowKeys.length === 1) {
            this.setState({
                statebuttonedit: false,
                rowcustomerselected: selectedRows[0]
            })
        }
        else {
            this.setState({
                statebuttonedit: true
            })
        }
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: Column.title === 'Id', // Column configuration not to be checked
                name: record.name,
            }),
        };
        var formatDate = require("dateformat");
        if (token)
            return (
                <div>
                    <Row className='table-margin-bt'>
                        <Col span={2}>
                            <Tooltip title="Thêm khách hàng">
                                <Button shape="circle" type="primary" size="large" onClick={this.showModalInsert.bind(null)}>
                                    <Icon type="plus" />
                                </Button>
                            </Tooltip>
                        </Col>
                        <span>
                            <Col span={2}>
                                <Tooltip title="Sửa khách hàng">
                                    <Button shape='circle' type="primary" size="large" onClick={this.showModalUpdate.bind(this, this.state.rowcustomerselected)} disabled={this.state.statebuttonedit} >
                                        <Icon type="edit" /></Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Xóa khách hàng">
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa ?"
                                        onConfirm={this.deleteCustomer.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Có"
                                        cancelText="Không">
                                        <Button shape='circle' type="danger" size="large" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" /></Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="circle" type="primary" size="large" onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </span>
                    </Row>
                    <br />
                    <Row className='table-margin-bt'>
                        <CreateModalCustomer
                            wrappedComponentRef={this.state.visible_dv ? this.saveFormRefCreate : this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onOk_kh={this.InsertOrUpdateCustomer}
                            title={this.state.title}
                            formtype={this.state.formtype}
                            dateFormat={this.state.formatDate}
                            kh_id_visible={this.state.kh_id_visible}
                            select_tinh={this.state.select_tinh}
                            select_huyen={this.state.select_huyen}
                            select_xa={this.state.select_xa}
                            select_tendv={this.state.select_tendv}
                            onSelectTinh={this.onSelectTinh}
                            onSelectHuyen={this.onSelectHuyen}
                            onSelectXa={this.onSelectXa}
                            onSelectDv={this.onSelectDv}
                        />
                        <CreateModalUnit
                            datacha={this.state.select_donvicha}
                            wrappedComponentRef={!this.state.visible_dv ? this.saveFormRefCreate : this.saveFormRef}
                            visible={this.state.visible_dv}
                            onCancel={this.onCancel_dv}
                            onSave={this.onOk_dv}
                            title={this.state.title_dv}
                            formtype={this.state.formtype_dv}
                            // dm_dv_id_visible={this.state.dm_dv_id_visible}
                            // handleChange={this.handleChange}
                            select_diabantinh={this.state.select_diabantinh}
                            select_diabanhuyen={this.state.select_diabanhuyen}
                            select_diabanxa={this.state.select_diabanxa}
                            select_tenkh={this.state.select_tenkh}
                            onSelectDiaBanTinh={this.onSelectDiaBanTinh}
                            onSelectDiaBanHuyen={this.onSelectDiaBanHuyen}
                            onSelectDiaBanXa={this.onSelectDiaBanXa}
                            onSelectKh={this.onSelectKh}
                            stateoption={this.state.stateoption}
                        />
                        <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.customers} bordered='1' scroll={{ x: 1000 }} rowKey="kh_id">
                            <Column className="action-hide" title="Họ" dataIndex="kh_ho" key="kh_ho"  disabaled onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Tên lót" dataIndex="kh_tenlot" key="kh_tenlot"  disabaled onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Tên" dataIndex="kh_ten" key="kh_ten"  disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Họ và tên" dataIndex="kh_hovaten" key="kh_hovaten" onHeaderCell={this.onHeaderCell} />
                            <Column title="Ngày sinh" dataIndex="kh_ngaysinh" key="kh_ngaysinh" render={text => formatDate(text, "dd/mm/yyyy")} onHeaderCell={this.onHeaderCell} />
                            <Column title="Giới tính" dataIndex="kh_gioitinh" key="kh_gioitinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Đinh danh cá nhân" dataIndex="kh_dinhdanhcanhan" key="kh_dinhdanhcanhan" onHeaderCell={this.onHeaderCell} />
                            <Column title="Số điện thoại" dataIndex="kh_sodienthoai" key="kh_sodienthoai" onHeaderCell={this.onHeaderCell} />
                            <Column title="Email" dataIndex="kh_email" key="kh_email" onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh"  disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh" onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen"  disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen" onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa"  disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa" onHeaderCell={this.onHeaderCell} />
                            <Column title="Địa chỉ" dataIndex="kh_diachi" key="kh_diachi" onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Mã đơn vị" dataIndex="dm_dv_id" key="dm_dv_id"  disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Đơn vị" dataIndex="tendonvi" key="tendonvi" onHeaderCell={this.onHeaderCell} />
                            <Column title="Vị trí công tác" dataIndex="kh_vitricongtac" key="kh_vitricongtac" onHeaderCell={this.onHeaderCell} />
                            <Column className="action-hide" title="Liên lạc" dataIndex="kh_lienlac" key="kh_lienlac"  disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Liên lạc" dataIndex="kh_lienlac_txt" key="kh_lienlac_txt" onHeaderCell={this.onHeaderCell} />
                            <Column />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
                </div>
            );
        else
            return (
                <Login />
            )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        //   fetchUser,
        fetchLoading
    })
    (Customer);