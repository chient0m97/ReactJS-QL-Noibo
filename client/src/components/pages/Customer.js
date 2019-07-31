import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
// import { type } from 'os';
// import { unwatchFile } from 'fs';

// import { async } from 'q';
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
            index: 'tendonvi',
            orderby: 'arrow-up',
            corlor: '#d9d9d9',
            dataSource_Select_Parent: [],
            customers: [],
            select_tinh: [],
            select_huyen: [],
            select_xa: [],
            select_tendv: []
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

    // getDonvis = () => {
    //     console.log('get dv')
    //     Request('customer/getdonvi', 'POST', {
    //     }).then((response) => {
    //         let data = response.data;
    //         console.log('data dv', data)
    //         if (data.data)
    //             this.setState({
    //                 customers: data.data.customers,
    //             })
    //     })
    // }

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
            customers: this.state.customers
        })
            .then(async (response) => {
                let data = response.data;
                console.log(data, 'data trả về')
                if (data.data)
    
                    await this.setState({
                        customers: data.data.customers,
                        count: Number(data.data.count)
                    })
                    console.log('ccccccccc', this.state.customers)
                var i = 0;
                for (i = 0; i < this.state.count; i++) {
                    this.state.customers[i].kh_hovaten = this.state.customers[i].kh_ho + " " + this.state.customers[i].kh_tenlot + " " + this.state.customers[i].kh_ten
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

    InsertOrUpdateCustomer = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'customer/insert' : 'customer/update'
            Request(url, 'POST', values)
                .then((response) => {
                    if (response.status === 200 & response.data.success === true) {
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
                        message = 'Có lỗi xảy ra !!'
                        notifi_type = 'error'
                        description = response.data.message.map((values, index) => {
                            return <Alert type='error' message={values}></Alert>
                        })
                    }
                    notification[notifi_type]({
                        message: message,
                        description: description
                    })
                    this.getCustomers(this.state.page)
                })
        });
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
        else {
            this.getCustomers(page)
        }
    }
    showDataSourceParent() {
        this.getCustomers(this.state.dataSource_Select_Parent);
    }

    //Modal
    showModal = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        form.setFieldsValue({ kh_lienlac: 'DD' })
        form.setFieldsValue({ kh_gioitinh: 'Nam' })
       
        this.setState({
            dataSource_Select_Parent: this.state.customers
        })
        
        if (customer.kh_id !== undefined) {
            await this.setState({
                kh_id_visible: true,
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
            this.set_select_tendv();
            form.setFieldsValue({dm_dv_id: 0})

            this.set_select_tinh();
            if (this.state.select_tinh.length === 0) {
                form.setFieldsValue({ dm_db_id_tinh: '' })
            }
            this.set_select_huyen(customer.dm_db_id_tinh);
            if (this.state.select_huyen.length === 0) {
                form.setFieldsValue({ dm_db_id_huyen: '' })
            }
            this.set_select_xa(customer.dm_db_id_huyen);
            if (this.state.select_xa.length === 0) {
                form.setFieldsValue({ dm_db_id_xa: '' })
            }
            
            form.setFieldsValue(customer);
        }

        if (this.state.action !== 'update') {
            console.log('ddaay laf insert')
            await this.set_select_tendv();
            await form.setFieldsValue({ dm_dv_id: this.state.select_tendv[0].dm_dv_id })
            await this.set_select_tinh();
            if (this.state.select_tinh.length > 0) {
                await form.setFieldsValue({ dm_db_id_tinh: 1 })
                await this.set_select_huyen(1);
            } else {
                await form.setFieldsValue({ dm_db_id_tinh: '' })
            }
            if (this.state.select_huyen.length > 0) {
                await form.setFieldsValue({ dm_db_id_huyen: this.state.select_huyen[0].dm_db_id })
                await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_huyen: '' })
            }
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa: '' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa: this.state.select_xa[0].dm_db_id })
            }
            console.log('chuản bị koad donvi')
           
            // form.setFieldsValue({ kh_id: 'Bỏ chọn'})
        }

        // await this.set_select_tendv();

        customer.kh_ngaysinh = formDateModal(customer.kh_ngaysinh, 'dd/mm/yyyy')
    };

    set_select_tendv = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            console.log('data donvi',res.data)
            await this.setState({
                select_tendv: res.data
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
        // if (value === 'add_donvi') {
        //     console.log('dcm vao roif')
        //     return this.setState({
        //         visible_kh: true
        //     })
        // }
        const { form } = this.formRef.props
        await this.set_select_tendv(value);
        if (this.state.select_tendv.length === 0) {
            await form.setFieldsValue({ dm_dv_id: '' })
        } 
        console.log('===========================selected====================', value)
    }

    onSelectTinh = async (value) => {
        console.log('dia ban tinh')
        const { form } = this.formRef.props
        await this.set_select_huyen(value);
        if (this.state.select_huyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen: '' })
            await this.set_select_xa(-1);
            // await this.set_select_diabanxa({ dm_db_id_huyen: 0 });
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_huyen: this.state.select_huyen[0].dm_db_id })
            await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa: ' ' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa: this.state.select_xa[0].dm_db_id })
            }
        }


    }

    onSelectHuyen = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_xa(value);
        if (this.state.select_xa.length === 0) {
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_xa: this.state.select_xa[0].dm_db_id });
        }
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

    cancle = (e) => {
        console.log(e);
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

    removeSearch = () => {
        this.setState({
            textSearch: ''
        })
    }

    render() {

        const rowSelection = {
            onChange: async (selectedRowKeys, selectedRows) => {

                console.log('id check', selectedRowKeys[0])
                if (selectedRows[0]) {
                    await this.setState({
                        selectedId: selectedRowKeys[0],
                        customer: selectedRows[0]

                    })
                }
            },
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
                            <Button shape="circle" type="primary" size="large" onClick={this.showModal.bind(null)}>
                                <Icon type="plus" />
                            </Button> Thêm
                        </Col>
                        <span>
                            <Col span={2}>
                                <Button shape='circle' type="primary" size="large" onClick={this.showModal.bind(this, this.state.customer)}>
                                    <Icon type="edit" /></Button> Sửa
                        </Col>
                            <Col span={2}>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa ?"
                                    onConfirm={this.deleteCustomer.bind(this, this.state.selectedId)}
                                    onCancel={this.cancel}
                                    okText="Có"
                                    cancelText="Không">
                                    <Button shape='circle' type="danger" size="large">
                                        <Icon type="delete" /></Button> Xóa
                            </Popconfirm>
                            </Col>
                        </span>
                    </Row>
                    <br />
                    <div>
                        <Select
                            defaultValue={['kh_id']}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="select a customer"
                            optionFilterProp="children"
                            onChange={this.onChangeSearchType}
                            onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="kh_id">Mã khách</Option>
                            <Option value="kh_hovaten">Tên khách hàng</Option>
                            <Option value="kh_ngaysinh" >Ngày sinh</Option>
                            <Option value="kh_gioitinh" >Giới tính</Option>
                            <Option value="kh_dinhanhcanhan">Định danh cá nhân</Option>
                            <Option value="kh_sodienthoai">Số điện thoại</Option>
                            <Option value="kh_email">Email</Option>
                            <Option value="dm_db_id_tinh">Mã tỉnh</Option>
                            <Option value="dm_db_id_huyen">Mã huyện</Option>
                            <Option value="dm_db_id_xa">Mã xã</Option>
                            <Option value="kh_diachi">Địa chỉ</Option>
                            <Option value="dm_dv_id">Đơn vị công tác</Option>
                            <Option value="kh_vitricongtac">Vị trí công tác</Option>
                            <Option value="kh_lienlac">Liên lạc</Option>

                        </Select>
                        <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.search(value) }} enterButton />
                    </div>
                    <br />
                    <Row className='table-margin-bt'>
                        <CreateModalCustomer
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSave={this.InsertOrUpdateCustomer}
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
                        <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.customers} bordered='1' scroll={{ x: 1000 }} rowKey="kh_id">
                            <Column title="Họ" dataIndex="kh_ho" key="kh_ho" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tên lót" dataIndex="kh_tenlot" key="kh_tenlot" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tên" dataIndex="kh_ten" key="kh_ten" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Họ và tên" dataIndex="kh_hovaten" key="kh_hovaten" onHeaderCell={this.onHeaderCell} />
                            <Column title="Ngày sinh" dataIndex="kh_ngaysinh" key="kh_ngaysinh" render={text => formatDate(text, "dd/mm/yyyy")} onHeaderCell={this.onHeaderCell} />
                            <Column title="Giới tính" dataIndex="kh_gioitinh" key="kh_gioitinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Đinh danh cá nhân" dataIndex="kh_dinhdanhcanhan" key="kh_dinhdanhcanhan" onHeaderCell={this.onHeaderCell} />
                            <Column title="Số điện thoại" dataIndex="kh_sodienthoai" key="kh_sodienthoai" onHeaderCell={this.onHeaderCell} />
                            <Column title="Email" dataIndex="kh_email" key="kh_email" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa" className="hide" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa" onHeaderCell={this.onHeaderCell} />
                            <Column title="Địa chỉ" dataIndex="kh_diachi" key="kh_diachi" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã đơn vị" dataIndex="dm_dv_id" key="dm_dv_id" className='hide' disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Đơn vị" dataIndex="tendonvi" key="tendonvi" onHeaderCell={this.onHeaderCell} />
                            <Column title="Vị trí công tác" dataIndex="kh_vitricongtac" key="kh_vitricongtac" onHeaderCell={this.onHeaderCell} />
                            <Column title="Liên lạc" dataIndex="kh_lienlac" key="kh_lienlac" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
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