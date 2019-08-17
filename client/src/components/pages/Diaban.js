import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp'; 
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchDuan } from '@actions/duan.action';
import { fetchDiaban } from '@actions/diaban.action';
import { fetchLoading } from '@actions/common.action';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;

const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, comboBoxDatasource, onSelectCapDiaBan } = this.props;
      var combobox = []
      comboBoxDatasource.map((value, index) => {
        combobox.push(<Option value={value.dm_db_id}>{value.dm_db_ten}</Option>)
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
              <Col span={24}>
                <Form.Item label="Nhập thông tin địa bàn:">
                  {getFieldDecorator('dm_db_ten', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Input type="text" placeholder="Tên địa bàn" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Cấp địa bàn">
                  {getFieldDecorator('dm_db_cap', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Select onSelect={onSelectCapDiaBan}>
                    <Option value="1">Tỉnh</Option>
                    <Option value="2">Huyện</Option>
                    <Option value="3">Xã</Option>
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Địa bàn cha">
                  {getFieldDecorator('dm_db_id_cha', {
                    rules: [{ required: false, message: 'Trường này không được để trống!', }],
                  })(
                    <Select>
                      {combobox}
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
class Diaban extends React.Component {
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
      textSearch: '',
      columnSearch: '',
      isSort: true,
      rowdiabanselected: {},
      statebuttondelete: true,
      statebuttonedit: true,
      selectedId: [],
      selectedrow: [],
      sortBy: '',
      index: 'id',
      orderby: 'arrow-up',
      comboBoxDatasource: []
    }
  }
  //--------------DELETE-----------------------
  deleteDiaban = (dm_db_id) => {
    console.log('id delte', dm_db_id)
    Request(`diaban/delete`, 'DELETE', { dm_db_id: dm_db_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getDiabans(this.state.page)
      })
  }

  getDiabans = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })
    Request('diaban/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        if (data.data)
          this.setState({
            diabans: data.data.diabans,
            count: Number(data.data.count)//eps kieeru veef
          })
        this.props.fetchLoading({
          loading: false
        })
      })
  }
  // insert---------------------------------

  InsertOrUpdateDiaban = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      var url = this.state.action === 'insert' ? 'diaban/insert' : 'diaban/update'
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
          notification[notifi_type]({
            message: message,
            description: description
          });
          this.getDiabans(this.state.page)
        })
    });
  }

  refresh = (pageNumber) => {
    this.getDiabans(this.state.pageNumber)
  }
  componentDidMount() {
    this.getDiabans(this.state.pageNumber, this.state.index, this.state.sortBy);
  }
  onchangpage = (page) => {
    this.setState({
      page: page
    })

    this.getDiabans(page); if (this.state.isSearch === 1) {
      this.search(this.state.textSearch)
    }
    else {
      this.getDiabans(page)
    }
  }

  showModal = (diaban) => {
    Request('diaban/getcha', 'POST', { cap: 1 }).then(res => {
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
    if (diaban.dm_db_id !== undefined) {
      this.setState({
        id_visible: false,
        action: 'update'
      })
      form.setFieldsValue(diaban);
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
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      console.log('xxxx')
      this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
      console.log(this.state.page)
    }
    else {
      this.getDiabans(this.state.page, this.state.index, this.state.sortBy)
    }
  }

  search = async (xxxx) => {
    Request('diaban/Search', 'POST', {
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
            diabans: data.data.diabans,
            count: Number(data.data.count),//eps kieeru veef,
            textSearch: xxxx,
            isSearch: 1
          })

        console.log('data-----------------------------------', data)
      })

  }
  onSearch = (val) => {
    console.log('search:', val);
  }
  removeSearch = () => {
    this.setState({
        textSearch: ''
    })
  }
  onChangeSearchType = async (value) => {
    console.log('hihi', this.state.textSearch)
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
          this.getDiabans(this.state.page)
        }
      },
    };
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  onSelectCapDiaBan = (value) => {
    console.log('chondiaban', value)
    Request('diaban/getcha', 'POST', { cap: value }).then(res => {
      console.log(res.data, 'data res combobox')
      this.setState({
        comboBoxDatasource: res.data
      })
    })
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
    else {
        this.setState({
            statebuttondelete: true
        })
    }
    if (selectedRowKeys.length === 1) {
        this.setState({
            statebuttonedit: false,
            rowdiabanselected: selectedRows[0]
        })
    }
    else {
        this.setState({
            statebuttonedit: true
        })
    }
}


  render() {
    const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: Column.title === 'Id', // Column configuration not to be checked
                name: record.name,
            }),
        };
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
              defaultValue={['dm_db_ten']}
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
              <Option value="dm_db_ten">Tên địa bàn</Option>
              <Option value="dm_db_id_cha">Id cha địa bàn</Option>
              <Option value="dm_db_cap">Cấp địa bàn</Option>
            </Select>,
          <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.search(value) }} enterButton />

          </div>
          <Row className="table-margin-bt">
            <FormModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateDiaban}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              comboBoxDatasource={this.state.comboBoxDatasource}
              onSelectCapDiaBan={this.onSelectCapDiaBan}
            />


            <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.diabans} bordered='1' scroll={{ x: 1000 }} rowKey="dm_db_id" >
              <Column
                title={<span>Id địa bàn <Icon type={this.state.orderby} /></span>}
                dataIndex="dm_db_id"
                key="dm_db_id"
                className = "hidden"
                onHeaderCell={this.onHeaderCell}

              />
              <Column title="Tên địa bàn" dataIndex="dm_db_ten" key="dm_db_ten" onHeaderCell={this.onHeaderCell}
              />
              <Column className="action-hide" title="Cấp địa bàn" dataIndex="dm_db_cap" key="dm_db_cap" onHeaderCell={this.onHeaderCell} />
              <Column title="Cấp địa bàn" dataIndex="ten_dm_db_cap" key="ten_dm_db_cap" onHeaderCell={this.onHeaderCell} />
              <Column title="Địa bàn cha" dataIndex="tencha" key="tencha" onHeaderCell={this.onHeaderCell} />
              <Column className="action-hide" title="Địa bàn cha" dataIndex="dm_db_id_cha" key="dm_db_id_cha" onHeaderCell={this.onHeaderCell} />
              <Column
                visible={false}
                title="Hành động"
                key="action"
                render={(text, record) => (

                  <span>
                    <Button style={{ marginRight: 20 }} type="primary" onClick={this.showModal.bind(record.dm_db_id, text)}>
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title="Bạn chắc chắn muốn xóa?"
                      onConfirm={this.deleteDiaban.bind(this, record.dm_db_id)}
                      onCancel={this.cancel}
                      okText="Yes"
                      cancelText="No">
                      <Button type="danger">
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
    fetchDiaban,
    fetchLoading
  }
)(Diaban);
