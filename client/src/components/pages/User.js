import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';


const token = cookie.load('token');
const { Column } = Table;
const {Option} = Select
const { Search } = Input;

const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
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
          width={1000}
        >
          <Form layout={formtype}>
            <Row gutter={24}>
              <Col span={24}>
                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                  <Form.Item label="Id:" >
                    {getFieldDecorator('id')(<Input type="number" disabled />)}
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Code:">
                  {getFieldDecorator('code', {
                    rules: [ { required: true, message: 'Trường này không được bỏ trống!',  validateStatus: 'error'},
                     ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên đầy đủ:">
                  {getFieldDecorator('fullname', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tên đăng nhập">
                  {getFieldDecorator('name', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" placeholder="user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mật khẩu:">
                  {getFieldDecorator('password', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Email:">
                  {getFieldDecorator('email', {
                    rules: [ { required: true, message: 'Trường này không được để trống!' }, { email: true, message: 'Trường này phải là email!' } ],
                  })(<Input type="email" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại:">
                  {getFieldDecorator('phone', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
)

class User extends React.Component {
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
      columnSearch: '',
      isSort: true,
      sortBy: '',
      index: 'id',
      orderby: 'arrow-up',
    }
  }
  //--------------DELETE-----------------------
  deleteUser = (id) => {
    Request(`user/delete`, 'DELETE', { id: id })
      .then((res) => {
        notification[ res.data.success === true ? 'success' : 'error' ]({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getUsers(this.state.page)
      })
  }

  getUsers = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })
    Request('user/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        if (data.data)
          this.setState({
            users: data.data.users,
            count: Number(data.data.count)//eps kieeru veef
          })
        this.props.fetchLoading({
          loading: false
        })
      })
  }
  // insert---------------------------------

  InsertOrUpdateUser = () => {
    const { form } = this.formRef.props;
form.setFields({
      name: {
        value:'sdsdsds',
        errors: [new Error('forbid ha')],
      },
    });    form.validateFields((err, values) => {
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
            message = 'Có lỗi xảy ra!'
            notifi_type = 'error'
            description = response.data.message.map((value, index) => {
              return <Alert type='error' message={value}></Alert>
            })
          }
          //thông báo lỗi vòa thành công
          notification[ notifi_type ]({
            message: message,
            description: description
          });
          this.getUsers(this.state.page)
        })
    });
  }

  refresh = (pageNumber) => {
    this.getUsers(this.state.pageNumber)
  }

  componentDidMount() {
    this.getUsers(this.state.pageNumber, this.state.index, this.state.sortBy);
  }

  onchangpage = (page) => {
    this.setState({
      page: page
    })

    this.getUsers(page); if (this.state.isSearch === 1) {
      this.search(this.state.searchText)
    }
    else {
      this.getUsers(page)
    }
  }

  showModal = (user) => {
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    form.resetFields();
    if (user.id !== undefined) {
      this.setState({
        id_visible: true,
        action: 'update'
      })
      form.setFieldsValue(user);
    }
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false
    });
  };

  handleChangeInput = (e) => {
    let state = this.state;
    state[ e.target.name ] = e.target.value;
    this.setState(state);
  }
  handleCount = () => {
    let count = this.state.count;
    this.setState({
      count: count + 1
    })
  }
  confirm = (e) => {
    console.log(e);
    message.success('Bấm yes để xác nhận');
  }

  cancel = (e) => {
    console.log(e);
  }

  showTotal = (total) => {
    return `Total ${total} items`;
  }
  onShowSizeChange = async (current, size) => {
    console.log('size', size);
    console.log('curent', current);
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      console.log('xxxx')
      this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch, this.state.codeSearch);
      console.log(this.state.page)
    }
    else {
      this.getUsers(this.state.page, this.state.index, this.state.sortBy)
    }
  }

  search = async (xxxx) => {

    Request('user/Search', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: this.state.page,
      textSearch: xxxx,
      columnSearch: this.state.columnSearch,
      p1: this.state.index,
      p2: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        console.log(data)
        if (data.data)
          this.setState({
            users: data.data.users,
            count: Number(data.data.count),//eps kieeru veef,
            searchText: xxxx,
            isSearch: 1
          })

        console.log('data-----------------------------------', data)
      })

  }

  onChangeSearchType = async (value) => {
    console.log('hihi', this.state.searchText)
    await this.setState({
      columnSearch: value,
    })
    if (this.state.searchText) {
      this.search(this.state.searchText);
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
          this.search(this.state.searchText)
        }
        else {
          this.getUsers(this.state.page)
        }
      },
    };
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }


  render() {
     if (token)
      return (
        <div>
          <Row className="table-margin-bt">
            <Col span={1}>
              <Button shape="circle" type="primary" size="large" onClick={this.showModal.bind(null)}>
                <Icon type="plus" />
              </Button>
            </Col>

            <Col span={1}>
              <Button shape="circle" type="primary" size="large" onClick={this.refresh.bind(null)}>
                <Icon type="reload" />
              </Button>
            </Col>

          </Row>
          <div>
            <Select
              defaultValue={[ 'name' ]}
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.onChange}
              // onFocus={this.onFocus}
              // onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="name">User Name</Option>
              <Option value="code">Code</Option>
              <Option value="email">Email</Option>
              <Option value="password">Password</Option>
              <Option value="phone">Phone Number</Option>
              <Option value="fullname">Full name</Option>


            </Select>,
          <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.search(value) }} enterButton />

          </div>
          <Row className="table-margin-bt">
            <FormModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateUser}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
            />


            <Table pagination={false} dataSource={this.state.users} rowKey="id" >
              <Column
                title={<span>Id <Icon type={this.state.orderby} /></span>}
                dataIndex="id"
                key="id"
                onHeaderCell={this.onHeaderCell}

              />
              <Column title="User Name" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell}
              />
              <Column title="Code" dataIndex="code" key="code"  onHeaderCell={this.onHeaderCell}/>
              <Column title="Email" dataIndex="email" key="email" onHeaderCell={this.onHeaderCell} />
              <Column title="Password" dataIndex="password" key="password" onHeaderCell={this.onHeaderCell} />
              <Column title="Phone Number" dataIndex="phone" key="phone" onHeaderCell={this.onHeaderCell} />
              <Column title="Full Name" dataIndex="fullname" key="fullname" onHeaderCell={this.onHeaderCell} />
              <Column
                visible={false}
                title="Action"
                key="action"
                render={(text, record) => (

                  <span>
                    <Button style={{ marginRight: 20 }} type="primary" onClick={this.showModal.bind(record.id, text)}>
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title="Bạn chắc chắn muốn xóa?"
                      onConfirm={this.deleteUser.bind(this, record.id)}
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
  }
)(User);
