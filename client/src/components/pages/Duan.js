import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchDuan } from '@actions/duan.action';
import { fetchLoading } from '@actions/common.action';

const token = cookie.load('token');
const { Column } = Table;
const {Option} = Select
const { Search } = Input;

const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, comboBoxDatasource } = this.props;
      var combobox =[]
      comboBoxDatasource.map((value, index) => {
        combobox.push(<Option value={value.ns_id}>{value.ns_ten}</Option>)
      })
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
            <Row gutter={24}>
              <Col span={24}>
                <div style={{display: id_visible === true ? 'block' : 'none' }}>
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
                <Form.Item label="">
                  {getFieldDecorator('dm_duan_id', {
                    
                  })(<Input type="hidden" placeholder="Id dự án" hidden = "true"/>)}
                </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item label="Nhập thông tin dự án:">
                  {getFieldDecorator('dm_duan_ten', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" placeholder="Tên dự án" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tiền tố">
                  {getFieldDecorator('dm_duan_key', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Quản trị dự án">
                  {getFieldDecorator('ns_id_qtda', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Select>
                      { combobox }
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
)

class Duan extends React.Component {
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
      comboBoxDatasource: []
    }
  }
  //--------------DELETE-----------------------
  deleteDuan = (dm_duan_id) => {
    console.log('id delte',dm_duan_id)
    Request(`duan/delete`, 'DELETE', {dm_duan_id: dm_duan_id })
      .then((res) => {
        notification[ res.data.success === true ? 'success' : 'error' ]({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getDuans(this.state.page)
      })
  }

  getDuans = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })
    Request('duan/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        if (data.data)
          this.setState({
            duans: data.data.duans,
            count: Number(data.data.count)//eps kieeru veef
          })
        this.props.fetchLoading({
          loading: false
        })
      })
  }
  // insert---------------------------------

  InsertOrUpdateDuan = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      var url = this.state.action === 'insert' ? 'duan/insert' : 'duan/update'
    console.log(url,'=====================')
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
            description = response.data.message.map((values, index) => {
              return <Alert type='error' message={values}></Alert>
            })
          }
          //thông báo lỗi vòa thành công
          notification[ notifi_type ]({
            message: message,
            description: description
          });
          this.getDuans(this.state.page)
        })
    });
  }
  //Search
  
  refresh = (pageNumber) => {
    this.getDuans(this.state.pageNumber)
  }
  componentDidMount() {
    this.getDuans(this.state.pageNumber, this.state.index, this.state.sortBy);
  }
  onchangpage = (page) => {
    this.setState({
      page: page
    })

    this.getDuans(page); if (this.state.isSearch === 1) {
      this.search(this.state.searchText)
    }
    else {
      this.getDuans(page)
    }
  }

  showModal = (duan) => {
    Request('duan/getcha','POST',null ).then(res=>{
      console.log(res.data, 'data res combobox')
      this.setState({
        comboBoxDatasource: res.data
      })
    })
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    form.resetFields();
    if (duan.dm_duan_id !== undefined) {
      this.setState({
        id_visible: false,
        action: 'update'
      })
      form.setFieldsValue(duan);
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
      this.getDuans(this.state.page, this.state.index, this.state.sortBy)
    }
  }

  search = async (xxxx) => {

    Request('duan/Search', 'POST', {
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
            duans: data.data.duans,
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
          this.getDuans(this.state.page)
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
              defaultValue={[ 'dm_duan_ten' ]}
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
              <Option value="dm_duan_ten">Tên dự án</Option>
              <Option value="dm_duan_key">Key</Option>
              <Option value="ns_id_qtda">Ns_id_qtda</Option>
            </Select>,
          <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.search(value) }} enterButton />

          </div>
          <Row className="table-margin-bt">
            <FormModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateDuan}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              comboBoxDatasource = {this.state.comboBoxDatasource}
            />


            <Table pagination={false} dataSource={this.state.duans} rowKey="dm_duan_id" >
              <Column
                title={<span>Id dự án <Icon type={this.state.orderby} /></span>}
                dataIndex="dm_duan_id"
                key="dm_duan_id"
                className = "hidden"
                onHeaderCell={this.onHeaderCell}

              />
              <Column title="Tên dự án" dataIndex="dm_duan_ten" key="dm_duan_ten" onHeaderCell={this.onHeaderCell}
              />
              <Column title="Tiền tố" dataIndex="dm_duan_key" key="dm_duan_key"  onHeaderCell={this.onHeaderCell}/>
              
              <Column title="Quản trị dự án" dataIndex="ns_id_qtda" key="ns_id_qtda"  onHeaderCell={this.onHeaderCell}/>
              <Column
                visible={false}
                title="Hành động"
                key="action"
                render={(text, record) => (

                  <span>
                    <Button style={{ marginRight: 20 }} type="primary" onClick={this.showModal.bind(record.dm_duan_id, text)}>
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title="Bạn chắc chắn muốn xóa?"
                      onConfirm={this.deleteDuan.bind(this, record.dm_duan_id)}
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
    fetchDuan,
    fetchLoading
  }
)(Duan);
