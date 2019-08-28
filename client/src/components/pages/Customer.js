import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Tooltip, Card } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            current: 1,
            pageSize: 10,
            page: 1,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            kh_id_visible: false,
            action: 'insert',
            isSearch: 0,
            textSearch: '',
            isSort: true,
            sortBy: 'ASC',
            index: 'kh_ten',
            orderby: 'arrow-up',
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
            visible_dv: false,
        }
    }

    deleteCustomer = (kh_id) => {
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
        Request('customer/getdonvi', 'POST', {
        }).then((response) => {
            let data = response.data;
            if (data.data){
                
                this.setState({
                    customers: data.data.customers,
                })
            }
        })
    }

    getCustomers = (pageNumber) => {
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
                if (data.data){
                    await this.setState({
                        customers: data.data.customers,
                        count: Number(data.data.count)
                    })
                }
                this.props.fetchLoading({
                    loading: false
                })
            })
    }

    InsertOrUpdateCustomer = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            console.log("hien thi value ",values)
            var url = this.state.action === 'insert' ? 'customer/insert' : 'customer/update'
            Request(url, 'POST', values)
                .then((response) => {
                    this.setState({
                        rowcustomerselected: values
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
                    //thông báo lỗi và thành công
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
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
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

    showModalUpdate = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false
        });
        if (customer.kh_id !== undefined) {
            await this.setState({
                kh_id_visible: true,
                action: 'update'
            })
            await this.set_select_tendv();
            if (this.state.select_tendv.length === 0) {
                await form.setFieldsValue({ dm_dv_id: '' })
            }
            await form.setFieldsValue({ dm_dv_id: customer.tendonvi })
            await this.set_select_tinh();
            if (this.state.select_tinh.length > 0) {
                await form.setFieldsValue({ dm_db_id_tinh_customer: customer.tentinh })
                await this.set_select_huyen(this.state.select_tinh[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_tinh_customer: '' })
            }
            if (this.state.select_huyen.length > 0) {
                await form.setFieldsValue({ dm_db_id_huyen_customer: customer.tenhuyen })
                await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            }
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa_customer: '' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa_customer: customer.tenxa })
            }
            form.setFieldsValue(customer);
            if (customer.dm_dv_id) {
                console.log('xóa là tạch')
            }
            else {
                form.setFieldsValue({ dm_dv_id: '' })
            }
        }
    };

    showModalInsert = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false
        });
        form.resetFields();
        form.setFieldsValue({ kh_lienlac: 'TXLL' })
        if (customer.kh_id === undefined) {
            await this.setState({
                action: 'insert'
            })
            await this.set_select_tendv();
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
            if (this.state.select_xa.length === 0) {
                form.setFieldsValue({ dm_db_id_xa_customer: '' })
            }
            form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
        }
    };

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

    set_select_donvicha = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_donvicha: res.data
                })
            }
            
        })
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

    set_select_tinh = async () => {
        await Request('customer/gettinh', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_tinh: res.data
                })
            }
            
        })
    }

    set_select_huyen = async (id_db_tinh) => {
        await Request('customer/gethuyen', 'POST', {
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
        await Request('customer/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_xa: res.data
                })
            }
            
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
            if(res.data){
                await this.setState({
                    select_tenkh: res.data
                })
            }
            
        })
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

    set_select_diabantinh = async () => {
        await Request('customer/gettinh', 'POST', {
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_diabantinh: res.data
                })
            }
            
        })
    }

    set_select_diabanhuyen = async (id_db_tinh) => {
        await Request('customer/gethuyen', 'POST', {
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
        await Request('customer/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if(res.data){
                await this.setState({
                    select_diabanxa: res.data
                })
            }
            
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

    handleCancel = e => {
        this.setState({
            visible: false,
            kh_id_visible: false
        });
    };

    handleCount = () => {
        let count = this.state;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => {
        message.success('Bấm yes để xác nhận')
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

    showTotal = (total) => {
        return `Total ${total} item`;
    }

    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
        }
        else {
            this.getCustomers(this.state.page, this.state.index, this.state.sortBy)
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
        if (token)
            return (
                <div>
                    <Card>
                        <Row>
                            <Col span={2}>
                                <Tooltip title="Thêm khách hàng">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModalInsert.bind(null)}>
                                        <Icon type="user-add" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Sửa khách hàng">
                                    <Button shape='round' type="primary" size="default" onClick={this.showModalUpdate.bind(this, this.state.rowcustomerselected)} disabled={this.state.statebuttonedit} >
                                        <Icon type="edit" /></Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Xóa khách hàng">
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa ?"
                                        onConfirm={this.deleteCustomer.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No">
                                        <Button shape='round' type="danger" size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" /></Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="round" type="primary" style={{ marginLeft: '10px' }} size="default" onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
                        <CreateModalCustomer
                            wrappedComponentRef={this.state.visible_dv ? this.saveFormRefCreate : this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onOk_kh={this.InsertOrUpdateCustomer}
                            title={this.state.title}
                            formtype={this.state.formtype}
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
                            <Column title="Tên khách hàng" dataIndex="kh_ten" key="kh_ten" onHeaderCell={this.onHeaderCell} width={150}/>
                            <Column title="Số điện thoại" dataIndex="kh_sodienthoai" key="kh_sodienthoai" onHeaderCell={this.onHeaderCell} />
                            <Column title="Email" dataIndex="kh_email" key="kh_email" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh"  />
                            <Column title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen"  />
                            <Column title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa"  />
                            <Column title="Địa chỉ" dataIndex="kh_diachi" key="kh_diachi" onHeaderCell={this.onHeaderCell} width={150} />
                            <Column title="Mã đơn vị" dataIndex="dm_dv_id" key="dm_dv_id" className='hidden-action' disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Đơn vị" dataIndex="tendonvi" key="tendonvi" onHeaderCell={this.onHeaderCell} />
                            <Column title="Vị trí công tác" dataIndex="kh_vitricongtac" key="kh_vitricongtac" onHeaderCell={this.onHeaderCell} />
                            <Column title="Liên lạc" dataIndex="kh_lienlac" key="kh_lienlac" className='hidden-action' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Liên lạc" dataIndex="kh_lienlac_txt" key="kh_lienlac_txt"  />
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