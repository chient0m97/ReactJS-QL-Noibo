import React from 'react';
import {Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import { DatePicker } from 'antd';
import { Height } from 'devextreme-react/range-selector';
import GroupFilter from '@components/common/GroupFilter'
//import { Tooltip } from 'devextreme-react/bar-gauge';
import '@styles/style.css'
const { Column } = Table;
const { Option, OptGroup } = Select
const { Search } = Input;


const columnFilter = [{column: 'ns_ho', name: 'Họ', type: 'text'},{column: 'ns_tenlot', name: 'Tên lót', type: 'date'}]


class DynamicFieldSet extends React.Component {
    
    remove = k => {
        const op = ['ns_ten', 'ns_gioitinh', 'ns_email', 'ns_sodienthoai', 'ns_bangcap', 'ns_trangthai'];
        //selected.push(<Option value={''})
        const { form, tk, columnSearch } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })(<div>
                    <Select
                        defaultValue={['ns_ten']}
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.props.onCh}
                        onSearch={this.props.ons}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="ns_ten">Tên</Option>
                        <Option value="ns_gioitinh">Giới Tính</Option>
                        <Option value="ns_email">Email</Option>
                        <Option value="ns_sodienthoai">Số Điện Thoại</Option>
                        <Option value="ns_bangcap">Bằng Cấp</Option>
                        <Option value="ns_trangthai">Trạng Thái</Option>
                    </Select>,
                    <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.props.tk(value) }} enterButton />
                </div>)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            // <WrappedDynamicFieldSet2 >
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                <Tooltip title="Chọn Tìm Kiếm">
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Thêm Tìm Kiếm
                    </Button>
                </Tooltip>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);
// const WrappedDynamicFieldSet2 = Form.create({ name: 'dynamic_form_item2'})(Nhansu)
const FormModal = Form.create({ name: 'from_in_modal' })(

    class extends React.Component {

        clear = e =>{
            console.log(e);
        }

        state = {
            dateOpen: false,
        }

        onChange = (field, value) => {
            this.setState({
              [field]: value,
            });
            console.log('date is: ', value)
        };

        onDateChange = value =>{
            this.onChange('dateValue', value);
        }

        handleOpenChange = open => {
            if(!open) {
                this.setState({dateOpen: true})
            }
        }

        handleChange = async (value) => {
            //console.log(`selected ${value}`);
        }
        render() {
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="Save"
                    onCancel={onCancel}
                    onOk={onSave}
                    confirmLoading={confirmLoading}
                    //className="modal-dialog"
                    width={'94%'}
                >
                    
                    <Form layout={formtype}>
                        <Row gutter={12}>
                            <Col span={24}>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item label="ID" >
                                        {getFieldDecorator('ns_id')(<Input type="number" disabled />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={12} >
                            <Col span={4}>
                                <Form.Item label="Họ">
                                    {getFieldDecorator('ns_ho', {
                                        rules: [{ required: true, message: 'Trường này không được bỏ trống!' }]
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Tên lót">
                                    {getFieldDecorator('ns_tenlot', {
                                        rules: [{}]
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Tên">
                                    {getFieldDecorator('ns_ten', {
                                        rules: [{ required: true, message: 'Trường này không được bỏ trống!', }],
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={4}>
                                <Form.Item label="Ngày Sinh">
                                    {getFieldDecorator('ns_ngaysinh', {
                                        rules: [{ required: true, message: 'Trường này không được để trống!', }],
                                    })(
                                        <DatePicker
                                            size={"small"}
                                            placeholder = "Choose date"
                                            onChange = {this.onDateChange}
                                            format={"DD/MM/YYYY"}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item label="Giới Tính">
                                    {getFieldDecorator('ns_gioitinh', {initialValue:"Nam",
                                        rules: [{ required: true, message: 'Trường này không được để trống!', }],
                                    })(<Select
                                    size={"small"}
                                    
                                    onChange={this.handleChange}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    >
                                        <OptGroup label="Giới Tính">
                                            <Option value="Nam" label="Nam">Nam</Option>
                                            <Option value="Nữ" label="Nữ">Nữ</Option>
                                        </OptGroup>
                                        <Option value="Khác" label="Khác">Khác</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <div>
                                <Col span={4}>
                                    <Form.Item label="Trạng Thái">
                                        {getFieldDecorator('ns_trangthai', {
                                            rules: [{ required: true, message: 'Trường này không được để trống!' }]
                                        })(<Select
                                            placeholder="Khac"
                                            onChange={this.handleChange}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            optionLabelProp="label"
                                            initialValue="tt"
                                            size={"small"}
                                        >
                                            <Option value="TT" label="TT"> Thực Tập </Option>
                                            <Option value="HC" label="HC"> Học Việc </Option>
                                            <Option value="TV" label="TV"> Thử Việc</Option>
                                            <Option value="CT" label="CT"> Chính Thức </Option>
                                            <Option value="NV" label="NV"> Nghỉ Việc </Option>
                                            <Option value="Khac" label="Khac"> Khác </Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </div>
                        </Row>
                        <Row gutter={16}>
                        <Col span={4}>
                                <Form.Item label="Định danh cá nhân">
                                    {getFieldDecorator('ns_dinhdanhcanhan', {
                                        rules: [{ required: true, message: 'Trường này không được để trống!', }],
                                    })(<Input size= {"small"} type="text" style={{width:150}} allowClear onChange={this.clear} placeholder="Ví dụ: Số CMT"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Số điện thoại">
                                    {getFieldDecorator('ns_sodienthoai', {
                                        rules: [{}],
                                    })(<Input size= {"small"} type="text" style={{width:150}} allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Email">
                                    {getFieldDecorator('ns_email', {
                                        rules: [{}],
                                    })(<Input size= {"small"} type="email" placeholder="Example@abc.com" style={{width:180}} allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={6}>
                                <Form.Item label="Địa chỉ hiện nay">
                                    {getFieldDecorator('ns_diachihiennay', {
                                        rules: [{ required: true, message: 'Trường này không được để trống!' }]
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Nguyên Quán">
                                    {getFieldDecorator('ns_nguyenquan', {
                                        rules: [{ required: true, message: 'Trường này không được để trống!' }]
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Người Liên Hệ">
                                    {getFieldDecorator('ns_nguoilienhe', {
                                        rules: [{}]
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Form.Item label="Bằng Cấp">
                                    {getFieldDecorator('ns_bangcap', {
                                        rules: [{}]
                                    })(<Input size= {"small"} type="text" allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Các Giấy Tờ Đã Nộp">
                                    {getFieldDecorator('ns_cacgiaytodanop', {
                                        rules: [{}]
                                    })(<Input type="text" size={"small"} allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Tài Khoản Ngân Hàng">
                                    {getFieldDecorator('ns_taikhoannganhang', {
                                        rules: [{}]
                                    })(<Input type="text" size={"small"} allowClear onChange={this.clear}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <Form.Item label="Ngày Học Việc">
                                    {getFieldDecorator('ns_ngayhocviec', {
                                        rules: [{required: true}]
                                    })(<DatePicker
                                            size={"small"}
                                            placeholder = "Choose date"
                                            onChange = {this.onDateChange}
                                            format={"DD/MM/YYYY"}
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Ngày Thử Việc">
                                    {getFieldDecorator('ns_ngaythuviec', {
                                        rules: [{ required: true, message: 'Trường này không được để trống!' }]
                                    })(<DatePicker
                                            size={"small"}
                                            placeholder = "Choose date"
                                            onChange = {this.onDateChange}
                                            format={"DD/MM/YYYY"}
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Ngày Làm Chính Thức">
                                    {getFieldDecorator('ns_ngaylamchinhthuc', {
                                        rules: [{required: true}]
                                    })(<DatePicker
                                            size={"small"}
                                            placeholder = "Choose date"
                                            onChange = {this.onDateChange}
                                            format={"DD/MM/YYYY"}
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Ngày Đóng Bảo Hiểm">
                                    {getFieldDecorator('ns_ngaydongbaohiem', {
                                        rules: [{required: true}]
                                    })(<DatePicker
                                            size={"small"}
                                            placeholder = "Choose date"
                                            onChange = {this.onDateChange}
                                            format={"DD/MM/YYYY"}
                                    />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    },
)

class Nhansu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            nhansu: [],
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Nhân Sự',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            searchText: '',
            columnSearch: 'ns_ten',
            isSort: true,
            sortBy: '',
            index: 'ns_id',
            orderby: 'arrow-up',
            filter: {
                visible: false
            }
        }
    }


    getNhansu = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('nhansu/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {
                console.log('Content requestt')
                let data = res.data;
                if (data.data)
                    this.setState({
                        nhansu: data.data.nhansu,
                        count: Number(data.data.count),
                        abc: 1
                    })
                console.log('data')
                this.props.fetchLoading({
                    loading: false
                })
            })
    }

    insertOrUpdate = () => {
        console.log('head')
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            console.log('chưa den request')
            var url = this.state.action === 'insert' ? 'nhansu/insert' : 'nhansu/update'
            Request(url, 'POST', values)
                .then((response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visible: false,
                            message: response.data.message
                        })
                        console.log('Client - Insert -> ', response)
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thanh Cong'

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
                    this.getNhansu(this.state.page)
                })
        })
    }

    deleteNhansu = (ns_id) => {
        Request(`nhansu/delete`, 'DELETE', { ns_id: ns_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thong Bao',
                    description: res.data.message
                });
                this.getNhansu(this.state.page)
            })
    }

    refresh = (pageNumber) => {
        this.getNhansu(this.state.pageNumber)
    }

    componentDidMount() {
        this.getNhansu(this.state.pageNumber, this.state.index, this.state.sortBy);

    }


    onchangpage = (page) => {
        this.setState({
            page: page
        })
        this.getNhansu(page);
        if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getNhansu(page)
        }
    }

    search = async (xxxx) => {
        console.log('First Search');
        Request('nhansu/search', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: this.state.pageNumber,
            textSearch: xxxx,
            columnSearch: this.state.columnSearch,
            p1: this.state.index,
            p2: this.state.sortBy
        })
            .then((response) => {
                console.log('text search is: ', response.data)
                let data = response.data;
                if (data.data)
                    this.setState({
                        nhansu: data.data.nhansu,
                        count: Number(data.data.count),
                        searchText: xxxx,
                        isSearch: 1
                    })
            })
        console.log('AA', xxxx)
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
                    this.search(this.state.searchText)
                }
                else {
                    this.getNhansu(this.state.page)
                }
            },
        };
    }

    showModal = (nhansu) => {
        console.log('showmodal')
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        if (nhansu.ns_id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update'
            })
            form.setFieldsValue(nhansu);
        }
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
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }
    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            console.log('xxxx')
            this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch, this.state.codeSearch);
            console.log(this.state.page)
        }
        else {
            this.getNhansu(this.state.page, this.state.index, this.state.sortBy)
        }
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    onChange = async (value) => {
        console.log('column search', value)
        await this.setState({
            columnSearch: value,
        })
        if (this.state.searchText) {
            this.search(this.state.searchText);
        }
    }


    render() {
        
        return (
            <div>
                <GroupFilter
                    columnFilter = {columnFilter}
                >
                   
                </GroupFilter>
                <Row className="table-margin-bt">
                    <Col span={1}>
                        <Tooltip title="Thêm Nhân Sự">
                            <Button shape="circle" type="primary" size="large" onClick={this.showModal.bind(null)}>
                                <Icon type="plus" />
                            </Button>
                        </Tooltip>
                    </Col>

                    <Col span={1}>
                        <Tooltip title="Tải Lại">
                            <Button shape="circle" type="primary" size="large" onClick={this.refresh.bind(null)}>
                                <Icon type="reload" />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <WrappedDynamicFieldSet tk={this.search} onCh={this.onChange} ons={this.onSearch} columnSearch={this.state.columnSearch} />
                
                <Row className="table-margin-bt">
                    <FormModal
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        title={this.state.title}
                        formtype={this.state.formtype}
                        id_visible={this.state.id_visible}
                        
                    />
                    <Table pagination={false} dataSource={this.state.nhansu} rowKey="ns_id" bordered scroll={{ x: 1000 }}>
                        <Column
                            title={<span> ID <Icon type={this.state.orderby} /></span>}
                            dataIndex="ns_id"
                            key="ns_id"
                            onHeaderCell={this.onHeaderCell}
                            
                        />
                        <Column title="Họ" dataIndex="ns_ho" key="ns_ho" onHeaderCell={this.onHeaderCell} />
                        <Column title="Tên Lót" dataIndex="ns_tenlot" key="ns_tenlot" onHeaderCell={this.onHeaderCell} />
                        <Column title="Tên" dataIndex="ns_ten" key="ns_ten" onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày Sinh" dataIndex="ns_ngaysinh" key="ns_ngaysinh" onHeaderCell={this.onHeaderCell} />
                        <Column title="Giới Tính" dataIndex="ns_gioitinh" key="ns_gioitinh" onHeaderCell={this.onHeaderCell} />
                        <Column title="Định danh cá nhân" dataIndex="ns_dinhdanhcanhan" key="ns_dinhdanhcanhan" onHeaderCell={this.onHeaderCell} />
                        <Column title="Số điện thoại" dataIndex="ns_sodienthoai" key="ns_sodienthoai" onHeaderCell={this.onHeaderCell} />
                        <Column title="Email" dataIndex="ns_email" key="ns_email" onHeaderCell={this.onHeaderCell} />
                        <Column title="Địa chỉ hiện nay" dataIndex="ns_diachihiennay" key="ns_diachihiennay" onHeaderCell={this.onHeaderCell} />
                        <Column title="Nguyên quán" dataIndex="ns_nguyenquan" key="ns_nguyenquan" onHeaderCell={this.onHeaderCell} />
                        <Column title="Người liên hệ" dataIndex="ns_nguoilienhe" key="ns_nguoilienhe" onHeaderCell={this.onHeaderCell} />
                        <Column title="Bằng cấp" dataIndex="ns_bangcap" key="ns_bangcap" onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày học việc" dataIndex="ns_ngayhocviec" key="ns_ngayhocviec" onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày thử việc" dataIndex="ns_ngaythuviec" key="ns_ngaythuviec" onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày làm chính thức" dataIndex="ns_ngaylamchinhthuc" key="ns_ngaylamchinhthuc" onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày đóng bảo hiểm" dataIndex="ns_ngaydongbaohiem" key="ns_ngaydongbaohiem" onHeaderCell={this.onHeaderCell} />
                        <Column title="Các giấy tờ đã nộp" dataIndex="ns_cacgiaytodanop" key="ns_cacgiaytodanop" onHeaderCell={this.onHeaderCell} />
                        <Column title="Tài khoản ngân hàng" dataIndex="ns_taikhoannganhang" key="ns_taikhoannganhang" onHeaderCell={this.onHeaderCell} />
                        <Column title="Trạng thái" dataIndex="ns_trangthai" key="ns_trangthai" onHeaderCell={this.onHeaderCell} />
                        <Column
                            visible={false}
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <Button style={{ marginRight: 20 }} type="primary" onClick={this.showModal.bind(record.ns_id, text)}>
                                        <Icon type="edit" />
                                    </Button>
                                    <Popconfirm
                                        title="Bạn chắc chắn muốn xóa?"
                                        onConfirm={this.deleteNhansu.bind(this, record.ns_id)}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No">
                                        <Button type="danger"  >
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </span>
                            )}
                        />
                    </Table>
                </Row>
                <Row>
                    <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                </Row>
            </div>
        );
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
)(Nhansu);