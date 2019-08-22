import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Card, Tooltip } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action';
import '@styles/style.css';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select

const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, qtda } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={title}
          okText="Lưu lại"
          onCancel={onCancel}
          onOk={onSave}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <Form layout={formtype}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="">
                  {getFieldDecorator('dm_duan_id', {

                  })(<Input type="hidden" placeholder="Id dự án" hidden="true" />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Nhập thông tin dự án:">
                  {getFieldDecorator('dm_duan_ten', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Input type="text" placeholder="Tên dự án" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tiền tố">
                  {getFieldDecorator('dm_duan_key', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Quản trị dự án">
                  {getFieldDecorator('ns_id_qtda', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Select
                    size={"small"}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      qtda.map((value, index) => {
                        return (<Option value={value.ns_id}>{value.ns_ten}</Option>)
                      })
                    }
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
      comboBoxDatasource: [],
      selectedId: [],
      statebuttonedit: true,
      statebuttondelete: true,
      stateconfirmdelete: false,
      rowthotroselected: {},
      selectedrow: [],
      selectedRowKeys: [],
    }
  }
  //--------------DELETE-----------------------
  deleteDuAn = (dm_duan_id) => {
    Request(`duan/delete`, 'DELETE', { dm_duan_id: dm_duan_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thong Bao',
          description: res.data.message
        });
        this.getDuans(this.state.page)
        this.setState({
          stateconfirmdelete: false,
          statebuttondelete: true,
          statebuttonedit: true,
          selectedRowKeys: []
        })
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
        console.log("Hien thi response ", response)
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
      this.setState({
        rowthotroselected: values
      })
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

  set_Select_QTDA() {
    Request('duan/getqtda', 'POST', {}).then((res) => {
      this.setState({
        comboBoxDatasource: res.data
      })
    })
  }

  showModal = async (duan) => {
    console.log("Hien thi duan ",duan)
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    await form.resetFields();
    if (duan.dm_duan_id !== undefined) {
      this.setState({
        id_visible: false,
        action: 'update'
      })
      // form.setFieldsValue({ ns_id_qtda: duan.ns_id })
      form.setFieldsValue(duan);
      
    }
    this.set_Select_QTDA()
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false
    });
  };

  confirm = (e) => {
    message.success('Bấm yes để xác nhận');
  }

  cancel = (e) => {
  }

  showTotal = (total) => {
    return `Total ${total} items`;
  }
  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch, this.state.codeSearch);
    }
    else {
      this.getDuans(this.state.page, this.state.index, this.state.sortBy)
    }
  }

  onSearch = (val) => {
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
          this.getDuans(this.state.page)
        }
      },
    };
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  checkStateConfirm = () => {
    this.setState({
      stateconfirmdelete: true
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
  };

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
      onHeaderCell: this.click
    };
    if (token)
      return (
        <div>
          <Card >
            <Row >
              <Col span={2}>
                <Tooltip title="Thêm Dự Án">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                    <Icon type="user-add" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Sửa Dự Án">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                    <Icon type="edit" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Xóa Dự Án">
                  <Popconfirm
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={this.deleteDuAn.bind(this, this.state.selectedId)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                    visible={this.state.stateconfirmdelete}
                  >
                    <Button shape="round" type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
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
            </Row>
          </Card>
          <Row>
            <FormModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateDuan}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              qtda={this.state.comboBoxDatasource}
            />
            <Table rowSelection={rowSelection} pagination={false} dataSource={this.state.duans} rowKey="dm_duan_id" >
              <Column title="Tên dự án" dataIndex="dm_duan_ten" onHeaderCell={this.onHeaderCell} />
              <Column title="Tiền tố" dataIndex="dm_duan_key" onHeaderCell={this.onHeaderCell} />
              <Column title="Quản trị dự án" dataIndex="ns_hovaten" onHeaderCell={this.onHeaderCell} />
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
    fetchLoading
  }
)(Duan);
