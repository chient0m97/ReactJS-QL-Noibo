import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import { async } from 'q';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;


const FormModal = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { Option } = Select;
            const combobox = [];

            combobox.push(<Option key={'HD'}>Hoạt động</Option>);
            combobox.push(<Option key={'DHD'}>Dừng hoạt động</Option>);
            combobox.push(<Option key={'GT'}>Giải thể</Option>);
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, dm_dv_id_visible, handleChange, select_diabanhuyen, select_diabantinh, select_diabanxa, onSelectDiaBanTinh, onSelectDiaBanHuyen, onSelectDiaBanXa, select_tenkh } = this.props;
            const { getFieldDecorator } = form;
            var datacha = this.props.datacha

            return (
                <div>
                    <Modal
                        visible={visible}
                        title="NHẬP THÔNG TIN ĐƠN VỊ:"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onSave}
                        confirmLoading={confirmLoading}
                        width={1000}
                    >
                        <Form layout={formtype}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <div style={{ display: dm_dv_id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item label="Mã Đơn vị:">
                                            {getFieldDecorator('dm_dv_id', {
                                                rules: [{}],
                                            })(<Input type="text" disabled />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label='Tên Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_ten', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Địa Chỉ Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_diachi', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Địa Bàn Tỉnh'>
                                        {getFieldDecorator('dm_db_id_tinh', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanTinh}>
                                            {
                                                select_diabantinh.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã Địa Bàn Huyện'>
                                        {getFieldDecorator('dm_db_id_huyen', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanHuyen}>
                                            {
                                                select_diabanhuyen.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã Địa Bàn Xã'>
                                        {getFieldDecorator('dm_db_id_xa', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanXa}>
                                            {
                                                select_diabanxa.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Mã Số Thuế Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_masothue', {
                                            // rules: [ {required: true, message: 'Vui lòng nhập vào ô này !!'}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Số Điện Thoại Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_sodienthoai', {
                                            // rules: [ {required: true, message: 'Vui lòng nhập vào ô này !!'}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Trạng Thái Đơn Vị'>
                                        {getFieldDecorator('dm_dv_trangthai', {
                                            rules: [{ required: true }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            onChange={handleChange}
                                        >
                                            {combobox}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label='Mã Người Đại Diện'>
                                        {getFieldDecorator('kh_id_nguoidaidien', {
                                            // rules: [ {required: true,}],
                                        })(<Select>{
                                            select_tenkh.map((value, index) => {
                                                    return (
                                                        <Option value={value.kh_id}>{value.kh_ten}</Option>
                                                    )
                                                })}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Đơn vị cấp trên:">
                                        {getFieldDecorator('dm_dv_id_cha', {
                                            // rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!',}],
                                        })(
                                            <Select>
                                                {datacha.map((item, i) => {
                                                    return (
                                                        <Option value={item.dm_dv_id}>{item.dm_dv_ten}</Option>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Form>

                    </Modal>
                </div>
            );

        }
    },
)


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
            select_tenkh:[]
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

    getUnits = (pageNumber) => {
        console.log('asasd')
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
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'unit/insert' : 'unit/update'
            Request(url, 'POST', values)
                .then((response) => {
console.log("hien thi ",url)
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
                    //thông báo lỗi vào thành công
                    notification[notifi_type]({
                        message: message,
                        description: description
                    })
                    // if(dm_dv_id_cha.setValue(unit.dm_dv_id == unit.dm_dv_ten)){
                    //     return null;
                    // }
                    this.getUnits(this.state.page)
                })
        });
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
            visible: true
        });
        form.resetFields();
        form.setFieldsValue({ dm_dv_trangthai: 'HD' })

        await this.set_select_diabantinh();
        await form.setFieldsValue({ dm_db_id_tinh: 1 })

        await this.set_select_diabanhuyen(1);
        await form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })

        await this.set_select_diabanxa({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id });
        await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })


        this.setState({
            dataSource_Select_Parent: this.state.units
        })
        if (unit.dm_dv_id !== undefined) {
            this.setState({
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


            // unit.dm_dv_id = Number(unit.dm_dv_id)
            form.setFieldsValue(unit);
        }
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

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    removeSearch = () => {
        this.setState({
            textSearch: ''
        })
    }

    set_select_tenkh = async () => {
        await Request('unit/getkhachhang', 'POST', {
        }).then(async (res) => {
            await this.setState({
                select_tenkh : res.data
            })
        })
    }

    set_select_diabantinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            console.log(res.data, 'data tinh')
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
            console.log(res.data, 'data res huyen')
            await this.setState({
                select_diabanhuyen: res.data
            })
        })
    }

    set_select_diabanxa = async (id_db_huyen) => {
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then((res) => {
            this.setState({
                select_diabanxa: res.data
            })
        })
    }

    onSelectDiaBanTinh = async (value) => {
        console.log('dia ban tinh')
        const { form } = this.formRef.props
        await this.set_select_diabanhuyen(value);

        if (this.state.select_diabanhuyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen: '' })
            await this.set_select_diabanxa({ dm_db_id_huyen: 0 });
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
            await this.set_select_diabanxa({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id });
            if (this.state.select_diabanxa.length !== 0) {
                await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa: ' ' })
            }
        }


    }

    onSelectDiaBanHuyen = async (value) => {
        const { form } = this.formRef.props
        // await this.set_select_diabanhuyen(value);
        // await form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
        console.log('value diaban huye', value)
        await this.set_select_diabanxa({ dm_db_id_huyen: value });
        if (this.state.select_diabanhuyen.length === 0) {
            console.log('dcm')
            // await form.setFieldsValue({ dm_db_id_huyen: '' })
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            if (this.state.select_diabanxa.length === 0) {
                await this.set_select_diabanxa({ dm_db_id_huyen: 0 });
                await form.setFieldsValue({ dm_db_id_xa: '' })
            }
            else{
                 await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
            }
           
        }

        

    }

    // onSelectDiaBanXa = async (value) => {
    //     const { form } = this.formRef.props
    //     if (this.state.select_diabanxa.length !== 0) {
    //         await form.setFieldsValue(value)
    //     }else{
    //         await form.setFieldsValue({ dm_db_id_xa: '' })
    //     }
    // }
    


    render() {
        const rowSelection = {
            onChange: async (selectedRowKeys, selectedRows) => {

                console.log('id check', selectedRowKeys[0])
                if (selectedRows[0]) {
                    await this.setState({
                        selectedId: selectedRowKeys[0],
                        unit: selectedRows[0]

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
                                <Button shape='circle' type="primary" size="large" onClick={this.showModal.bind(this, this.state.unit)}>
                                    <Icon type="edit" /></Button> Sửa
                        </Col>
                            <Col span={2}>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa ?"
                                    onConfirm={this.deleteUnit.bind(this, this.state.selectedId)}
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
                        <FormModal
                            datacha={this.state.dataSource_Select_Parent}
                            wrappedComponentRef={this.saveFormRef}
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
                        />
                        <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.units} bordered='1' rowKey="dm_dv_id">
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