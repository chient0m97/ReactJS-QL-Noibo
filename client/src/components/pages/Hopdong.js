import React from 'react';
//import Moment from 'react-moment';
//import axios from 'axios';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button,Upload, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
//import { fetchHopdong } from '@actions/hopdong.action';
//import { Cascader } from 'antd';
//mport { Menu, Dropdown } from 'antd';
import { fetchLoading } from '@actions/common.action';



//const dateformat = 'YYYY-MM-DD HH:mm:ss';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select;
//const { Option, OptGroup } = Select
//const { Search } = Input;
const { Dragger } = Upload;
const { TextArea } = Input;
const formatdate = require('dateformat')

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      var data = new FormData()
      // var multer = require('multer')
      // var storage = multer.diskStorage({
      //   destination: function(req, file, cb){
      //     cb(null, 'hopdong/upload')
      //   },
      //   filename: function(req, file, cb){
      //     cb(null, file.originalname)
      //   }
      // })
      // var upload = multer({storage:storage})
      // axios.post('hopdong/upload', upload.single("file"),function(req, res){
      //   console.log(req.file)
      //   res.send("UPLOAD THANH CONG")
      // })
      data.append('file',info.file)
      console.log(data, 'file day nhe')
      console.log(info.file, 'info file')
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// axios.post("/hopdong/upload", FormData, { // receive two parameter endpoint url ,form data 
// })
// .then(res => { // then print response status
//   console.log(res.statusText)
// })
const FormModalDuan = Form.create({ name: 'form_create_duan' })(
  class extends React.Component {
    render() {
      const { visible_duan, onCancel, onSave, form, title, confirmLoading, formtype, CreateDuan } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible_duan}
          title={title}
          okText="Save"
          onCancel={onCancel}
          onOk={onSave}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <Form layout={formtype} onSubmit={CreateDuan}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label='Tên dự án:'>
                  {getFieldDecorator('dm_duan_ten', {
                    rules: [{}]
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label='Tiền tố:'>
                  {getFieldDecorator('dm_duan_key', {
                    rules: [{}]
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Tên người quản trị:'>
                  {getFieldDecorator('ns_id_qtda', {
                    rules: [{}]
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              </Row>
              {/* <Row gutter={24}>
              <Col>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>Lưu</Button>
                </Form.Item>
              </Col>
            </Row> */}
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
        //,optionChange: 'combobox'
      }
      // this.state = {
      //   optionChange: 'combobox'
      // }

    }


    // onChangeDvOrCn = (e) => {
    //   var value = e === 'DV' ? 'combobox' : 'combobox2'
    //   this.setState({
    //     optionChange: value
    //   })
    // }
    render() {
      const { visible, onCancel, onSave, form, title, confirmLoading, formtype, comboBoxDuanSource, comboBoxDatasource, onChangeClick_loaihopdong, propDatasourceSelectLoaiHopDong } = this.props;
      //const dateFormat = "YYYY-MM-DD"
      //var dateFormat = require('dateformat')
      var combobox = []
      var combobox1 = []
      var comboboxLoaiHopDong = []

      // eslint-disable-next-line array-callback-return
      comboBoxDatasource.map((value) => {
        combobox.push(<Option value={value.id}>{value.ten}</Option>)
      })
      // eslint-disable-next-line array-callback-return

      // eslint-disable-next-line array-callback-return
      comboBoxDuanSource.map((value) => {
        combobox1.push(<Option value={value.dm_duan_id}>{value.dm_duan_ten}</Option>)
      })

      combobox1.push(

        <Option value='add_duan'>
          <Icon type="plus" />Thêm
         </Option>

      )

      // eslint-disable-next-line array-callback-return
      //console.log(propDatasourceSelectLoaiHopDong, 'datasource loaihopdong')
      // eslint-disable-next-line array-callback-return
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
                    //rules: [ {required: true, message: 'Trường này không được bỏ trống!', } ],
                  })(<Input type="number" size="small" />)}
                </Form.Item>

              </Col>

              <Col span={0}>
                <Form.Item label="Id dự án:" className="an">
                  {getFieldDecorator('dm_duan_id', {
                    //rules: [{ required: true, message: 'Trường này không được để trống!', }],
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
                      // filterOption={(input, option) =>
                      //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                       size="small" onChange={this.props.onChangeId} 
                      //  dropdownRender={menu => (
                      //   <div>
                      //     {menu}
                      //     <Divider style={{ margin: '4px 0' }}/>
                      //   <div style={{ padding: '8px', cursor: 'pointer' }}>
                      //     <Icon type="plus" /> Thêm
                      //   </div>
                      //   </div>
                      // )}
                      >

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
                    // dropdownRender={menu => (
                    //   <div>
                    //     {menu}
                    //     <Divider style={{ margin: '4px 0' }} value="add_duan" onSelect={onSelectDuan} />
                    //     <div style={{ padding: '8px', cursor: 'pointer' }}>
                    //       <Icon type="plus" />Thêm
                    //   </div>
                    //   </div>
                    // )}
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
                    // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
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
                  {/* {getFieldDecorator('hd_chonnhanhthoigianthuchien', {
                    initialValue: '90'
                  })( */}

                    <Select defaultValue="90" size="small" onChange={this.props.onchangeoption}>
                      <Option value="30">1 Tháng</Option>
                      <Option value="90">3 Tháng</Option>
                      <Option value="180">6 Tháng</Option>
                      <Option value="365">1 Năm</Option>
                    </Select>
                    
                  {/* )} */}

                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày kết thúc:">
                  {getFieldDecorator('hd_ngayketthuc', {
                    // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(

                    <Input size={"small"} type="date"  />

                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Địa chỉ:">
                  {getFieldDecorator('hd_diachi', {
                    // rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày ký:">
                  {getFieldDecorator('hd_ngayky', {
                  })(
                    <Input type="date" size="small"  />
                    //   <DatePicker size="small" format={dateformat}></DatePicker>
                  )}
                </Form.Item>
              </Col>


              <Col span={8}>
                <Form.Item label="Ngày thanh lý:">
                  {getFieldDecorator('hd_ngaythanhly', {
                    // rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="date" size="small"  />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Ngày xuất hóa đơn:">
                  {getFieldDecorator('hd_ngayxuathoadon', {
                    // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(

                    <Input type="date" size="small"  />

                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Ngày thanh toán:">
                  {getFieldDecorator('hd_ngaythanhtoan', {
                    // rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="date" size="small"  />

                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Trạng thái:">
                  {getFieldDecorator('hd_trangthai', {
                    initialValue: 'DTH',
                    // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
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
              <Col span={12}>
                <Form.Item label="Files:">
                  {getFieldDecorator('hd_files', {
                    //rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(
                  //<Input type="txt" size="small" />
                  <Dragger {...props}>
                  <p className="ant-upload-drag-icon" style={{height: '39px'}}>
                    <Icon type="inbox" />
                  </p>
                  {/* <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                  </p> */}
                </Dragger>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ghi chú:">
                  {getFieldDecorator('hd_ghichu', {
                    //rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(
                  //<Input type="area" size="small" />
                  <TextArea rows={4} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={24}>
              <Col>
              <Input type="file" name="file" onChange={this.onChangeHandler}/>
              </Col>
            </Row> */}
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
      showPopup: false,
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
      comboBoxDatasource: [],
      comboBoxDuanSource: [],
      propDatasourceSelectLoaiHopDong: {
        dataSource: [],
        label: 'Chọn khách hàng là đơn vị:',
        type: 'DV'
      }
    }
  }
  //--------------DELETE-----------------------
  //tu day den render
  deleteHopdong = (hd_id) => {
    Request(`hopdong/delete`, 'DELETE', { hd_id: hd_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getHopdongs(this.state.page)
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
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        //console.log('data trả về:', data)
        if (data.data)
          this.setState({
            hopdongs: data.data.hopdongs.rows,
            count: Number(data.data.count) // ép kiểu về    
          })
        //console.log('------------------------', this.state.hopdongs)
        this.props.fetchLoading({
          loading: false

        })
      })
  }
  // <Input size={"small"} type="date" onChange={this.clear} />
  //---Insert---
  InsertOrUpdateHopdong = () => {
    const { form } = this.formRef.props;
    var file = form.getFieldsValue().hd_files.file
    var formdata = new FormData()
    formdata.append('files',file)
    
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      //console.log(values, "day la values");
      var url = this.state.action === 'insert' ? 'hopdong/insert' : 'hopdong/update'
      values.formdata = formdata
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
            description = response.data.message.map((values) => {
              return <Alert type='error' message={values}></Alert>
            })
          }
          //thông báo lỗi vào thành công
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
    //console.log(value, 'gia tri cua thoi gian thuc hien')
    form.setFieldsValue({
      hd_thoigianthuchien: value
    })
  }
  onchangeid = (value) => {
    const { form } = this.formRef.props
    //console.log(value, 'gia tri cua id du an')
    form.setFieldsValue({
      dm_duan_id: value

    })

    if (value === 'add_duan') {
      //console.log('dcm vao roif')
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
  showModal = async(hopdong) => {
    
    Request('hopdong/getdonvi', 'POST', null).then(res => {
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
    })
    //   onChangeClick_loaihopdong = (e) => {
    //   var label = e === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
    //   var api = e === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
    //   const { form } = this.formRef.props

    //   Request(api, 'post', null).then((res) => {
    //     console.log(res, 'ressssss')
    //     this.setState({
    //       propDatasourceSelectLoaiHopDong: {
    //         label: label,
    //         dataSource: res.data,
    //         type: e
    //       }
    //     })

    //     form.setFieldsValue({
    //       hd_doituong: res.data[0].id
    //     })
    //   })
    //   //var value = e === 'DV' ? 'combobox' : 'combobox2'
    //   this.setState({
    //     labelCombobox: label
    //     //optionChange: value
    //   })

    // }
    Request('hopdong/getduan', 'POST', null).then(res => {
      this.setState({
        comboBoxDuanSource: res.data
      })
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
      // Request('hopdong/getdonvi', 'POST', null).then(res => {
      //   this.setState({
      //     propDatasourceSelectLoaiHopDong: {
      //       label: 'Chọn khách hàng là '+hopdong.hd_loai,
      //       dataSource: hopdong.hd_doituong,
      //     }
      //   })
      // const { form } = this.formRef.props

      // form.setFieldsValue({
      //   hd_doituong: res.data[0].id

      // })
      //})
      //form.setFieldsValue(hopdong.hd_doituong)
      //onChangeClick_loaihopdong = (e) => {
      var label = hopdong.hd_loai === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
      var api = hopdong.hd_loai === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
      const { form } = this.formRef.props

      Request(api, 'post', null).then((res) => {
        //console.log(res, 'ressssss')
        this.setState({
          propDatasourceSelectLoaiHopDong: {
            label: label,
            dataSource: res.data,
            //type: e
          }
        })

        form.setFieldsValue({
          //hd_doituong: res.data[0].id
          hd_doituong: hopdong.hd_doituong
        })
      })
      //var value = e === 'DV' ? 'combobox' : 'combobox2'
      this.setState({
        labelCombobox: label
        //optionChange: value
      })

      // }
      await console.log(hopdong, 'hopdong truoc format')
      hopdong.hd_ngayky = hopdong.hd_ngayky === null ? null :formatdate(hopdong.hd_ngayky, 'yyyy-mm-dd')
      hopdong.hd_ngaythanhly = hopdong.hd_ngaythanhly === null ? null :formatdate(hopdong.hd_ngaythanhly, 'yyyy-mm-dd')
      hopdong.hd_ngaythanhtoan = hopdong.hd_ngaythanhtoan === null ? null :formatdate(hopdong.hd_ngaythanhtoan, 'yyyy-mm-dd')
      hopdong.hd_ngayxuathoadon = hopdong.hd_ngayxuathoadon === null ? null :formatdate(hopdong.hd_ngayxuathoadon, 'yyyy-mm-dd')
      hopdong.hd_ngayketthuc = hopdong.hd_ngayketthuc === null ? null :formatdate(hopdong.hd_ngayketthuc, 'yyyy-mm-dd')
      

      //console.log(hopdong, 'hopdong update')
      form.setFieldsValue(hopdong);
    }
  };

  handleOK = e => {
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
    return `Total ${total} items `;
  }

  onShowSizeChange = async (current, size) => {
    console.log('size', size);
    console.log('curent', current);
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      console.log('xxxx')
      this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch,
        this.state.codeSearch);
      console.log(this.state.page)
    }
    else {
      this.getHopdongs(this.state.page, this.state.index, this.state.sortBy)
    }
  }

  search = async (xxxx) => {
    Request('hopdong/search', 'POST', {
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
            hopdongs: data.data.hopdongs,
            count: Number(data.data.count), // ép kiểu về
            searchText: xxxx,
            isSearch: 1
          })
        console.log('data---------------------------', data);
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
      //console.log(res, 'ressssss')
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
    })
    //var value = e === 'DV' ? 'combobox' : 'combobox2'
    this.setState({
      labelCombobox: label
      //optionChange: value
    })

  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  onSelectDuan = async (value) => {
    if (value === 'add_duan') {
      //console.log('dcm vao roif')
      return this.setState({
        visible_duan: true
      })
    }
    // const { form } = this.formRef.props
    // await this.set_select_tenkh(value);
    // if (this.state.select_tenkh.length === 0) {
    //     await form.setFieldsValue({ kh_id: '' })
    // } else {
    //     await form.setFieldsValue({ kh_id: 0})
    // }
    // console.log('===========================selected====================', value)
  }



  onCancel_duan = () => {
    console.log('cancel')
    this.setState({
      visible_duan: false
    })
  }
  onOk_duan = () => {

    //console.log('ddaay  kaf  form nhe', this.saveFormRefCreate)

    // console.log('ok')
    // this.setState({
    //     visiblekh: true
    // })
  }

  saveFormRefCreate = formRef => {
    this.saveFormRefCreate = formRef
  }

  CreateDuan = e => {
    console.log('Đây là thêm dự án')
    e.preventDefault();
    Request(`hopdong/insertduan`, 'POST', null, {
    }).then((res) => {
      notification[res.data.success === true ? 'success' : 'error']({
        message: 'Thông báo',
        description: res.data.message
      });
      this.getHopdongs(this.state.page)
    })
  }

  render() {
    var dateFormat = require('dateformat');
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
            &nbsp;
          {/* <Search style={{ width: 300 }} pla
        
        
        
        ceholder="input search text" onSearch={(value) => { this.search(value) }} enterButton /> */}

          </div>
          <Row className="table-margin-bt" >
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
              //comboBoxDatasource1 = {this.state.comboBoxDatasource1}
              onChangeClick_loaihopdong={this.onChangeClick_loaihopdong}
              propDatasourceSelectLoaiHopDong={this.state.propDatasourceSelectLoaiHopDong}
            //onhiddenbutton =  {this.onhiddenbutton}
            />

            <FormModalDuan
              wrappedComponentRef={this.saveFormRefCreate}
              visible_duan={this.state.visible_duan}
              onCancel={this.onCancel_duan}
              onSave={this.onOk_duan}
              title={this.state.title_duan}
              formtype={this.state.formtype_duan}
              CreateDuan={this.CreateDuan}
            />


            <Table pagination={false} dataSource={this.state.hopdongs} rowKey="hd_id" scroll={{ x: 1000 }} >
              <Column
                title={<span>id hợp đồng<Icon type={this.state.orderby} /></span>}
                dataIndex="hd_id"
                key="hd_id"
                onHeaderCell={this.onHeaderCell}
                className="an"
              />
              <Column title="Tên dự án" dataIndex="dm_duan_ten" key="dm_duan_ten" onHeaderCell={this.onHeaderCell} />
              <Column title="Loại hợp đồng" className="an" dataIndex="hd_loai" key="hd_loai" onHeaderCell={this.onHeaderCell} />
              <Column title="Loại hợp đồng" dataIndex="ten_hd_loai" key="ten_hd_loai" onHeaderCell={this.onHeaderCell} />
              <Column title="Tên đối tượng" className='an' dataIndex="hd_doituong" key="hd_doituong" onHeaderCell={this.onHeaderCell} />
              <Column title="Tên đối tượng" dataIndex="ten_hd_doituong" key="ten_hd_doituong" onHeaderCell={this.onHeaderCell} />
              <Column title="Số hợp đồng" dataIndex="hd_so" key="hd_so" onHeaderCell={this.onHeaderCell} />
              <Column title="Thời gian thực hiện(ngày)" dataIndex="hd_thoigianthuchien" key="hd_thoigianthuchien" onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày kết thúc" dataIndex="hd_ngayketthuc" key="hd_ngayketthuc" 
              render={   
                  text => {
                  if(text===null)
                  return ' '
                  else
                  return dateFormat(text, "dd/mm/yyyy")}} onHeaderCell={this.onHeaderCell} />
              <Column title="Địa chỉ" dataIndex="hd_diachi" key="hd_diachi" onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày ký" dataIndex="hd_ngayky" key="hd_ngayky" render={   
                  text => {
                  if(text===null)
                  return ' '
                  else
                  return dateFormat(text, "dd/mm/yyyy")}} onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày thanh lý" dataIndex="hd_ngaythanhly" key="hd_ngaythanhly" render={   
                  text => {
                  if(text===null)
                  return ' '
                  else
                  return dateFormat(text, "dd/mm/yyyy")}} onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày xuất hóa đơn" dataIndex="hd_ngayxuathoadon" key="hd_ngayxuathoadon" render={   
                  text => {
                  if(text===null)
                  return ' '
                  else
                  return dateFormat(text, "dd/mm/yyyy")}} onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày thanh toán" dataIndex="hd_ngaythanhtoan" key="hd_ngaythanhtoan" render={   
                  text => {
                  if(text===null)
                  return ' '
                  else
                  return dateFormat(text, "dd/mm/yyyy")}} onHeaderCell={this.onHeaderCell} />
              <Column title="Trạng thái" className="an" dataIndex="hd_trangthai" key="hd_trangthai" onHeaderCell={this.onHeaderCell} />
              <Column title="Trạng thái" dataIndex="ten_hd_trangthai" key="ten_hd_trangthai" onHeaderCell={this.onHeaderCell} />
              <Column title="Files" dataIndex="hd_files" key="hd_files" onHeaderCell={this.onHeaderCell} />
              <Column title="Ghi chú" dataIndex="hd_ghichu" key="hd_ghichu" onHeaderCell={this.onHeaderCell} />
              <Column
                visible={false}
                title="hành động"
                key="action"
                render={(text, record) => (

                  <span>

                    <Button style={{ marginRight: 20 }} type="primary" onClick={this.showModal.bind(record.hd_id, text)}>
                      <Icon type="edit" />

                    </Button>
                    <Popconfirm
                      title="Bạn chắc chắn muốn xóa?"
                      onConfirm={this.deleteHopdong.bind(this, record.hd_id)}
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
    //fetchHopdong,
    fetchLoading
  }
)(Hopdong);
