import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
//import { fetchHopdong } from '@actions/hopdong.action';
import { fetchLoading } from '@actions/common.action';

const dateFormat = 'YYYY-MM-DD';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;



const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, form, title, confirmLoading, formtype, id_visible } = this.props;
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
              <Col span={8}>
                
                  <Form.Item label="Id hợp đồng tôi là tôi:" >
                    {getFieldDecorator('hd_id', {
                      rules: [ {required: true, message: 'Trường này không được bỏ trống!', } ],
                    })(<Input type="number" />)}
                  </Form.Item>
               
              </Col>
            
              <Col span={4}>
                <Form.Item label="Id dự án:">
                  {getFieldDecorator('dm_duan_id', {
                    rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="number" disabled/>)}
                </Form.Item>
              </Col>
              <Col span={4}>
                 <Form.Item label="Tên dự án:" >
                    {
                      getFieldDecorator('dm_duan_id', {
                      rules: [ {required: true, message: 'Trường này không được bỏ trống!', } ],
                    })(
                    <Select onChange={this.props.onChangeId}>
                      <Option value="1">DA01 - QLTV</Option>
                      <Option value="2">DA02 - QLBH</Option>
                      {/* <Option value="10">DA03 - QLTV</Option>
                      <Option value="11">DA04 - QLMT</Option>
                      <Option value="12">DA05 - QLND</Option> */}
                    </Select>
                    
                    )}
                  </Form.Item>
              </Col>
        
            
              <Col span={8}>
                <Form.Item label="Loại hợp đồng:">
                  {getFieldDecorator('hd_loai', {
                    rules: [ { required: true, message: 'Trường này không được bỏ trống!', } ],
                  })(
                    <Select >
                      <Option value="CN">CN</Option>
                      <Option value="DV">DV</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="Số hợp đồng:">
                  {getFieldDecorator('hd_so', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            
            
              <Col span={4}>
                <Form.Item label="Thời gian thực hiện:">
                  {getFieldDecorator('hd_thoigianthuchien', {
                  })(<Input type="number" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Loại thời gian:">
                {
                  getFieldDecorator('hd_thoigianthuchien', {
                     initialValue : '90'
                  })(<Select  onChange={this.props.onchangeOptionThoiGianHD}>
                  <Option value="30">1 Tháng</Option>
                  <Option value="90">3 Tháng</Option>
                  <Option value="180">6 Tháng</Option>
                  <Option value="365">1 Năm</Option>
                </Select>)}
                
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày kết thúc:">
                  {getFieldDecorator('hd_ngayketthuc', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(
                    <Input type="date" format={dateFormat} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="Địa chỉ:">
                  {getFieldDecorator('hd_diachi', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày ký:">
                  {getFieldDecorator('hd_ngayky', {
                  })(<Input type="date" format={dateFormat} />
                   )}
                </Form.Item>
              </Col>
            
           
              <Col span={8}>
                <Form.Item label="Ngày thanh lý:">
                  {getFieldDecorator('hd_ngaythanhly', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="date" format={dateFormat} />
                   )}
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="Ngày xuất hóa đơn:">
                  {getFieldDecorator('hd_ngayxuathoadon', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Input type="date" format={dateFormat}/>
                   )}
                </Form.Item>
              </Col>
            
              <Col span={8}>
                <Form.Item label="Ngày thanh toán:">
                  {getFieldDecorator('hd_ngaythanhtoan', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="date" format={dateFormat} />
                   
                    )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Trạng thái:">
                  {getFieldDecorator('hd_trangthai', {
                   // rules: [ { required: true, message: 'Trường này không được để trống!', } ],
                  })(<Select >
                    <Option value="DTH">Đang thực hiện</Option>
                    <Option value="TL">Thanh lý</Option>
                    <Option value="XHD">Xuất hóa đơn</Option>
                    <Option value="DTT">Đã thanh toán</Option>
                    <Option value="DONG">Đóng</Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Files:">
                  {getFieldDecorator('hd_files', {
                    //rules: [ { required: true, message: 'Trường này không được để trống!' } ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ghi chú:">
                  {getFieldDecorator('hd_ghichu', {
                    //rules: [ { required: true, message: 'Trường này không được để trống!', } ],
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
      //id_visible: false,
      //action: 'insert',
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
  //tu day den render
  deleteHopdong = (hd_id) => {
    Request(`hopdong/delete`, 'DELETE', {hd_id: hd_id})
    .then((res) => {
        notification[ res.data.success === true ? 'success' : 'error' ]({
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
        if (data.data)
        this.setState({
            hopdongs: data.data.hopdongs,
            count: Number(data.data.count) // ép kiểu về    
        })
        this.props.fetchLoading({
            loading: false

        })
    })
}

//---Insert---
InsertOrUpdateHopdong = () => {
    const {form}= this.formRef.props;
    form.validateFields((err, values) => {
        if (err) {
            return
        }
        console.log(values, "day la value");
        var url = this.state.action === 'insert' ? 'hopdong/insert' : 'hopdong/update'
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

            if(!!!response.data.success) {
                message = 'Có lỗi xảy ra!'
                notifi_type = 'error'
                description = response.data.message.map((values, index) => {
                    return <Alert type = 'error' message = {values}></Alert>
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

refresh = (pageNumber) => {
    this.getHopdongs(this.state.pageNumber)
}
componentDidMount(){
    this.getHopdongs(this.state.pageNumber, this.state.index, this.state.sortBy);
}
onchangpage = (page) => {
    this.setState({
        page: page
    })
    

    this.getHopdongs(page); if(this.state.isSearch === 1){
        this.search(this.state.searchText) 
    }
    else {
        this.getHopdongs(page)
    }
}
onchangeoption = (value) =>  {
  const {form} = this.formRef.props
  console.log(value, 'gia tri cua f')
  form.setFieldsValue({
    hd_thoigianthuchien: value
  })
}
onchangeid = (value) =>  {
  const {form} = this.formRef.props
  console.log(value, 'gia tri cua id')
  form.setFieldsValue({
    dm_duan_id: value
  })
}
showModal = (hopdong) => {
    const {form} = this.formRef.props
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
        form.setFieldsValue(hopdong);
    }
};

handleOK = e =>{
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

handleCount = () =>{
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
    else{
        this.getHopdongs(this.state.page, this.state.index, this.state.sortBy)
    }
}

search = async (xxxx) => {
    Request('hopdong/search','POST', {
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
        console.log('data---------------------------',data);
    })
}

onChangeSearchType = async (value) => {
    console.log('hihi', this.state.searchText)
    await this.setState({
        columnSearch: value,
    })
    if (this.state.searchText){
        this.search(this.state.searchText);
    }
    console.log(`selected ${value}`);
}

onSearch = (val) => {
    console.log('search:', val);
}

onHeaderCell = (column) => {
    return {
        onClick: async() => {
            console.log('ccmnr', column.dataIndex)
            if (this.state.isSort){
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
            else{
                this.getHopdongs(this.state.page)
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
              defaultValue={[ 'dm_duan_id' ]}
              showSearch
              style={{ width: 200 }}
              //placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.onChange}
              // onFocus={this.onFocus}
              // onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="dm_duan_id">Dự án id</Option>
              <Option value="hd_loai">Loại hợp đồng</Option>
              <Option value="hd_so">Số hợp đồng</Option>
              <Option value="hd_thoigianthuchien">Thời gian thực hiện</Option>
              <Option value="hd_ngayketthuc">Ngày kết thúc</Option>
              <Option value="hd_diachi">Địa chỉ</Option>
              <Option value="hd_ngayky">Ngày ký</Option>
              <Option value="hd_ngaythanhly">Ngày thanh lý</Option>
              <Option value="hd_ngayxuathoadon">Ngày xuất hóa đơn</Option>
              <Option value="hd_ngaythanhtoan">Ngày thanh toán</Option>
              <Option value="hd_trangthai">Trạng thái</Option>
              <Option value="hd_files">Files</Option>
              <Option value="hd_ghichu">Ghi chú</Option>
            </Select>&nbsp;
          <Search style={{ width: 300 }} placeholder="input search text" onSearch={(value) => { this.search(value) }} enterButton />

          </div>
          <Row className="table-margin-bt">
            <FormModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateHopdong}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              onchangeOptionThoiGianHD = {this.onchangeoption}
              onChangeId = {this.onchangeid}
            />

              
            <Table pagination={false} dataSource={this.state.hopdongs} rowKey="hd_id"  >
              <Column
                title={<span>id hợp đồng<Icon type={this.state.orderby} /></span>}
                dataIndex="hd_id"
                key="hd_id"
                onHeaderCell={this.onHeaderCell}
              />
              <Column title="id dự án" dataIndex="dm_duan_id" key="dm_duan_id" onHeaderCell={this.onHeaderCell}/>
              <Column title="loại hợp đồng" dataIndex="hd_loai" key="hd_loai"  onHeaderCell={this.onHeaderCell}/>
              <Column title="số hợp đồng" dataIndex="hd_so" key="hd_so" onHeaderCell={this.onHeaderCell} />
              <Column title="thời gian thực hiện" dataIndex="hd_thoigianthuchien" key="hd_thoigianthuchien" onHeaderCell={this.onHeaderCell} />
              <Column title="ngày kết thúc" dataIndex="hd_ngayketthuc" key="hd_ngayketthuc" onHeaderCell={this.onHeaderCell} />
              <Column title="địa chỉ" dataIndex="hd_diachi" key="hd_diachi" onHeaderCell={this.onHeaderCell} />
              <Column title="ngày ký" dataIndex="hd_ngayky" key="hd_ngayky" onHeaderCell={this.onHeaderCell} />
              <Column title="ngày thanh lý" dataIndex="hd_ngaythanhly" key="hd_ngaythanhly" onHeaderCell={this.onHeaderCell} />
              <Column title="ngày xuất hóa đơn" dataIndex="hd_ngayxuathoadon" key="hd_ngayxuathoadon" onHeaderCell={this.onHeaderCell} />
              <Column title="ngày thanh toán" dataIndex="hd_ngaythanhtoan" key="hd_ngaythanhtoan" onHeaderCell={this.onHeaderCell} />
              <Column title="trạng thái" dataIndex="hd_trangthai" key="hd_trangthai" onHeaderCell={this.onHeaderCell} />
              <Column title="files" dataIndex="hd_files" key="hd_files" onHeaderCell={this.onHeaderCell} />
              <Column title="ghi chú" dataIndex="hd_ghichu" key="hd_ghichu" onHeaderCell={this.onHeaderCell} />
              <Column
                visible={false}
                title="Action"
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
