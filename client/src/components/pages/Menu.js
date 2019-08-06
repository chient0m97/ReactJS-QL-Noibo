import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import Modal_Menu from '@pages/Modal/Modal_Menu.js'
import '@styles/style.css'
const { Column } = Table;
const { Option } = Select

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            pageNumber: 1,
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Menu',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            isSort: true,
            sortBy: '',
            index: 'dm_menu_id',
            orderby: 'arrow-up',
            stateconfirmdelete: false,
            checkStateConfirm: true,
            statebuttondelete: true,
            statebuttonedit: true,
            rowthotroselected: [],
            selectedId: [],
            selectedRowKeys: [],
            listmenu: [],
        }
    }

    getMenu = (pageNumber) => {
        var array = []
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('menu/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {
                res.data.data.menus.map((values, index) => {
                    array.push({ id: values.dm_menu_id, name: values.dm_menu_name, icon: values.dm_menu_icon_class })
                })
                console.log('hien thi array ', array)
                this.setState({
                    listmenu: array
                })
                this.setState({
                    menu: res.data.data.menus,
                    count: res.data.data.count
                })
                this.props.fetchLoading({
                    loading: false
                })
            })
    }

    insertOrUpdate = () => {
        console.log("hien thi trong insert")
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            console.log("Hien thi trong err")
            if (err) {
                return
            }
            console.log("hien thi values", values)
            if(values.dm_menu_id_parent==='notmenuparent'){
                values.dm_menu_id_parent=null
            }
            var url = this.state.action === 'insert' ? 'menu/insert' : 'menu/update'
            Request(url, 'POST', values)
                .then(async (response) => {
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
                    this.getMenu(this.state.page)
                })
        })
    }

    deleteMenu = (dm_menu_id) => {
        console.log("Hien thi dm_menu_id ", dm_menu_id)
        Request(`menu/delete`, 'DELETE', { dm_menu_id: dm_menu_id })
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
                this.getMenu(this.state.page)
                this.render()
            })
    }

    refresh = async (pageNumber) => {

        await this.getMenu(this.state.pageNumber)
        console.log(this.state.menu, 'asdasdasdasdasdasdasd')
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            id_visible: false
        });
    };

    componentDidMount() {
        this.getMenu(this.state.pageNumber, this.state.index, this.state.sortBy);
    }

    showModal = (menu) => {
        console.log("hien thi gia tri truyen vao ", menu)
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        if (menu.dm_menu_id !== undefined) {
            console.log("day la update")
            this.setState({
                id_visible: true,
                action: 'update',
            })
            form.setFieldsValue(menu);
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
        console.log("hien thi selectedrowkeys ",selectedRowKeys)
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
                                <Tooltip title="Thêm Menu">
                                    <Button shape="circle" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                        <Icon type="user-add" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Sửa Menu">
                                    <Button type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                                        {/* <Button type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled> */}
                                        <Icon type="edit" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Xóa Menu">
                                    <Popconfirm
                                        title="Bạn chắc chắn muốn xóa?"
                                        onConfirm={this.deleteMenu.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                        visible={this.state.stateconfirmdelete}
                                    >
                                        <Button type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="circle" type="primary" size="default" style={{ marginLeft: '18px' }} onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Card>
                    </Row>
                    <Row style={{ marginTop: 5 }}>
                        <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.menu} rowKey="dm_menu_id" bordered >
                            <Column title="Url" dataIndex="dm_menu_url" width={400} />
                            <Column title="Name" dataIndex="dm_menu_name" width={400} />
                            <Column title="Icon" dataIndex="dm_menu_icon_class"
                                render={text => {
                                    return <Icon type={text} />
                                }}
                            />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} style={{ marginTop: 10 }} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
                    <Modal_Menu
                        wrappedComponentRef={this.saveFormRef}
                        title={this.state.title}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        formtype={this.state.formtype}
                        id_visible={this.state.id_visible}
                        listmenu={this.state.listmenu}
                    />
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
)(Menu);