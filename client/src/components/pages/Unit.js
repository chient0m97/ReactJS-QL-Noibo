import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Tooltip, Card } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
// import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import { async } from 'q';

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
            visible_kh: false,
            formtype_kh: 'horizontal',
            title_kh: 'Thêm mới khách hàng',
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
            stateconfirmdelete: false,
            statebuttondelete: true,
            statebuttonedit: true,
            stateoption: true,
            selectedRowKeys: [],
            selectedrow: [],
            selectedId: [],
            rowunitselected: {},
            checked: true
        }
    }
    //---Delete---
    deleteUnit = (dm_dv_id) => {
        Request('unit/delete', 'DELETE', { dm_dv_id: dm_dv_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.getUnits(this.state.page)
                this.setState({
                    stateconfirmdelete: false,
                    statebuttondelete: true,
                    statebuttonedit: true,
                    selectedRowKeys: []
                })
            })
        this.setState({
            stateconfirmdelete: false
        })
    }

    getKhachhangs = () => {
        Request('unit/getkhachhang', 'POST', {
        }).then((response) => {
            let data = response.data;
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

    //---Insert---
    InsertOrUpdateUnit = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'unit/insert' : 'unit/update'
            Request(url, 'POST', values)
                .then((response) => {
                    this.setState({
                        rowunitselected: values
                    })
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visible: false,
                            message: response.data.message
                        })
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thành công (^.^)'

                    if (!!!response.data.success) {
                        message = 'Có lỗi xảy ra (>.<)'
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
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
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

    showModalUpdate = async (unit) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_kh: false,
        });
        var arrayfilloption = []
        this.state.units.map((value, index) => {
            arrayfilloption.push({ dm_dv_id: value.dm_dv_id, tendonvi: value.dm_dv_ten })
        })
        await this.setState({
            dataSource_Select_Parent: arrayfilloption
        })
        if (unit.dm_dv_id !== undefined) {
            await this.setState({
                dm_dv_id_visible: true,
                action: 'update'
            })
            this.set_select_tenkh();
            if (this.state.select_tenkh.length === 0) {
                form.setFieldsValue({ kh_id_nguoidaidien: '' })
            }
            form.setFieldsValue({ kh_id_nguoidaidien: 0 })
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
            if (unit.kh_id_nguoidaidien) {
                console.log('hihi haha')
            }
            else {
                form.setFieldsValue({ kh_id_nguoidaidien: '' })
            }
        }
    };

    showModalInsert = async (unit) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_kh: false
        });
        form.resetFields();
        form.setFieldsValue({ dm_dv_trangthai: 'HD' })
        var arrayfilloption = []
        this.state.units.map((value, index) => {
            arrayfilloption.push({ dm_dv_id: value.dm_dv_id, tendonvi: value.dm_dv_ten })
        })
        await this.setState({
            dataSource_Select_Parent: arrayfilloption
        })
        if (unit.dm_db_id === undefined) {
            await this.setState({
                action: 'insert'
            })
            await this.set_select_tenkh();
            // await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
            await this.set_select_diabantinh();
            if (this.state.select_diabantinh.length === 0) {
                form.setFieldsValue({ dm_db_id_tinh: '' })
            }
            form.setFieldsValue({ dm_db_id_tinh: this.state.select_diabantinh[0].dm_db_id })
            await this.set_select_diabanhuyen(this.state.select_diabantinh[0].dm_db_id);
            if (this.state.select_diabanhuyen.length === 0) {
                form.setFieldsValue({ dm_db_id_huyen: '' })
            }
            form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
            await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id)
            if (this.state.select_diabanxa.length === 0) {
                form.setFieldsValue({ dm_db_id_xa: '' })
            }
            form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
        }
    }

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
    }

    handleCount = () => {
        let count = this.state.count;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => { //xác nhận
        message.success('Bấm yes để xác nhận');
    }

    cancel = (e) => {
        this.setState({
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
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
        }
        else {
            this.getUnits(this.state.page, this.state.index, this.state.sortBy)
        }
    }

    onChangeSearchType = async (value) => {
        await this.setState({
            columnSearch: value,
        })
        if (this.state.textSearch) {
            this.search(this.state.textSearch);
        }
    }

    onSearch = (val) => {
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
                if (this.state.isSearch == 1) {
                    this.search(this.state.textSearch)
                }
                else {
                    this.getUnits(this.state.page)
                }
            },
        };
    }

    set_select_tenkh = async () => {
        await Request('unit/getkhachhang', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_tenkh: res.data
                })
            }
            
        })
    }

    set_select_tendv = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_tendv: res.data
                })
            }
            
        })
    }

    set_select_diabantinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_diabantinh: res.data
                })
            }
            
        })
    }

    set_select_diabanhuyen = async (id_db_tinh) => {
        await Request('unit/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_diabanhuyen: res.data
                })
            }
            
        })
    }

    set_select_diabanxa = async (id_db_huyen) => {
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_diabanxa: res.data
                })
            }
            
        })
    }

    set_select_tinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_tinh: res.data
                })
            }
            
        })
    }

    set_select_huyen = async (id_db_tinh) => {
        await Request('unit/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_huyen: res.data
                })
            }
            
        })
    }

    set_select_xa = async (id_db_huyen) => {
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_xa: res.data
                })
            }
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
                form.setFieldsValue({ kh_lienlac: 'TXLL' })
                form.setFieldsValue({ kh_gioitinh: 'Nam' })
                try {
                    await this.set_select_tinh();
                    if (this.state.select_tinh.length === 0) {
                        form.setFieldsValue({ dm_db_id_tinh_customer: '' })
                    }
                    form.setFieldsValue({ dm_db_id_tinh_customer: this.state.select_tinh[0].dm_db_id })
                    await this.set_select_huyen(this.state.select_tinh[0].dm_db_id);
                    if (this.state.select_huyen.length === 0) {
                        form.setFieldsValue({ dm_db_id_huyen_customer: '' })
                    }
                    form.setFieldsValue({ dm_db_id_huyen_customer: this.state.select_huyen[0].dm_db_id })
                    await this.set_select_xa(this.state.select_huyen[0].dm_db_id)
                    if (this.state.select_diabanxa.length === 0) {
                        form.setFieldsValue({ dm_db_id_xa_customer: '' })
                    }
                    form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
                    await this.set_select_tendv();
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        await this.set_select_tenkh(value);
        if (this.state.select_tenkh.length === 0) {
            await form.setFieldsValue({ kh_id_nguoidaidien: '' })
        }
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


    onSelectTinh = async (value) => {
        const { form } = this.formRef.props
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

    onCancel_kh = () => {
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
                })
        });
    }

    saveFormRefCreate = formRef => {
        this.saveFormRefCreate = formRef;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedId: selectedRowKeys,
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
                rowunitselected: selectedRows[0]
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
        if (token)
            return (
                <div>
                    <Card>
                        <Row>
                            <Col span={2}>
                                <Tooltip title="Thêm đơn vị">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModalInsert.bind(null)}>
                                        <Icon type="user-add" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <span>
                                <Col span={2}>
                                    <Tooltip title="Sửa đơn vị">
                                        <Button shape='round' type="primary" size="default" onClick={this.showModalUpdate.bind(this, this.state.rowunitselected)} disabled={this.state.statebuttonedit} >
                                            <Icon type="edit" /></Button>
                                    </Tooltip>
                                </Col>
                                <Col span={2}>
                                    <Tooltip title="Xóa đơn vị">
                                        <Popconfirm
                                            title="Bạn có chắc chắn muốn xóa ?"
                                            onConfirm={this.deleteUnit.bind(this, this.state.selectedId)}
                                            onCancel={this.cancel}
                                            okText="Có"
                                            cancelText="Không"
                                            visible={this.state.stateconfirmdelete}
                                        >
                                            <Button shape='round' type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                                <Icon type="delete" /></Button>
                                        </Popconfirm>
                                    </Tooltip>
                                </Col>
                                <Col span={2}>
                                    <Tooltip title="Tải Lại">
                                        <Button shape="round" type="primary" style={{ marginLeft: '18px' }} size="default" onClick={this.refresh.bind(null)}>
                                            <Icon type="reload" />
                                        </Button>
                                    </Tooltip>
                                </Col>
                            </span>
                        </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
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
                            <Column title="Tên đơn vị" dataIndex="dm_dv_ten" key="dm_dv_ten" onHeaderCell={this.onHeaderCell} width={150}/>
                            <Column title="ID Đơn vị cấp trên" dataIndex="dm_dv_id_cha" key="dm_dv_id_cha" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Đơn vị cấp trên" dataIndex="tendonvicha" key="tendonvicha" onHeaderCell={this.onHeaderCell} />
                            <Column title="Địa chỉ" dataIndex="dm_dv_diachi" key="dm_dv_diachi" onHeaderCell={this.onHeaderCell} width={150}/>
                            <Column title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã số thuế" dataIndex="dm_dv_masothue" key="dm_dv_masothue" onHeaderCell={this.onHeaderCell} />
                            <Column title="Số điện thoại" dataIndex="dm_dv_sodienthoai" key="dm_dv_sodienthoai" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã người đại diện" dataIndex="kh_id_nguoidaidien" key="kh_id_nguoidaidien" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Người đại diện" dataIndex="tennguoidaidien" key="tennguoidaidien" onHeaderCell={this.onHeaderCell} width={150} />
                            <Column title="Trạng thái đơn vị" dataIndex="dm_dv_trangthai" key="dm_dv_trangthai" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Trạng thái" dataIndex="dm_dv_trangthai_txt" key="dm_dv_trangthai_txt" onHeaderCell={this.onHeaderCell} />
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
        fetchUser,
        fetchLoading
    })
    (Unit);