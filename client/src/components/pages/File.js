import React from 'react'
import { Tooltip, Pagination, Icon, Table, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Card } from 'antd'
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action'
import { fetchLoading } from '@actions/common.action'
import Modal_Filekhachhangs from '@pages/Modal/Modal_Filekhachhangs.js'
import '@styles/style.css'
const { Column } = Table;

class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file_khachhangs: [],
            pageNumber: 1,
            page: 1,
            pageSize: 10,
            count: 1,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin File',
            id_visible: false,
            action: 'insert',
            sortBy: '',
            index: 'file_tenfile',
            stateconfirmdelete: false,
            checkStateConfirm: true,
            statebuttondelete: true,
            statebuttonedit: true,
            rowthotroselected: [],
            selectedId: [],
            selectedRowKeys: [],
        }
    }

    getFile = (pageNumber) => {
        var array = []
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('filekhachhangs/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {
                if (res.data.data) {
                    this.setState({
                        file_khachhangs: res.data.data.file_khachhangs,
                        count: res.data.data.count
                    })
                }
            })
        this.props.fetchLoading({
            loading: false
        })
    }

    insertOrUpdate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            values.file_data = this.state.valuefile
            var url = this.state.action === 'insert' ? 'filekhachhangs/insert' : 'filekhachhangs/update'
            Request(url, 'POST', values)
                .then(async (response) => {
                    this.setState({
                        rowthotroselected: values
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
                    var message = 'Thanh Cong'

                    console.log("check response ", response.data.success)
                    if (!!!response.data.success) {
                        message = 'Co loi xay ra !'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    await notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getFile(this.state.page)
                })
        })
    }

    deleteFilekhachhangs = (file_tenfile) => {
        Request(`file/delete`, 'DELETE', { file_tenfile: file_tenfile })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thong Bao',
                    description: res.data.message
                });
                this.setState({
                    stateconfirmdelete: false,
                    statebuttondelete: true,
                    statebuttonedit: true,
                    selectedRowKeys: []
                })
                this.getFile(this.state.page)
                this.render()
            })
    }

    refresh = async (pageNumber) => {
        message.success('Refresh success', 1);
        await this.getFile(this.state.pageNumber)
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            id_visible: false
        });
    };

    componentDidMount() {
        this.getFile(this.state.pageNumber, this.state.index, this.state.sortBy);
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
    }

    showModal = (file_khachhangs) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        if (file_khachhangs.file_tenfile !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update',
            })
            form.setFieldsValue(file_khachhangs);
        }
    }

    confirm = (e) => {
        message.success('Bấm yes để xác nhận');
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
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

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
    }

    clearChecked = () => {
        this.onSelectChange([], [])
    };

    onChangeFile = async (e) => {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        var file = e.target.files[0];
        var fileUploadHopdong = await toBase64(file);
        var fileName = file.name;
        this.setState({
            valuefile: fileUploadHopdong,
            valuename: fileName
        })
    }

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.file_tenfile) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.file_tenfile], [row])
        }
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <div>
                <Form>
                    <Row>
                        <Card>
                            <Col span={2}>
                                <Tooltip title="Thêm File">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                        <Icon type="user-add" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Sửa File">
                                    <Button type="primary" size="default" shape="round" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                                        <Icon type="edit" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Xóa File">
                                    <Popconfirm
                                        title="Bạn chắc chắn muốn xóa?"
                                        onConfirm={this.deleteFilekhachhangs.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Có"
                                        cancelText="Không"
                                        visible={this.state.stateconfirmdelete}
                                    >
                                        <Button type="danger" style={{ marginLeft: '10px' }} shape="round" size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '18px' }} onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Card>
                    </Row>
                    <Row style={{ marginTop: 5 }}>
                        <Table rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.file_khachhangs} rowKey="file_tenfile" bordered>
                            <Column title="Tên File" dataIndex="file_tenfile" width={200} />
                            {/* <Column title="Data" dataIndex="file_data" width={250} /> */}
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} style={{ marginTop: 10 }} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
                    {/* <Modal_Filekhachhangs
                        wrappedComponentRef={this.saveFormRef}
                        title={this.state.title}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        formtype={this.state.formtype}
                        onChangeFile={this.onChangeFile}
                    /> */}
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
)(File);