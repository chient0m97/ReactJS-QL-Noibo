import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
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
            <Option value="code">Code</Option>
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
          <Button type="dashed" onClick={this.add} style={{color:'red'}} >
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
    constructor(props){
      super(props);
    this.state = {
      messageRequired:'Trường này không được bỏ trống!'
     

    }}
    render() {
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible } = this.props;
      console.log(id_visible)
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
                    {getFieldDecorator('id', {
                      rules: [ {} ],
                    })(<Input type="number" disabled />)}
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Mã:">
                  {getFieldDecorator('code', {
                    rules: [ { required: true, message: this.state.messageRequired, } ],
                  })(<Input type="text" />)
                  }
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên đầy đủ:">
                  {getFieldDecorator('fullname', {     
                    rules: [ { required: true, message:this.state.messageRequired, } ],
                  })(<Input type="text" />)}       
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tên đăng nhập">
                  {getFieldDecorator('name', {
                    rules: [ { required: true, message: this.state.messageRequired, } ],
                  })(<Input type="text" placeholder="user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mật khẩu:">
                  {getFieldDecorator('password', {
                    rules: [ { required: true, message: this.state.messageRequired, } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Email:">
                  {getFieldDecorator('email', {
                    rules: [ { required: true, message: this.state.messageRequired }, { email: true, message: 'Trường này phải là email!' } ],
                  })(<Input type="email" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại:">
                  {getFieldDecorator('phone', {
                    rules: [ { required: true, message: this.state.messageRequired, } ],
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
      columnSearch: 'name',
      isSort: true,
      sortBy: '',
      index: 'id',
      orderby: 'arrow-up',
      nameSearch:'',
      emailSearch:'',
      phoneSearch:'',
      passwordSearch:'',
      fullnameSearch:'',
      codeSearch:''

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
    console.log('index',this.state.index)
    console.log('sortby',this.state.sortBy)
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
  onchangpage = async (page) => {
    await this.setState({
      page: page
    })

   if (this.state.isSearch === 1) {
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
    console.log('txt', this.state.isSearch);
    console.log(this.state.isSearch)
    await this.setState({
      pageSize: size
    });
    
    this.search(this.state.searchText);
    
  }

  search = async (xxxx) => {
    console.log('xxxxxxxxxxxx',this.state.pageSize)
    console.log('search text',xxxx)
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
        
        console.log('aaaaaaaaaaaaa',data)
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
  removeSearch =()=>{
    this.setState({
      searchText:''
    })
  }
  onchangeSearch = (event) =>{
    let value = event.target.value
    this.search(value)
    
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
          <WrappedDynamicFieldSet changesearch={this.onchangeSearch}  remove={this.removeSearch} callback={this.search} onchangeSearch={this.onChangeSearchType} />
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
