import React from 'react';
import { Pagination, Checkbox, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import '../../index.css';
import jwt from 'jsonwebtoken';
import Permission from '../Authen/Permission'
import TreeRole from '../common/Tree'
const token = cookie.load('token');


const { Column } = Table;
const { Option } = Select
const { Search } = Input;

let id = 0;
class DynamicFieldSet extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    this.props.remove();
    this.props.callback('');
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
        label={index === 0 ? '' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],

        })(<div>
          <Select
            defaultValue={['name']}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.props.onchangeSearch}
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="name">User Name</Option>
            <Option value="email">Email</Option>
            <Option value="password">Password</Option>
            <Option value="phone">Phone Number</Option>
            <Option value="fullname">Full name</Option>


          </Select>,
        <Search style={{ width: 300 }} placeholder="input search text" onChange={this.props.changesearch.bind(this)} onSearch={(value) => { this.props.callback(value) }} enterButton />

        </div>)}
        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ color: 'red' }} >
            Click vào đây để Search Bờ rô
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);


const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messageRequired: 'Trường này không được bỏ trống!'


      }
    }
    render() {
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible } = this.props;
      console.log(id_visible)
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={title}
          okText="Lưu"
          onCancel={onCancel}
          onOk={onSave}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <Form layout={formtype}>
            <Row gutter={24} >
              <Col span={24}>
                <div style={{ display: 'none' }}>
                  <Form.Item label="Id:" >
                    {getFieldDecorator('id', {

                    })(<Input type="number" disabled />)}
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={24}>

              <Col span={12}>
                <Form.Item label="Tên đầy đủ:">
                  {getFieldDecorator('fullname', {
                    rules: [{ required: true, message: this.state.messageRequired, }],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tên đăng nhập">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: this.state.messageRequired, }],
                  })(<Input type="text" placeholder="user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mật khẩu:">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: this.state.messageRequired, }],
                  })(<Input type="password" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Email:">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: this.state.messageRequired }, { email: true, message: 'Trường này phải là email!' }],
                  })(<Input type="email" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại:">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: this.state.messageRequired, }],
                  })(<Input type="phone" />
                    // <Select>
                    //   {this.props.datacha.map((item, i) => {
                    //     return(
                    //     <Option value={item.ns_id}>{item.ns_id}</Option>

                    //     )
                    //   })}


                    // </Select>
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

class User extends React.Component {
  constructor(props) {
    super(props);
    //this.child = React.createRef();
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
      users:[]
    }
  }
  //--------------DELETE-----------------------
  deleteUser = (id) => {
    console.log('delte id: ', id)
    Request(`user/delete`, 'DELETE', { id: id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getUsers(this.state.page)
      })
  }

  getUsers = (pageNumber) => {

    console.log('index', this.state.index)
    console.log('sortby', this.state.sortBy)
    if (pageNumber <= 0)
      return;

    Request('user/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        console.log('res', response)
        if (response) {
          let data = response.data;
          console.log('data', data)
          if (data.data)
            this.setState({
              users: data.data.users,
              count: Number(data.data.count)//eps kieeru veef
            })
          this.props.fetchLoading({
            loading: false
          })
        }

      })
    //   jwt.decode(token)
    // jwt.verify(token, "heymynameismohamedaymen", (err, decoded) => {
    //   if (decoded.role == 'admin') {
    //     this.setState({
    //       roleVisible: ''
    //     })
    //   }
    // })
  }
  // insert---------------------------------

  InsertOrUpdateUser = () => {
    const { form } = this.formRef.props;

    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('urllllllllllllllllllll', this.state.action)
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

  refresh = (pageNumber) => {
    this.getUsers(this.state.pageNumber)
  }
  componentDidMount() {
    this.getUsers(this.state.pageNumber, this.state.index, this.state.sortBy);
  }
  onchangpage = async (page) => {
    console.log('page', page)
    await this.setState({
      page: page
    })

    if (this.state.isSearch === 1) {
      this.search(this.state.searchText)
    }
    else {
      this.getUsers(page)
      console.log(this.getUsers(page))
    }
  }

  showModal = (user) => {
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    form.resetFields();
    if (user.id !== undefined) {
      console.log('day la update')
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
    state[e.target.name] = e.target.value;
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
    console.log('txt', this.state.isSearch);
    console.log(this.state.isSearch)
    await this.setState({
      pageSize: size
    });
    if (this.state.searchText) {
      this.search(this.state.searchText);

    }
    else {
      this.getUsers(this.state.page)
    }
  }

  search = async (xxxx) => {
    console.log('xxxxxxxxxxxx', this.state.pageSize)
    console.log('search text', xxxx)
    console.log('column search', this.state.columnSearch)
    Request('user/search', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: this.state.page,
      searchText: xxxx,
      columnSearch: this.state.columnSearch,
      p1: this.state.index,
      p2: this.state.sortBy,

    })
      .then((response) => {
        let data = response.data;

        console.log('aaaaaaaaaaaaa', data)
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
  removeSearch = () => {
    this.setState({
      searchText: ''
    })
  }
  onchangeSearch = (event) => {
    let value = event.target.value
    this.search(value)

  }
  ChangeCheckbox = () => {
    console.log('dcm')
  }
  showmodalRole = async (name) => {
    console.log('show nodadadasaasdasd')
    console.log('user name', name)


    if (name) {
      this.setState({
        modalRoleVisible: true,

      })
    }
    else {
      message.info('chọn user đã nhóc');
    }

  }
  okRole = async e => {
    let user = this.state.selectedId
    let a = this.child.state.checkedKeys
    Request('setpermission', 'POST', { a, user }).then(res => {

    })
    console.log('data con ', a)
    await this.setState({
      modalRoleVisible: false,
    });
  };

  cancelRole = e => {
    console.log('cancel')
    this.setState({
      modalRoleVisible: false,
    });
  };
  changeRows = (selectedRowKeys, selectedRows) => {
    console.log('checked')
  }

  handleClickRow(rowIndex) {
    let users = this.state.users;
    users[rowIndex].Selected = true;
    this.setState({
      users: users
    })
  }
  render() {
    let token = cookie.load('token');
    if (!token || !jwt.decode(token)) {
      return (
        <Login />
      )
    }
    let payload = jwt.decode(token);
    let claims = payload.claims;
    console.log('quyen ', claims)
    let canPermiss = claims.indexOf(Permission.Role.Permiss) >= 0;
    console.log('permis', canPermiss)
    let canRead = claims.indexOf(Permission.User.Read) >= 0;
    let canUpdate = claims.indexOf(Permission.User.Update) >= 0;
    let canDelete = claims.indexOf(Permission.User.Delete) >= 0;
    let canCreate = claims.indexOf(Permission.User.Insert) >= 0;

    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: true,
      onChange: async (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys[0])
        let sl = selectedRowKeys[0]
        Request('checkrole', 'POST', { sl }).then((res) => {
          console.log('data server trả về', res)
          let data = res.data;
          let a = data.map(function (value) {
            return a = { role: value.split('.')[0], acton: value.split('.')[1] }
          })
          console.log('spitttttttttttttttttttttttttttttttttttttt', a)
          this.setState({
            dataTree: data,
          })
          console.log('ROLEeeee', this.state.dataTree)

        })
        console.log('selected rowkeys', selectedRowKeys)
        if (selectedRows[0]) {
          console.log('kkkkkkk')
          await this.setState({
            selectedId: selectedRowKeys[0],
            user: selectedRows[0],
          })
        }

      },

      getCheckboxProps: record => ({

        disabled: Column.title === 'Id', // Column configuration not to be checked
        name: record.name,
      }),

    };
    return (
      <div>
        <Modal
          title="Phân quyền "
          visible={this.state.modalRoleVisible}
          onOk={this.okRole}
          onCancel={this.cancelRole}
        >
          <TreeRole ref={instance => this.child = instance} dataTree={this.state.dataTree} />
        </Modal>
        {/* <Row className="table-margin-bt">
          <Col span={1}>
            <Button shape="circle" type="primary" size="large" onClick={this.refresh.bind(null)}>
              <Icon type="reload" />
            </Button>
          </Col>

        </Row> */}
        <WrappedDynamicFieldSet changesearch={this.onchangeSearch} remove={this.removeSearch} callback={this.search} onchangeSearch={this.onChangeSearchType} />
        <div style={{ display: 'flex' }}>
          {
            canPermiss ?
              <div>
                <Button style={{ margin: '20px' }} onClick={this.showmodalRole.bind(this, this.state.selectedId)}>
                  <Icon type="user" />
                </Button> Phân Quyền
            </div>
              : null
          }
          {
            canUpdate ?
              <div>
                <Button style={{ margin: '20px' }} onClick={this.showModal.bind(this, this.state.user)}>
                  <Icon type="edit" />
                </Button> Sửa
            </div>
              : null
          }

          {
            canCreate ?
              <div>
                <Button style={{ margin: '20px' }} onClick={this.showModal.bind(null)}>
                  <Icon type="plus" />
                </Button> Thêm
                </div>
              : null
          }
          {
            canDelete ?
              <Popconfirm
                title="Bạn chắc chắn muốn xóa?"
                onConfirm={this.deleteUser.bind(this, this.state.selectedId)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No">
                <Button type="danger" style={{ margin: '20px' }} >
                  <Icon type="delete" />
                </Button> Xóa
          </Popconfirm>
              :
              null
          }

        </div>
        <Row className="table-margin-bt">
          <FormModal
            datacha={this.state.datacha}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onSave={this.InsertOrUpdateUser}
            title={this.state.title}
            formtype={this.state.formtype}
            id_visible={this.state.id_visible}
          />


          <Table

            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  this.handleClickRow.bind(this, rowIndex)
                  console.log('aaaaaaaaaaaaaaaaaa', event)
                  console.log('reacassadasdad', record.name)

                  console.log('reacassadasdad', rowIndex)

                }, // click row
              };
            }}
            expandRowByClick="true" onChange={this.changeRows}
            pagination={false}
            rowSelection={rowSelection}
            dataSource={this.state.users} rowKey="name" >
            <Column className="action-hide"
              title={<span>Id <Icon type={this.state.orderby} /></span>}
              dataIndex="id"
              key="id"
              onHeaderCell={this.onHeaderCell}
            />
            <Column title={<span>UserName <Icon type={this.state.orderby} /></span>} dataIndex="name" key="name" onHeaderCell={this.onHeaderCell}
            />
            <Column className="action-hide" title="Password" dataIndex="password" key="password" onHeaderCell={this.onHeaderCell} />
            <Column className="action-hide" title="Phone Number" dataIndex="phone" key="phone" onHeaderCell={this.onHeaderCell} />
            <Column title="Full Name" dataIndex="fullname" key="fullname" onHeaderCell={this.onHeaderCell} />
            <Column title="Email" dataIndex="email" key="email" onHeaderCell={this.onHeaderCell} />


          </Table>
        </Row>
        <Row>
          <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
        </Row>
      </div >

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
