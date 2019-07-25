import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
// import { type } from 'os';
// import { unwatchFile } from 'fs';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
var formDateModal = require('dateformat');

const FormModal = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {

        render() {
            const { Option } = Select;
            const combobox = [];
            const comboboxx = [];

            combobox.push(<Option key={'DD'}>Đại diện</Option>);
            combobox.push(<Option key={'DM'}>Đầu mối liên lạc</Option>);
            combobox.push(<Option key={'TXLL'}>Thường xuyên liên lạc</Option>);

            comboboxx.push(<Option key={'Nam'}>Nam</Option>);
            comboboxx.push(<Option key={'Nữ'}>Nữ</Option>);
            comboboxx.push(<Option key={'Khác'}>Khác</Option>);

            const dateFormat = "YYYY-MM-DD";

            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, kh_id_visible, handleChange } = this.props;
            console.log(kh_id_visible)
            const { getFieldDecorator } = form;
            // var datacha = this.props.datacha
            return (
                <div>
                    <Modal
                        visible={visible}
                        title="NHẬP THÔNG TIN KHÁCH HÀNG:"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onSave}
                        confirmLoading={confirmLoading}
                        width={1000}
                    >
                        <Form layout={formtype}>
                            <Row>
                                <Col span={24}>
                                    <div style={{ display: kh_id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item label="Mã khách hàng:">
                                            {getFieldDecorator('kh_id', {
                                                rules: [{}]
                                            })(<Input type="text" disabaled />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Họ:'>
                                        {getFieldDecorator('kh_ho', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Tên lót:'>
                                        {getFieldDecorator('kh_tenlot', {
                                            rules: [{}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Tên:'>
                                        {getFieldDecorator('kh_ten', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={5}>
                                    <Form.Item label='Ngày sinh:'>
                                        {getFieldDecorator('kh_ngaysinh', {
                                            // rules: [{}],
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(
                                        <Input type="date" size="small" format={dateFormat} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label='Giới tính:'>
                                        {getFieldDecorator('kh_gioitinh', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder='Please select'
                                            onChange={handleChange}
                                        >
                                            {comboboxx}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label='Định danh cá nhân:'>
                                        {getFieldDecorator('kh_dinhdanhcanhan', {
                                            rules: [{}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label='Email:'>
                                        {getFieldDecorator('kh_email', {
                                            rules: [{}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label='Số điện thoại:'>
                                        {getFieldDecorator('kh_sodienthoai', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Mã tỉnh:'>
                                        {getFieldDecorator('dm_db_id_tinh', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã huyện:'>
                                        {getFieldDecorator('dm_db_id_huyen', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã xã:'>
                                        {getFieldDecorator('dm_db_id_xa', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label='Địa chỉ:'>
                                        {getFieldDecorator('kh_diachi', {
                                            rules: [{}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Mã đơn vị:'>
                                        {getFieldDecorator('dm_dv_id', {
                                            rules: [{}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Vị trí công tác:'>
                                        {getFieldDecorator('kh_vitricongtac', {
                                            rules: [{}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Liên lạc:'>
                                        {getFieldDecorator('kh_lienlac', {
                                            rules: [{}],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder='Please select'
                                            onChange={handleChange}
                                        >
                                            {combobox}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            )
        }
    }
)

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
            dataSource_Select_Parent: [],
            customers: []
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
            .then((response) => {
                let data = response.data;
                console.log(data, 'data trả về')
                if (data.data)
                    this.setState({
                        customers: data.data.customers,
                        count: Number(data.data.count)
                    })
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
    showModal = (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        form.setFieldsValue({ kh_lienlac: 'DD' })
        form.setFieldsValue({ kh_gioitinh: 'Nam' })
        // this.setState({
        //     dataSource_Select_Parent: this.state.customers
        // })
        if (customer.kh_id !== undefined) {
            this.setState({
                kh_id_visible: true,
                action: 'update'
            })
            // var dataSourceCha = []

            // this.state.customers.map((value, index) => {
            //     if (value.kh_id !== customer.kh_id) {
            //         dataSourceCha.push(value)
            //     }
            // })

            // this.setState({
            //     dataSource_Select_Parent: dataSourceCha
            // })

            form.setFieldsValue(customer);
            customers.kh_ngaysinh=formDateModal(customers.kh_ngaysinh, 'dd/mm/yyyy')
        }
    };

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
                            <Option value="kh_ho">Họ</Option>
                            <Option value="kh_tenlot">Tên lót</Option>
                            <Option value="kh_ten" >Tên khách</Option>
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
                        <FormModal
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSave={this.InsertOrUpdateCustomer}
                            title={this.state.title}
                            formtype={this.state.formtype}
                            dateFormat={this.state.formatDate}
                            kh_id_visible={this.state.kh_id_visible}
                        />
                        <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.customers} bordered='1' rowKey="kh_id">
                            <Column title="Họ" dataIndex="kh_ho" key="kh_ho" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tên lót" dataIndex="kh_tenlot" key="kh_tenlot" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tên" dataIndex="kh_ten" key="kh_ten" className='hide' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Họ và tên" dataIndex="kh_hovaten" key="kh_hovaten" onHeaderCell={this.onHeaderCell} />
                            <Column title="Ngày sinh" dataIndex="kh_ngaysinh" key="kh_ngaysinh" render={text => formatDate(text, "dd/mm/yyyy")} onHeaderCell={this.onHeaderCell} />
                            <Column title="Giới tính" dataIndex="kh_gioitinh" key="kh_gioitinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Đinh danh cá nhân" dataIndex="kh_dinhdanhcanhan" key="kh_dinhdanhcanhan" onHeaderCell={this.onHeaderCell} />
                            <Column title="Số điện thoại" dataIndex="kh_sodienthoai" key="kh_sodienthoai" onHeaderCell={this.onHeaderCell} />
                            <Column title="Email" dataIndex="kh_email" key="kh_email" onHeaderCell={this.onHeaderCell} />
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