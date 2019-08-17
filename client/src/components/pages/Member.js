import React, { Component } from 'react';
import { Pagination, Checkbox, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
import Request from '@apis/Request'
import { NavLink } from 'react-router-dom'
import '@styles/style.css';
import { thisExpression } from '@babel/types';
import { async } from 'q';
const { Column } = Table;
class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            searchText: '',
            columnSearch: 'name',
            isSort: true,
            sortBy: 'ASC',
            index: 'name',
            orderby: 'arrow-up',
            nameSearch: '',
            emailSearch: '',
            phoneSearch: '',
            passwordSearch: '',
            fullnameSearch: '',
            codeSearch: '',
            roleVisible: 'none',
            modalRoleVisible: false,
            actionColumn: 'action-hide',
            users: [],
            selectedRowKeys: [],
            showModal: false,
            listMemAdd: [],
            listMemDelete:[]
        }
    }
    //--------------DELETE-----------------------
    deleteUser = (id) => {
        Request(`member/delete`, 'DELETE', { id: id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.getUsers(this.state.page)
            })
    }
    componentDidMount() {
        this.getUsers(this.state.pageNumber);

    }
    getUsers = (pageNumber) => {
        let a = this.props.location.pathname.split('/')[2]

        if (pageNumber <= 0)
            return;

        Request('member/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            a
        })
            .then((response) => {
                console.log('response', response)
                if (response) {
                    let data = response.data;
                    console.log(data)
                    let objUsers = Object.keys(data.data.users[0])
                    if (data.data)
                        this.setState({
                            objUsers: objUsers,
                            users: data.data.users,
                            count: Number(data.data.count)//eps kieeru veef
                        })

                }

            })

    }
    listMemberAdd = () => {
        Request('member/listmember', 'POST').then(res => {
            console.log('response', res)
        })
    }

    InsertOrUpdateUser = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'user/insert' : 'user/update'
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
                    var message = 'Thành công'

                    if (!!!response.data.success) {
                        message = 'Lỗi Cmnr'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    //thông báo lỗi vòa thành công
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getUsers(this.state.page)
                })
        });
    }

    deleteMember = () => {
        console.log('deletettttttt')
        let a = this.props.location.pathname.split('/')[2]
        let listmem = this.state.listMemDelete
        Request('member/delete','POST',{a,listmem}).then(res=>{
            console.log(res)
            this.getUsers(this.state.pageNumber)
        })
    }
    showModal = () => {
        console.log('dasdasdasdasdsadasddcmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        this.setState({
            showModal: true
        })
        let a = this.props.location.pathname.split('/')[2]
        Request('member/listmember', 'POST', {
            groupName: a,
            pageSize: this.state.pageSize,
            pageNumber: this.state.page
        }

        ).then(res => {
            console.log(res)
            this.setState({
                members: res.data
            })
        })
    }
    onCancel = () => {
        this.setState({
            showModal: false
        })
    }
    onOk = async () => {
        let mem = this.state.listMemAdd
        let a = this.props.location.pathname.split('/')[2]
        await Request('member/add', 'POST', { mem, a }).then(res => {
            console.log(res)
            if (res.data) {
                message.success('thêm mới thành công')
                this.setState({
                    showModal: false,
                    listMemAdd: []
                })
                this.getUsers(this.state.pageNumber)
            }
        })
    }

    render() {
        const rowSelection = {
            hideDefaultSelections: true,
            onChange: async (selectedRowKeys, selectedRows) => {
              this.setState({
                  listMemDelete:selectedRowKeys
              })
            },
        }
        const rowMemberSelection = {
            hideDefaultSelections: true,
            onChange: async (selectedRowKeys, selectedRows) => {
                console.log('selectttttttttttttttttttttttttttt', selectedRowKeys)
                this.setState({
                    listMemAdd: selectedRowKeys
                })
            },
        }
        return (
            <div>
                <Modal
                    title="Thêm Member"
                    visible={this.state.showModal}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    <Table
                        rowSelection={rowMemberSelection}
                        dataSource={this.state.members}
                        rowKey="name"
                    >
                        <Column title="Member" dataIndex="name" key="name" />
                    </Table>
                </Modal>
                <Button style={{ margin: '20px' }}>
                    <NavLink to="/group" className=""> <Icon type="arrow-left" /> </NavLink >
                </Button>Back
                <Button style={{ margin: '20px' }} onClick={this.showModal}>
                    <Icon type="user-add" />
                </Button>Thêm member
                <Button style={{ margin: '20px' }} onClick={this.deleteMember}>
                    <Icon type="user-delete" />
                </Button>Xóa member
                <Row>
                    <Table
                        rowSelection={rowSelection}
                        dataSource={this.state.users} rowKey="name" 
                        Pagination={false}

                        >
                        <Column className="action-hide"
                            title={<span>Id <Icon type={this.state.orderby} /></span>}
                            dataIndex="id"
                            key="id"

                        />
                        <Column title={<span>UserName <Icon type={this.state.orderby} /></span>} dataIndex="name" key="name"
                        />
                        <Column className="action-hide" title="Password" dataIndex="password" key="password" />
                        <Column className="action-hide" title="Phone Number" dataIndex="phone" key="phone" />
                        <Column title="Full Name" dataIndex="fullname" key="fullname" />
                        <Column title="Email" dataIndex="email" key="email" />


                    </Table>
                </Row>
                <Row>
                    <Pagination showSizeChanger  showQuickJumper />
                </Row>
            </div>
        );
    }
}

export default Member;