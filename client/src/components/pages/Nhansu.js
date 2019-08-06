import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Spin, Card } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import '@styles/style.css'
import { Value } from 'devextreme-react/range-selector';
//import { format } from 'util';
import { async } from 'q';
import { array } from 'prop-types';
const { Column } = Table;
const { Option } = Select
const { Search } = Input;


let id = 0;
var formatDateModal = require('dateformat')

const FormModal = Form.create({ name: 'from_in_modal' })(

    class extends React.Component {

        clear = e => {
            console.log(e);
        }

        onChange = (field, value) => {
            this.setState({
                [field]: value,
            });
            console.log('date is: ', value)
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
            //console.log(`selected ${value}`);
        }
        render() {
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible } = this.props;
            const { getFieldDecorator } = form;
            const selectBefore = (
                <Select placeholder="(+84)" defaultValue="0" style={{ width: 80 }}>
                    <Option value="0">(+84)</Option>
                </Select>
            );
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
                    <Form layout={formtype}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item  >
                                        {getFieldDecorator('ns_id')(<Input type="text" hidden />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={6}>
                                <Form.Item label="Họ">
                                    {getFieldDecorator('ns_ho', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(
                                        <Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tên lót">
                                    {getFieldDecorator('ns_tenlot', {
                                        rules: [{}]
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tên">
                                    {getFieldDecorator('ns_ten', {
                                        rules: [{ required: true, message: 'Trường không được để trống!', }],
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="Ngày Sinh">
                                    {getFieldDecorator('ns_ngaysinh', {
                                        rules: [{ required: true, message: 'Trường không được để trống!', }],
                                    })(
                                        <Input type="date" size={"small"} onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Giới Tính">
                                    {getFieldDecorator('ns_gioitinh', {
                                        initialValue: "Nam",
                                        rules: [{ required: true, message: 'Trường không được để trống', }],
                                    })(<Select
                                        size={"small"}
                                        onChange={this.handleChange}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Nam" >Nam</Option>
                                        <Option value="Nữ" >Nữ</Option>
                                        <Option value="Khác" >Khác</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <div>
                                <Col span={6}>
                                    <Form.Item label="Trạng thái">
                                        {getFieldDecorator('ns_trangthai', {
                                            rules: [{ required: true, message: 'Trường không được để trống!' }]
                                        })(<Select
                                            onChange={this.handleChange}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            initialValue="TT"
                                            size={"small"}
                                        >
                                            <Option value="TT" > Thực Tập </Option>
                                            <Option value="HC" > Học Việc </Option>
                                            <Option value="TV" > Thử Việc </Option>
                                            <Option value="CT" > Chính Thức </Option>
                                            <Option value="NV" > Nghỉ Việc </Option>
                                            <Option value="Khac" > Khác </Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </div>
                            <Col span={1} offset={2}><Spin size="large" /></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item label="Định danh cá nhân(Cmt/ Thẻ căn cước)">
                                    {getFieldDecorator('ns_dinhdanhcanhan', {
                                        rules: [{ required: true, message: 'Trường không được để trống!', }],
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Số điện thoại">
                                    {getFieldDecorator('ns_sodienthoai', {
                                        rules: [{}],
                                    })(<Input addonBefore={selectBefore} size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Email">
                                    {getFieldDecorator('ns_email', {
                                        rules: [{}],
                                    })(<Input size={"small"} type="email" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item label="Địa chỉ hiện nay">
                                    {getFieldDecorator('ns_diachihiennay', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Nguyên quán">
                                    {getFieldDecorator('ns_nguyenquan', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Người liên hệ">
                                    {getFieldDecorator('ns_nguoilienhe', {
                                        rules: [{}]
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item label="Bằng cấp">
                                    {getFieldDecorator('ns_bangcap', {
                                        rules: [{}]
                                    })(<Input size={"small"} type="text" allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Các giấy tờ đã nộp">
                                    {getFieldDecorator('ns_cacgiaytodanop', {
                                        rules: [{}]
                                    })(<Input type="text" size={"small"} allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tài khoản ngân hàng">
                                    {getFieldDecorator('ns_taikhoannganhang', {
                                        rules: [{}]
                                    })(<Input type="text" size={"small"} allowClear onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="Ngày học việc">
                                    {getFieldDecorator('ns_ngayhocviec', {
                                        rules: [{}]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Ngày thử việc">
                                    {getFieldDecorator('ns_ngaythuviec', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Ngày làm chính thức">
                                    {getFieldDecorator('ns_ngaylamchinhthuc', {
                                        rules: [{}]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Ngày đóng bảo hiểm">
                                    {getFieldDecorator('ns_ngaydongbaohiem', {
                                        rules: [{}]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    },
)


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
}

class Nhansu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            nhansu: [],
            nhansuget: [],
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
            rowthotroselected: {},
            statebuttonedit: true,
            statebuttondelete: true,
            stateconfirmdelete: false,
            selectedRowKeys: [],
            selectedId: [],
            selectedrow: [],
        }
    }


    formatDate(strDate, strFormat) {
        console.log(strDate, strFormat);
        if (strDate == null)
            return null;
        var d = new Date(strDate);
        return d;
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
                this.setState({
                    nhansu: res.data.data.nhansu,
                    count: res.data.data.count
                })
                this.props.fetchLoading({
                    loading: false
                })
            })

    }

    insertOrUpdate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            console.log("trong validatefields ", values)
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'nhansu/insert' : 'nhansu/update'
            console.log('action is: ', url)
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
                    var message = 'Thanh Cong'

                    console.log("check response ", response.data.message)
                    if (!!!response.data.success) {
                        message = 'Co loi xay ra !'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    console.log("f")
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

    refresh = async (pageNumber) => {

        await this.getNhansu(this.state.pageNumber)
        console.log(this.state.nhansu, 'asdasdasdasdasdasdasd')
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
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        form.setFieldsValue({ ns_trangthai: 'TT' })
        if (nhansu.ns_id !== undefined) {
            console.log("day la update")
            this.setState({
                id_visible: true,
                action: 'update'
            })
            nhansu.ns_ngaysinh = formatDateModal(nhansu.ns_ngaysinh, 'yyyy-mm-dd')
            nhansu.ns_ngayhocviec = formatDateModal(nhansu.ns_ngayhocviec, 'yyyy-mm-dd')
            nhansu.ns_ngaythuviec = formatDateModal(nhansu.ns_ngaythuviec, 'yyyy-mm-dd')
            nhansu.ns_ngaylamchinhthuc = formatDateModal(nhansu.ns_ngaylamchinhthuc, 'yyyy-mm-dd')
            nhansu.ns_ngaydongbaohiem = formatDateModal(nhansu.ns_ngaydongbaohiem, 'yyyy-mm-dd')
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
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
        }

        var formatDate = require('dateformat')
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={2}>
                            <Tooltip title="Thêm Nhân Sự">
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
                            <Tooltip title="Tải Lại">
                                <Button shape="circle" type="primary" size="default" onClick={this.refresh.bind(null)}>
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
                    />
                    <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.nhansu} rowKey="ns_id" bordered scroll={{ x: 1000 }}>
                        <Column title="Định danh cá nhân" dataIndex={"ns_dinhdanhcanhan"} align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Họ và tên" width={150} dataIndex="ns_hovaten" key="ns_hovaten" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày sinh" dataIndex="ns_ngaysinh" key="ns_ngaysinh" align="center" render={text => formatDate(text, "dd/mm/yyyy")} onHeaderCell={this.onHeaderCell} />
                        <Column title="Giới tính" dataIndex="ns_gioitinh" key="ns_gioitinh" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Số điện thoại" dataIndex="ns_sodienthoai" key="ns_sodienthoai" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Email" dataIndex="ns_email" key="ns_email" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Địa chỉ hiện nay" width={150} dataIndex="ns_diachihiennay" key="ns_diachihiennay" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Nguyên quán" dataIndex="ns_nguyenquan" key="ns_nguyenquan" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Người liên hệ" dataIndex="ns_nguoilienhe" key="ns_nguoilienhe" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Bằng cấp" dataIndex="ns_bangcap" key="ns_bangcap" align="center" onHeaderCell={this.onHeaderCell} />
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