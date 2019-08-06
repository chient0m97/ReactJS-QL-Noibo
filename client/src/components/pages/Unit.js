import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Divider } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
// import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import { async } from 'q';


// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;

class Unit extends React.Component {
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
            dm_dv_id_visible: false,
            action: 'insert',
            isSearch: 0,
            textSearch: '',
            columnSearch: '',
            isSort: true,
            sortBy: 'ASC',
            index: 'dm_dv_ten',
            orderby: 'arrow-up',
            corlor: '#d9d9d9',
            dataSource_Select_Parent: [],
            units: [],
            select_diabantinh: [],
            select_diabanhuyen: [],
            select_diabanxa: [],
            select_tenkh: [],
            select_tinh: [],
            select_huyen: [],
            select_xa: [],
            select_tendv: [],
            visible_kh: false,
            formtype_kh: 'horizontal',
            title_kh: 'Thêm mới khách hàng',
            stateconfirmdelete: false,
            statebuttondelete: false,
            rowunitselected: true,
            statebuttonedit: true,
            stateoption: true
            // kh_tendaydu: []
        }
    }
    //---Delete---
    deleteUnit = (dm_dv_id) => {
        Request(`unit/delete`, 'DELETE', { dm_dv_id: dm_dv_id })
            .then((res) => {
                // let data = response.data;
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message

                });
                this.getUnits(this.state.page)
                // message: (data.message + 'id là' + dm_dv_id)
            })
    }

    //xxxx

    getKhachhangs = () => {
        console.log('get kh')
        Request('unit/getkhachhang', 'POST', {
        }).then((response) => {
            let data = response.data;
            console.log('data kh', data)
            if (data.data)
                this.setState({
                    units: data.data.units,
                })
        })
    }

    getUnits = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('unit/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((response) => {
                let data = response.data;
                console.log(data, 'data trả về')
                if (data.data)
                    this.setState({
                        units: data.data.units,
                        count: Number(data.data.count) // ép kiểu về    
                    })
                this.props.fetchLoading({
                    loading: false

                })
            })

    }

    // InsertKhachhang = () => {
    //     console.log('thêm khách hàng')
    //     const {form} = this.formRef.props;
    //     if (err) {
    //         return
    //     }
    //     var link = this.sta
    //     Request('POST')
    // }

    // getLocation = () => {
    //     Request('unit/getlocation', 'POST', {

    //     }).then((response) =>{
    //         let data = response.data;
    //         console.log('data', data)
    //     })
    // }

    //---Insert---
    InsertOrUpdateUnit = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            console.log('ndiwho', values)
            if (err) {
                return
            }

            var url = this.state.action === 'insert' ? 'unit/insert' : 'unit/update'
            Request(url, 'POST', values)
                .then((response) => {
                    console.log('day la res', response)
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
                    this.getUnits(this.state.page)
                })
        })
    }

    refresh = (pageNumber) => {
        this.getUnits(this.state.pageNumber)
    }
    componentDidMount() {
        this.getUnits(this.state.pageNumber, this.state.index, this.state.sortBy);
    }
    onchangpage = async (page) => {
        await this.setState({
            page: page
        })

        if (this.state.isSearch === 1) {
            this.search(this.state.textSearch)
        }
        else {
            this.getUnits(page)
        }
    }

    showDataSourceParent() {
        this.getUnits(this.state.dataSource_Select_Parent);
    }

    showModal = async (unit) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_kh : false,
        });
        form.resetFields();
        form.setFieldsValue({ dm_dv_trangthai: 'HD' })
        this.setState({
            dataSource_Select_Parent: this.state.units
        })
        if (unit.dm_dv_id !== undefined) {

            await this.setState({
                dm_dv_id_visible: true,
                action: 'update'
            })

            var dataSourceCha = []

            this.state.units.map((value, index) => {
                if (value.dm_dv_id !== unit.dm_dv_id) {
                    dataSourceCha.push(value)
                }
            })
            this.setState({
                dataSource_Select_Parent: dataSourceCha
            })

            this.set_select_tenkh();
            form.setFieldsValue({ kh_id_nguoidaidien: 0})
            this.set_select_diabantinh();
            if (this.state.select_diabantinh.length === 0) {
                form.setFieldsValue({ dm_db_id_tinh: '' })
            }
            this.set_select_diabanhuyen(unit.dm_db_id_tinh);
            if (this.state.select_diabanhuyen.length === 0) {
                form.setFieldsValue({ dm_db_id_huyen: '' })
            }
            this.set_select_diabanxa(unit.dm_db_id_huyen);
            if (this.state.select_diabanxa.length === 0) {
                form.setFieldsValue({ dm_db_id_xa: '' })
            }
            form.setFieldsValue(unit);
        }

        if (this.state.action !== 'update') {
            await this.set_select_tenkh();
            await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
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
            // form.setFieldsValue({ kh_id: 'Bỏ chọn'})
        }

        //  form.setFieldsValue({ kh_id_nguoidaidien: 'Bỏ chọn'})
    };

    handleOK = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            dm_dv_id_visible: false
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
        let count = this.state.count;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => { //xác nhận
        console.log(e);
        message.success('Bấm yes để xác nhận');
    }

    cancel = (e) => {
        console.log(e);
        this.state({
            stateconfirmdelete: false
        })
    }

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
    }

    showTotal = (total) => { //hiển thị tổng số
        return `Total ${total} items `;
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
            this.getUnits(this.state.page, this.state.index, this.state.sortBy)
        }
    }

    search = async (xxxx) => {
        console.log("đây là tìm kiếm", xxxx)
        console.log('cai dkm', this.state.columnSearch)
        Request('unit/search', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: this.state.page,
            textSearch: xxxx,
            columnSearch: this.state.columnSearch,
            p1: this.state.index,
            p2: this.state.sortBy
        })
            .then((response) => {
                let data = response.data;
                console.log('aaaaaaaaaaaaaaaaaa', data)
                if (data.data)
                    this.setState({
                        units: data.data.units,
                        count: Number(data.data.count), // ép kiểu về
                        textSearch: xxxx,
                        isSearch: 1
                    })
                console.log('data---------------------------', data);
            })
    }

    onChangeSearchType = async (value) => {
        console.log('hihi', this.state.textSearch)
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
                    this.getUnits(this.state.page)
                }
            },
        };
    }

    // saveFormRef2 = formRef2 => {
    //     this.formRef2 = formRef2;
    // }

    removeSearch = () => {
        this.setState({
            textSearch: ''
        })
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

    // set_select_tenkh = async () => {
    //     await Request('unit/getkhachhang', 'POST', {
    //     }).then(async (res) => {
    //         console.log(res.data, 'data khach')
    //         // res.data.push({ kh_id: '', tennguoidaidien: 'Bỏ chọn'})
    //         console.log('day la kh id', this.state.kh_id)
    //         console.log("hien thi res ", res)
    //         await this.setState({
    //             select_tenkh: res.data
    //         })
    //     })
    // }

    set_select_tendv = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            console.log('data donvi', res.data)
            await this.setState({
                select_tendv: res.data
            })
        })
    }

    set_select_diabantinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            await this.setState({
                select_diabantinh: res.data
            })
        })
    }

    set_select_diabanhuyen = async (id_db_tinh) => {
        console.log('select diab an tinh', id_db_tinh)
        await Request('unit/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            await this.setState({
                select_diabanhuyen: res.data
            })
        })
    }

    set_select_diabanxa = async (id_db_huyen) => {
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            await this.setState({
                select_diabanxa: res.data
            })
        })
    }

    set_select_tinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            console.log(res.data, 'data tinh')
            await this.setState({
                select_tinh: res.data
            })
        })
    }

    set_select_huyen = async (id_db_tinh) => {
        console.log('select diab an tinh', id_db_tinh)
        await Request('unit/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            console.log(res.data, 'data res huyen')
            await this.setState({
                select_huyen: res.data
            })
        })
    }

    set_select_xa = async (id_db_huyen) => {
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            await this.setState({
                select_xa: res.data
            })
        })
    }

    onSelectKh = async (value) => {
        if (value === 'add_nguoidaidien') {
            await this.setState({
                visible_kh: true,
                stateoption: true
            })
            var form = null
            if (this.state.visible_kh) {
                form = this.formRef.props.form
                form.setFieldsValue({ kh_lienlac: 'DD' })
                form.setFieldsValue({ kh_gioitinh: 'Nam' })
                try {
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
                    await this.set_select_tendv();
                    if (this.state.set_select_tendv.length > 0) {
                        await form.setFieldsValue({ dm_dv_id: this.state.select_tendv[0].dm_dv_id})
                    }
                    else {
                        await form.setFieldsValue({ dm_dv_id: '' })
                    }
                }
                catch (err) {
                    console.log(err)
                }

                // if (value === 'add_nguoidaidien'){
                //     form.setFieldsValue({dm_dv_id : ''})
                // }
                // try {
                //     if (this.state.select_tendv.length > 0) {
                //         await form.setFieldsValue({ dm_dv_id: 1 })
                //     } else {
                //         await form.setFieldsValue({ dm_dv_id: '' })
                //     }
                // }
                // catch (err) {
                //     console.log(err)
                // }
            }
        }


        await this.set_select_tenkh(value);
        if (this.state.select_tenkh.length === 0) {
            await form.setFieldsValue({kh_id_nguoidaidien: '' })
        }
    }

    // onSelectDv = async (value) => {
    //    if(value === 'add_donvi'){
    //        res.data.push({ dm_dv_id: '', dm_dv_ten: ''})
    //    }
    //    await this.set_select_tendv(value);
    //    if(this.state.select_tendv.length === 0){
    //        await form.setFieldsValue({dm_dv_id: ''})
    //    }
    // }

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


    onSelectTinh = async (value) => {
        console.log('dia ban tinh')
        const { form } = this.formRef.props
        await this.set_select_huyen(value);
        if (this.state.select_huyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            await this.set_select_xa(-1);
            // await this.set_select_diabanxa({ dm_db_id_huyen: 0 });
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

    onCancel_kh = () => {
        console.log('cancel')
        this.setState({
            visible_kh: false
        })
    }

    onOk_kh = async () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'customer/insert' : 'unit/update'
            Request(url, 'POST', values)
                .then(async (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        console.log("hien thi ", response)
                        //const { form } = this.formRef.props;
                        form.resetFields()
                        await this.setState({
                            visible_kh: false,
                            message: response.data.message
                        })

                        if (!this.state.visible_kh) {
                            var formkhachhang = this.formRef.props.form
                            try {
                                formkhachhang.setFieldsValue({ kh_id_nguoidaidien: response.data.id_customer })
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
                    this.set_select_tenkh();

                    // form.setFieldsValue({unit : id_customer})
                    // if (this.state.visible) {
                    //     // form = this.formRef.props.form
                    //     try {
                    //         this.set_select_tenkh(values);
                    //         if (this.state.select_tenkh.length === 0) {
                    //             form.setFieldsValue({ kh_id: '' })
                    //         } else {
                    //             form.setFieldsValue({ kh_id : values })
                    //         }
                    //     }
                    //     catch (err) {
                    //         console.log(err)
                    //     }
                    // }
                })
        });
    }


    saveFormRefCreate = formRef => {
        this.saveFormRefCreate = formRef;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    // CreateCustomer = (e) => {
    //     
    // }


    render() {

        const rowSelection = {
            hideDefaultSelections: true,
            onChange: async (selectedRowKeys, selectedRows) => {
                var arrayselected = []
                arrayselected.push(selectedRowKeys)
                console.log('id check', selectedRowKeys[0])
                if (selectedRowKeys.length > 0) {
                    await this.setState({
                        // selectedId: selectedRowKeys[0],
                        // unit: selectedRows[0]
                        statebuttondelete: false
                    })
                }
                else {
                    await this.setState({
                        statebuttondelete: true
                    })
                }
                if (selectedRowKeys.length === 1) {
                    await this.setState({
                        statebuttondelete: false,
                        rowunitselected: selectedRows[0]
                    })
                }
                else {
                    this.setState({
                        statebuttonedit: true
                    })
                    await this.setState({
                        selectedId: arrayselected[0]
                    })
                }
            },
            getCheckboxProps: record => ({

                disabled: Column.title === 'Id', // Column configuration not to be checked
                name: record.name,
            }),
        };
        if (token)
            return (
                <div>
                    <Row className='table-margin-bt'>
                        <Col span={2}>
                            <Button shape="circle" type="primary" size="large" onClick={this.showModal.bind(null)}>
                                <Icon type="plus" />
                            </Button> Thêm
                        </Col>
                        <span>
                            <Col span={2}>
                                <Button shape='circle' type="primary" size="large" onClick={this.showModal.bind(this, this.state.rowunitselected)} >
                                    <Icon type="edit" /></Button> Sửa
                        </Col>
                            <Col span={2}>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa ?"
                                    onConfirm={this.deleteUnit.bind(this, this.state.selectedId)}
                                    onCancel={this.cancel}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button shape='circle' type="danger" size="large" onClick={this.checkStateConfirm} >
                                        <Icon type="delete" /></Button> Xóa
                            </Popconfirm>
                            </Col>
                        </span>
                    </Row>
                    <br />
                    <div>
                        <Select
                            defaultValue={['dm_dv_id']}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="select a unit"
                            optionFilterProp="children"
                            onChange={this.onChangeSearchType}
                            onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="dm_dv_id">Mã đơn vị</Option>
                            <Option value="dm_dv_id_cha">Mã đơn vị cấp trên</Option>
                            <Option value="dm_dv_ten">Tên đơn vị</Option>
                            <Option value="dm_db_id_tinh" >Mã tỉnh</Option>
                            <Option value="dm_db_id_huyen" >Mã huyện</Option>
                            <Option value="dm_db_id_xa" >Mã xã</Option>
                            <Option value="dm_dv_diachi">Địa chỉ đơn vị</Option>
                            <Option value="dm_dv_masothue">Mã số thuế đơn vị</Option>
                            <Option value="dm_dv_sodienthoai">Số điện thoại đơn vị</Option>
                            <Option value="kh_id_nguoidaidien">Mã người đại diện</Option>
                            <Option value="dm_dv_trangthai">Trạng thái đơn vị</Option>

                        </Select>
                        <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.search(value) }} enterButton />
                    </div>
                    <br />
                    <Row className="table-margin-bt">
                        <CreateModalUnit
                            datacha={this.state.dataSource_Select_Parent}
                            wrappedComponentRef={!this.state.visible_kh ? this.saveFormRef : this.saveFormRefCreate}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSave={this.InsertOrUpdateUnit}
                            title={this.state.title}
                            formtype={this.state.formtype}
                            dm_dv_id_visible={this.state.dm_dv_id_visible}
                            handleChange={this.handleChange}
                            select_diabantinh={this.state.select_diabantinh}
                            select_diabanhuyen={this.state.select_diabanhuyen}
                            select_diabanxa={this.state.select_diabanxa}
                            select_tenkh={this.state.select_tenkh}
                            onSelectDiaBanTinh={this.onSelectDiaBanTinh}
                            onSelectDiaBanHuyen={this.onSelectDiaBanHuyen}
                            onSelectDiaBanXa={this.onSelectDiaBanXa}
                            onSelectKh={this.onSelectKh}
                            
                        />
                        <CreateModalCustomer
                            wrappedComponentRef={this.state.visible_kh ? this.saveFormRef : this.saveFormRefCreate}
                            visible={this.state.visible_kh}
                            onCancel={this.onCancel_kh}
                            onOk_kh={this.onOk_kh}
                            title={this.state.title_kh}
                            formtype={this.state.formtype_kh}
                            // CreateCustomer={this.CreateCustomer}
                            getunit={this.getUnits.bind(this, this.state.page)}
                            select_tendv={this.state.select_tendv}
                            select_tinh={this.state.select_tinh}
                            select_huyen={this.state.select_huyen}
                            select_xa={this.state.select_xa}
                            onSelectTinh={this.onSelectTinh}
                            onSelectHuyen={this.onSelectHuyen}
                            onSelectXa={this.onSelectXa}
                            onSelectDv={this.onSelectDv}
                            stateoption={this.state.stateoption}
                        />
                        <Table className="table-contents" rowSelection={rowSelection} pagination={false} dataSource={this.state.units} bordered='1' scroll={{ x: 1000 }} rowKey="dm_dv_id">
                            <Column title="ID Đơn vị cấp trên" dataIndex="dm_dv_id_cha" key="dm_dv_id_cha" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Đơn vị cấp trên" dataIndex="tendonvicha" key="tendonvicha" onHeaderCell={this.onHeaderCell} />
                            <Column title="Tên đơn vị" dataIndex="dm_dv_ten" key="dm_dv_ten" onHeaderCell={this.onHeaderCell} />
                            <Column title="Địa chỉ đơn vị" dataIndex="dm_dv_diachi" key="dm_dv_diachi" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã số thuế đơn vị" dataIndex="dm_dv_masothue" key="dm_dv_masothue" onHeaderCell={this.onHeaderCell} />
                            <Column title="Số điện thoại đơn vị" dataIndex="dm_dv_sodienthoai" key="dm_dv_sodienthoai" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã người đại diện" dataIndex="kh_id_nguoidaidien" key="kh_id_nguoidaidien" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tên người đại diện" dataIndex="tennguoidaidien" key="tennguoidaidien" onHeaderCell={this.onHeaderCell} />
                            <Column title="Trạng thái đơn vị" dataIndex="dm_dv_trangthai" key="dm_dv_trangthai" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Trạng thái đơn vị" dataIndex="dm_dv_trangthai_txt" key="dm_dv_trangthai_txt" onHeaderCell={this.onHeaderCell} />
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
    (Unit);