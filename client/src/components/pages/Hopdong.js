import React from 'react';
import axios from 'axios';
import { Pagination, Card, Tooltip, Icon, Table, Input, Modal, Popconfirm, message, Button, Upload, Form, Row, Col, notification, Alert, Select } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Request from '@apis/Request'
import '@styles/style.css';
import { fetchLoading } from '@actions/common.action';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;
const formatdate = require('dateformat')
const FormModalDuan = Form.create({ name: 'form_create_duan' })(
  class extends React.Component {
    render() {
      const { visible_duan, onCancel, form, title, confirmLoading, formtype, CreateDuan, comboBoxDatasourceDuan } = this.props;
      var comboboxduan = []
      comboBoxDatasourceDuan.map((value, index) => {
        comboboxduan.push(<Option value={value.ns_id}>{value.ns_ten}</Option>)
      })
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible_duan}
          title={title}
          okText="Save"
          onCancel={onCancel}
          onOk={CreateDuan}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <Form layout={formtype}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('dm_duan_id', {})}
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
                  })(<Select>
                    {comboboxduan}
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )
    }
  }
)
const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        labelCombobox: 'Chọn khách hàng là đơn vị:'
      }
    }
    render() {
      const { onchangpagefile, visible, onCancel, onSave, form, title, confirmLoading, formtype, comboBoxDuanSource, comboBoxDatasource, onChangeClick_loaihopdong, propDatasourceSelectLoaiHopDong } = this.props;
      var combobox = []
      var combobox1 = []
      var comboboxLoaiHopDong = []
      comboBoxDatasource.map((value) => {
        combobox.push(<Option value={value.id}>{value.ten}</Option>)
      })
      comboBoxDuanSource.map((value) => {
        combobox1.push(<Option value={value.dm_duan_id}>{value.dm_duan_ten}</Option>)
      })
      propDatasourceSelectLoaiHopDong.dataSource.map((value) => {
        comboboxLoaiHopDong.push(<Option value={value.id}>{value.ten}</Option>)
      })
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
          <Form layout={formtype} >
            <Row gutter={25}>
              <Col span={0}>
                <Form.Item label="Id hợp đồng:" className="an">
                  {getFieldDecorator('hd_id', {
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={0}>
                <Form.Item label="Id dự án:" className="an">
                  {getFieldDecorator('dm_duan_id', {
                  })(<Input type="number" size="small" disabled />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tên dự án:" >
                  {
                    getFieldDecorator('dm_duan_id', {
                      rules: [{ required: true, message: 'Trường này không được bỏ trống!', }],
                    })(
                      <Select
                        showSearch
                        placeholder="Chọn tên dự án"
                        optionFilterProp="children"
                        size="small" onChange={this.props.onChangeId}
                      >
                        <Option value='add_duan'>
                          <Icon type="plus" />Thêm dự án
                        </Option>
                        {combobox1}
                      </Select>
                    )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Loại hợp đồng:">
                  {getFieldDecorator('hd_loai', {
                    initialValue: 'DV',
                    rules: [{ required: true, message: 'Trường này không được bỏ trống!', }],
                  })(
                    <Select size="small" onSelect={onChangeClick_loaihopdong}>
                      <Option value="DV" >Đơn Vị</Option>
                      <Option value="CN" >Cá Nhân</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={propDatasourceSelectLoaiHopDong.label} >
                  {getFieldDecorator('hd_doituong', {
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      size="small" onChange={this.props.onChangeSelect}
                    >
                      {comboboxLoaiHopDong}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
              </Col>
              <Col span={8}>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={6}>
                <Form.Item label="Số hợp đồng:">
                  {getFieldDecorator('hd_so', {
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Thời gian thực hiện(ngày):">
                  {getFieldDecorator('hd_thoigianthuchien', {
                    initialValue: '90'
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Chọn nhanh:">
                  <Select defaultValue="90" size="small" onChange={this.props.onchangeoption}>
                    <Option value="30">1 Tháng</Option>
                    <Option value="90">3 Tháng</Option>
                    <Option value="180">6 Tháng</Option>
                    <Option value="365">1 Năm</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Trạng thái:">
                  {getFieldDecorator('hd_trangthai', {
                    initialValue: 'DTH',
                  })(<Select size="small">
                    <Option value="DTH">Đang thực hiện</Option>
                    <Option value="TL">Thanh lý</Option>
                    <Option value="XHD">Xuất hóa đơn</Option>
                    <Option value="DTT">Đã thanh toán</Option>
                    <Option value="DONG">Đóng</Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Địa chỉ:">
                  {getFieldDecorator('hd_diachi', {
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày ký:">
                  {getFieldDecorator('hd_ngayky', {
                  })(
                    <Input type="date" size="small" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày thanh lý:">
                  {getFieldDecorator('hd_ngaythanhly', {
                  })(<Input type="date" size="small" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày xuất hóa đơn:">
                  {getFieldDecorator('hd_ngayxuathoadon', {
                  })(
                    <Input type="date" size="small" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Ngày thanh toán:">
                  {getFieldDecorator('hd_ngaythanhtoan', {
                  })(<Input type="date" size="small" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày nghiệm thu:">
                  {getFieldDecorator('hd_ngayketthuc', {
                  })(
                    <Input size={"small"} type="date" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={12}>
                <Form.Item label="Files:">
                  {getFieldDecorator('hd_files', {
                  })(
                    <div>
                      <label>Upload your file</label>
                      <input type="file" name="file" />
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ghi chú:">
                  {getFieldDecorator('hd_ghichu', {
                  })(
                    <TextArea rows={4} />
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
class Hopdong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      current: 1,
      page: 1,
      pageSize: 10,
      count: 1,
      show: false,
      visible: false,
      formtype: 'horizontal',
      title: 'Nhập thông tin cho hợp đồng',
      id_visible: false,
      action: 'insert',
      isSearch: 0,
      searchText: '',
      columnSearch: '',
      isSort: true,
      sortBy: '',
      index: 'id',
      orderby: 'arrow-up',
      rowthotroselected: {},
      statebuttonedit: true,
      statebuttondelete: true,
      stateconfirmdelete: false,
      selectedRowKeys: [],
      selectedId: [],
      //selected_file: null,
      //selectedFile: null,
      comboBoxDatasource: [],
      comboBoxDatasourceDuan: [],
      comboBoxDuanSource: [],
      propDatasourceSelectLoaiHopDong: {
        dataSource: [],
        label: 'Chọn khách hàng là đơn vị:',
        type: 'DV'
      }
    }
  }
  deleteHopdong = (hd_id) => {
    Request('hopdong/delete', 'DELETE', { hd_id: hd_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getHopdongs(this.state.page)
        this.setState({
          stateconfirmdelete: false,
          statebuttondelete: true,
          statebuttonedit: true,
          selectedRowKeys: []
        })
      })
    this.setState({
      stateconfirmdelete: false
    })
  }
  getHopdongs = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })

    Request('hopdong/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
    })
      .then(async (response) => {
        if (response) {
          this.setState({
            hopdongs: response.data.data.hopdongs.rows,
            count: Number(response.data.data.count)
          })
        }
        await this.props.fetchLoading({
          loading: false
        })
      })
  }
  InsertOrUpdateHopdong = () => {
    const { form } = this.formRef.props;
    //var file = form.getFieldsValue().hd_files.file
    //var formdata = new FormData()
    //formdata.append('files',file)

    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      var url = this.state.action === 'insert' ? 'hopdong/insert' : 'hopdong/update'
      //values.formdata = formdata
      const data = new FormData()
      if (this.state.selected_file !== null) {
        await data.append('file', this.state.selected_file)
      }
      Request(url, 'POST', values)
        .then((response) => {
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
          var message = 'Thành công'
          if (!!!response.data.success) {
            message = 'Có lỗi xảy ra!'
            notifi_type = 'error'
            description = response.data.message.map((values) => {
              return <Alert type='error' message={values}></Alert>
            })
          }
          notification[notifi_type]({
            message: message,
            description: description
          })
          this.getHopdongs(this.state.page)
        })
    });
  }
  refresh = () => {
    this.getHopdongs(this.state.pageNumber)
  }

  componentDidMount() {
    this.getHopdongs(this.state.pageNumber, this.state.index, this.state.sortBy);
    document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
  }

  onchangpage = (page) => {
    this.setState({
      page: page
    })
    this.getHopdongs(page); if (this.state.isSearch === 1) {
      this.search(this.state.searchText)
    }
    else {
      this.getHopdongs(page)
    }
  }

  onchangeoption = (value) => {
    const { form } = this.formRef.props
    form.setFieldsValue({
      hd_thoigianthuchien: value
    })
  }

  onchangeid = (value) => {
    const { form } = this.formRef.props
    form.setFieldsValue({
      dm_duan_id: value
    })

    if (value === 'add_duan') {
      this.setState({
        visible_duan: true
      })
    }
  }

  onChangeSelect = (value) => {
    const { form } = this.formRef.props
    form.setFieldsValue({
      hd_doituong: value
    })
  }

  showModal = async (hopdong) => {
    Request('duan/getcha', 'POST', null).then(res => {
      if (res.data) {
        this.setState({
          comboBoxDatasourceDuan: res.data
        })
      }

    })

    Request('hopdong/getdonvi', 'POST', null).then(res => {
      if (res.data) {
        this.setState({
          propDatasourceSelectLoaiHopDong: {
            label: 'Chọn khách hàng là đơn vị:',
            dataSource: res.data,
            type: 'DV'
          }
        })
        const { form } = this.formRef.props
        form.setFieldsValue({
          hd_doituong: res.data[0].id
        })
      }
    })

    Request('hopdong/getduan', 'POST', null).then(res => {
      if (res.data) {
        this.setState({
          comboBoxDuanSource: res.data
        })
      }

    })
    const { form } = this.formRef.props
    this.setState({
      visible: true,
      action: 'insert'
    });
    form.resetFields();
    if (hopdong.hd_id !== undefined) {
      this.setState({
        id_visible: true,
        action: 'update'
      })
      var label = hopdong.hd_loai === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
      var api = hopdong.hd_loai === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
      const { form } = this.formRef.props
      Request(api, 'post', null).then((res) => {
        if (res.data) {
          this.setState({
            propDatasourceSelectLoaiHopDong: {
              label: label,
              dataSource: res.data,
            }
          })
        }

        form.setFieldsValue({
          hd_doituong: hopdong.hd_doituong
        })
      })
      this.setState({
        labelCombobox: label
      })
      hopdong.hd_ngayky = hopdong.hd_ngayky === null ? null : formatdate(hopdong.hd_ngayky, 'yyyy-mm-dd')
      hopdong.hd_ngaythanhly = hopdong.hd_ngaythanhly === null ? null : formatdate(hopdong.hd_ngaythanhly, 'yyyy-mm-dd')
      hopdong.hd_ngaythanhtoan = hopdong.hd_ngaythanhtoan === null ? null : formatdate(hopdong.hd_ngaythanhtoan, 'yyyy-mm-dd')
      hopdong.hd_ngayxuathoadon = hopdong.hd_ngayxuathoadon === null ? null : formatdate(hopdong.hd_ngayxuathoadon, 'yyyy-mm-dd')
      hopdong.hd_ngayketthuc = hopdong.hd_ngayketthuc === null ? null : formatdate(hopdong.hd_ngayketthuc, 'yyyy-mm-dd')
      form.setFieldsValue(hopdong);
    }
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false
    });
  };
  confirm = (e) => {
    console.log(e);
    message.success('Bấm yes để xác nhận');
  }
  cancel = (e) => {
    console.log(e);
  }
  showTotal = (total) => {
    return `Total ${total} items `;
  }
  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch,
        this.state.codeSearch);
    }
    else {
      this.getHopdongs(this.state.page, this.state.index, this.state.sortBy)
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
        if (this.state.isSearch === 1) {
          this.search(this.state.searchText)
        }
        else {
          this.getHopdongs(this.state.page)
        }
      },
    };
  }

  onChangeClick_loaihopdong = (e) => {
    var label = e === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
    var api = e === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
    const { form } = this.formRef.props
    Request(api, 'post', null).then((res) => {
      if (res.data) {
        this.setState({
          propDatasourceSelectLoaiHopDong: {
            label: label,
            dataSource: res.data,
            type: e
          }
        })

        form.setFieldsValue({
          hd_doituong: res.data[0].id
        })
      }

    })
    this.setState({
      labelCombobox: label
    })
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

  onSelectDuan = async (value) => {
    if (value === 'add_duan') {
      return this.setState({
        visible_duan: true
      })
    }
  }

  checkStateConfirm = () => {
    this.setState({
      stateconfirmdelete: true
    })
  }
  clearChecked = () => {
    this.onSelectChange([], [])
  };

  onRowClick = (row) => {
    this.onSelectChange([row.hd_id], [row])
  }

  onCancel_duan = () => {
    this.setState({
      visible_duan: false
    })
  }

  onOk_duan = () => {
  }

  saveFormRefCreate = formRef => {
    this.saveFormRefCreate = formRef
  }

  CreateDuan = e => {
    // console.log('Đây là thêm dự án')
    e.preventDefault();
    Request(`duan/insert`, 'POST', null)
      .then((response) => {
        if (response.status === 200 & response.data.success === true) {
        }
      })
  }

  onchangpagefile = e => {
    //var ob = 
    //const file = new FileReader();

    this.setState({
      selected_file: e.target.files[0],
      loaded: 0,
    })
  }

  onChangeHandler = event => {

    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selected_file)
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
      })
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: Column.title === 'Id',
        name: record.name,
      }),
    };
    var dateFormat = require('dateformat');
    if (token)
      return (
        <div>
          <Card>
            <Row>
              <Col span={2}>
                <Tooltip title="Thêm Hợp Đồng">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                    <Icon type="user-add" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Sửa Hợp Đồng">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                    <Icon type="edit" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Xóa Hợp Đồng">
                  <Popconfirm
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={this.deleteHopdong.bind(this, this.state.selectedId)}
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
                  <Button shape="round" type="primary" style={{ marginLeft: '18px' }} size="default" onClick={this.refresh.bind(null)}>
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
              onSave={this.InsertOrUpdateHopdong}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              onchangeoption={this.onchangeoption}
              onChangeId={this.onchangeid}
              onChangeSelect={this.onChangeSelect}
              comboBoxDatasource={this.state.comboBoxDatasource}
              comboBoxDuanSource={this.state.comboBoxDuanSource}
              onChangeClick_loaihopdong={this.onChangeClick_loaihopdong}
              propDatasourceSelectLoaiHopDong={this.state.propDatasourceSelectLoaiHopDong}
              onchangpagefile={this.onchangpagefile}
            //onClickHandler={this.onClickHandler}
            />
            <FormModalDuan
              wrappedComponentRef={this.saveFormRefCreate}
              visible_duan={this.state.visible_duan}
              onCancel={this.onCancel_duan}
              onSave={this.onOk_duan}
              title={this.state.title_duan}
              formtype={this.state.formtype_duan}
              CreateDuan={this.CreateDuan}
              comboBoxDatasourceDuan={this.state.comboBoxDatasourceDuan}
            />
            <Table rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.hopdongs} bordered='1' rowKey="hd_id" scroll={{ x: 1300 }}>
              <Column
                title={<span>id hợp đồng<Icon type={this.state.orderby} /></span>}
                dataIndex="hd_id"
                key="hd_id"
                onHeaderCell={this.onHeaderCell}
                className="hidden-action"
                width={150}
              />
              <Column title="Tên dự án" dataIndex="dm_duan_ten" key="dm_duan_ten" onHeaderCell={this.onHeaderCell} />
              <Column title="Loại hợp đồng" className="hidden-action" dataIndex="hd_loai" key="hd_loai" onHeaderCell={this.onHeaderCell} />
              <Column title="Tên đối tượng" className="hidden-action" dataIndex="hd_doituong" key="hd_doituong" onHeaderCell={this.onHeaderCell} />
              <Column title="Số hợp đồng" dataIndex="hd_so" key="hd_so" onHeaderCell={this.onHeaderCell} width={150} />
              <Column title="Công ty" dataIndex="hd_congty" key="hd_congty"
                onHeaderCell={this.onHeaderCell} width={150} />
              <Column title="Thời gian thực hiện" dataIndex="hd_thoigianthuchien" key="hd_thoigianthuchien" onHeaderCell={this.onHeaderCell} width={150}
                render={
                  text => {
                    if (text === null)
                      return ' '
                    else
                      return text + ' ngày'
                  }}
              />
              <Column title="Ngày kết thúc" dataIndex="hd_ngayketthuc" key="hd_ngayketthuc" width={150}
                render={
                  text => {
                    if (text === null)
                      return ' '
                    else
                      return dateFormat(text, "dd/mm/yyyy")
                  }}
                onHeaderCell={this.onHeaderCell} />
              <Column title="Địa chỉ" dataIndex="hd_diachi" key="hd_diachi" onHeaderCell={this.onHeaderCell} width={150} />
              <Column title="Ngày ký" dataIndex="hd_ngayky" key="hd_ngayky" render={
                text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }} onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày thanh lý" dataIndex="hd_ngaythanhly" key="hd_ngaythanhly" render={
                text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }} onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày xuất hóa đơn" dataIndex="hd_ngayxuathoadon" key="hd_ngayxuathoadon"
                onHeaderCell={this.onHeaderCell}
                render={text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }}
                width={200}
              />
              <Column
                title="Ngày thanh toán" dataIndex="hd_ngaythanhtoan" key="hd_ngaythanhtoan"
                render={text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }}
                onHeaderCell={this.onHeaderCell}
              />
              <Column title="Trạng thái" className="hidden-action" dataIndex="hd_trangthai" key="hd_trangthai" onHeaderCell={this.onHeaderCell} />
              <Column title="Trạng thái" dataIndex="ten_hd_trangthai" key="ten_hd_trangthai" onHeaderCell={this.onHeaderCell} />
              <Column title="Files" dataIndex="hd_files" key="hd_files" className="hidden-action" onHeaderCell={this.onHeaderCell} />
              <Column title="Ghi chú" dataIndex="hd_ghichu" key="hd_ghichu" onHeaderCell={this.onHeaderCell} />
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
    fetchLoading
  }
)(Hopdong);
