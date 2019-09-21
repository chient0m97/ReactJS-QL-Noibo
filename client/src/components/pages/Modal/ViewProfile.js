import React from 'react';
import { Pagination, AutoComplete , Icon, Mentions, Upload, Table, Input, Checkbox, Modal, Popconfirm, message, Button, Spin, Form, Row, Col, notification, Alert, Select } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action'
import jwt from 'jsonwebtoken'
import '@styles/style.css'
var formatDateModal = require('dateformat')
const token = cookie.load('token');
const { Column } = Table;
var { Option } = Mentions;
var { Option } = AutoComplete;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  
  class Avatar extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
  
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { imageUrl } = this.state;
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      );
    }
  }

const FormSyss = Form.create({ name: 'normal_login' })(
    class extends React.Component {

        handleSubmit = e => {
            e.preventDefault()
            this.props.save();
        };
        setform = (value) => {
            this.props.form.setFieldsValue(value)
        }

        
        render() {
            const { form, getProfile, onSave } = this.props;
            const { getFieldDecorator } = form;
            const profile = this.props.profile
            return (



                <Form style={{ padding: '10px' }} onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <div >
                                <Form.Item  >
                                    {getFieldDecorator('ns_id')(<Input type="text" hidden />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} align="middle" style={{ marginTop: 'px' }}>
                        <Col span={6}>
                            <Form.Item label="Họ">
                                {getFieldDecorator('ns_ho', {
                                    initialValue: "afc163",
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(
                                    //<Input size={"small"} type="text" />
                                    <Mentions>
                                        <Option value="afc163">afc163</Option>
                                    </Mentions>
                                    )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tên lót">
                                {getFieldDecorator('ns_tenlot', {
                                    rules: [{}]
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tên">
                                {getFieldDecorator('ns_ten', {
                                    rules: [{ required: true, message: 'Trường không được để trống!', }],
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={2} offset={2}><Avatar size="large" /></Col>

                    </Row>
                  
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Ngày Sinh">
                                {getFieldDecorator('ns_ngaysinh', {
                                    rules: [{ required: true, message: 'Trường không được để trống!', }],
                                })
                                    (
                                        <Input type="date" size={"small"} />
                                    )

                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Giới Tính">
                                {getFieldDecorator('ns_gioitinh', {
                                    initialValue: "Nam",
                                    rules: [{ required: true, message: 'Trường không được để trống', }],
                                })(<Select

                                >
                                    <Option value="Nam" >Nam</Option>
                                    <Option value="Nữ" >Nữ</Option>
                                    <Option value="Khác" >Khác</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <div>
                            <Col span={6}>
                                <Form.Item label="Trạng thái">
                                    {getFieldDecorator('ns_trangthai', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(<Select

                                    >
                                        <Option value="TT" >Thực Tập</Option>
                                        <Option value="HC" >Học Việc</Option>
                                        <Option value="TV" >Thử Việc</Option>
                                        <Option value="CT" >Chính Thức</Option>
                                        <Option value="NV" >Nghỉ Việc</Option>
                                        <Option value="Khac" >Khác</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </div>
                        
                    </Row>
                    
                  
                    <Row gutter={24}>
                        <Col span={9}>
                            <Form.Item label="Định danh cá nhân">
                                {getFieldDecorator('ns_dinhdanhcanhan', {
                                    rules: [{ required: true, message: 'Trường không được để trống!', }],
                                })(<Select

                                >
                                    <Option value="Khac" >Khác</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Số điện thoại">
                                {getFieldDecorator('ns_sodienthoai', {
                                    rules: [{}],
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Email">
                                {getFieldDecorator('ns_email', {
                                    rules: [{}],
                                })(<Input size={"small"} type="email" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={9}>
                            <Form.Item label="Địa chỉ hiện nay">
                                {getFieldDecorator('ns_diachihiennay', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Nguyên quán">
                                {getFieldDecorator('ns_nguyenquan', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Người liên hệ">
                                {getFieldDecorator('ns_nguoilienhe', {
                                    rules: [{}]
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={9}>
                            <Form.Item label="Bằng cấp">
                                {getFieldDecorator('ns_bangcap', {
                                    rules: [{}]
                                })(<Input size={"small"} type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Các giấy tờ đã nộp">
                                {getFieldDecorator('ns_cacgiaytodanop', {
                                    rules: [{}]
                                })(<Input type="text" size={"small"} />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tài khoản ngân hàng">
                                {getFieldDecorator('ns_taikhoannganhang', {
                                    rules: [{}]
                                })(<Input type="text" size={"small"} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Ngày học việc">
                                {getFieldDecorator('ns_ngayhocviec', {
                                    rules: [{}]
                                })(
                                    <Input size={"small"} type="date" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày thử việc">
                                {getFieldDecorator('ns_ngaythuviec', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(
                                    <Input size={"small"} type="date" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày làm chính thức">
                                {getFieldDecorator('ns_ngaylamchinhthuc', {
                                    rules: [{}]
                                })(
                                    <Input size={"small"} type="date" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày đóng bảo hiểm">
                                {getFieldDecorator('ns_ngaydongbaohiem', {
                                    rules: [{}]
                                })(
                                    <Input size={"small"} type="date" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row>
                            <Button onClick={this.props.onCancel}>Thoát</Button>
                        </Row> */}
                    <Form.Item style={{ marginTop: '25px' }}>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '490px' }} >
                            SAVE CHANGES
                        </Button>
                        <Button type="default" style={{ marginLeft: '10px' }} onClick={getProfile}  >
                            DISCARD CHANGES
                         </Button>
                    </Form.Item>
                </Form>
            );

        }
    }
);


class ViewProfile extends React.Component {
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
            pagexx: [],
            editForm: true,
            nhansu: [],

        }
    }
    //--------------DELETE-----------------------

    save = () => {
    
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            Request('nhansu/updatens', 'POST', values).then(res => {
                
                console.log('values',values)
                message.success(res.data.message)
                this.setState({
                    nhansu : values
                })
            })
        })

        
    }

    getProfile = async () => {
        const form = this.formRef.props.form;
        const value = form.getFieldsValue()
      
        await Request('nhansu/get', 'POST', null)
          .then((response) => {
    
            console.log('response;,', response)
         
            if (response.data)
    
              this.setState({
                profile: response.data,
              })
          })
         
        console.log('dcm', this.state.nhansu)
        
        form.setFieldsValue(this.state.nhansu)
      }

  

    refresh = (pageNumber) => {
        this.getProfile(this.state.pageNumber)
    }

    bindData = async () => {
        const { form } = this.formRef.props;
        var payload = jwt.decode(token);
        console.log('token', payload.mdd)

        let a = payload.mdd
        await Request('nhansu/viewprofile', 'POST', {
            a
        })
            .then((res) => {
                console.log('asdasddddddddddddddd', res.data.data.nhansu)
                let xx = res.data.data.nhansu[0]
                xx.ns_ngaysinh = formatDateModal(xx.ns_ngaysinh, 'yyyy-mm-dd')
                xx.ns_ngayhocviec = formatDateModal(xx.ns_ngayhocviec, 'yyyy-mm-dd')
                xx.ns_ngaythuviec = formatDateModal(xx.ns_ngaythuviec, 'yyyy-mm-dd')
                xx.ns_ngaylamchinhthuc = formatDateModal(xx.ns_ngaylamchinhthuc, 'yyyy-mm-dd')
                xx.ns_ngaydongbaohiem = formatDateModal(xx.ns_ngaydongbaohiem, 'yyyy-mm-dd')
                if (res.data.data.nhansu) {
                    this.setState({
                        nhansu: xx,

                    })
                }
                this.props.fetchLoading({
                    loading: false
                })
            })
        console.log('aaaaaaaaaaaaa', this.state.nhansu)
        form.setFieldsValue(this.state.nhansu)

    }
    componentDidMount() {
        this.bindData();

    }



    onchangpage = (page) => {
        this.setState({
            page: page
        })

        this.getProfile(page); if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getProfile(page)
        }
    }

    showModal = (nhansu) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        this.openModal()
        form.resetFields();
        form.setFieldsValue({ ns_trangthai: 'TT' })
        if (nhansu.ns_id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update'
            })

            form.setFieldsValue(nhansu);
        }
        this.set_Select_DinhDanh();
    }

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

    showTotal = (total) => {
        return `Total ${total} items`;
    }



    saveFormRef = formRef => {
        this.formRef = formRef;
    }


    render() {
        if (token)
            return (
                <div>


                    <p style={{ textAlign: 'center' }}></p>
                   
                    <FormSyss wrappedComponentRef={this.saveFormRef} save={this.save} onSave={this.insertOrUpdate} getProfile={this.getProfile} />
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
)(ViewProfile);
