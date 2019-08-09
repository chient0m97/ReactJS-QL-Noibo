import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
// import { type } from 'os';
// import { unwatchFile } from 'fs';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
var formDateModal = require('dateformat');

const CreateModalCustomer = Form.create({ name: 'form_create_customer' })(
    class extends React.Component {

        render() {
            const { Option } = Select;
            const combobox = [];
            const comboboxx = [];

            combobox.push(<Option key={'DD'}>Đại diện</Option>);
            combobox.push(<Option key={'DM'}>Đầu mối liên lạc</Option>);
            combobox.push(<Option key={'TXLL'}>Thường xuyên liên lạc</Option>);

            comboboxx.push(<Option key={'Nam'}>Nam</Option>);
            comboboxx.push(<Option key={'Nữ'}>Nữ</Option>);
            comboboxx.push(<Option key={'Khác'}>Khác</Option>);

            const dateFormat = "YYYY-MM-DD";
            const { visible, onCancel, onOk_kh, Data, form, title, confirmLoading, formtype, kh_id_visible, handleChange, select_tinh, select_huyen, select_xa, onSelectTinh, onSelectHuyen, onSelectXa, select_tendv, onSelectDv, stateoption } = this.props;
            const { getFieldDecorator } = form;
            // var datacha = this.props.datacha
            return (
                <div>
                    <Modal
                        visible={visible}
                        title="Nhập thông tin khách hàng"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onOk_kh}
                        confirmLoading={confirmLoading}
                        width={1000}
                    >
                        <Form layout={formtype}>
                            <Row>
                                <Col span={24}>
                                    <div style={{ display: kh_id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item>
                                            {getFieldDecorator('kh_id', {
                                            
                                            })(<Input type="text" disabaled hidden />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Họ:'>
                                        {getFieldDecorator('kh_ho', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Tên lót:'>
                                        {getFieldDecorator('kh_tenlot', {
                                           rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Tên:'>
                                        {getFieldDecorator('kh_ten', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={5}>
                                    <Form.Item label='Ngày sinh:'>
                                        {getFieldDecorator('kh_ngaysinh', {
                                            // rules: [{}],
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(
                                            <Input type="date" size="small" format={dateFormat} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label='Giới tính:'>
                                        {getFieldDecorator('kh_gioitinh', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder='Please select'
                                            onChange={handleChange}
                                        >
                                            {comboboxx}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label='Định danh cá nhân:'>
                                        {getFieldDecorator('kh_dinhdanhcanhan', {
                                           
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label='Email:'>
                                        {getFieldDecorator('kh_email', {
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label='Số điện thoại:'>
                                        {getFieldDecorator('kh_sodienthoai', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Mã tỉnh:'>
                                        {getFieldDecorator('dm_db_id_tinh_customer', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectTinh}>
                                            {
                                                select_tinh.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã huyện:'>
                                        {getFieldDecorator('dm_db_id_huyen_customer', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectHuyen}>
                                            {
                                                select_huyen.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã xã:'>
                                        {getFieldDecorator('dm_db_id_xa_customer', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectXa}>
                                            {
                                                select_xa.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label='Địa chỉ:'>
                                        {getFieldDecorator('kh_diachi', {
                                            
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Đơn vị:'>
                                        {getFieldDecorator('dm_dv_id', {
                                            
                                        })(<Select onSelect={onSelectDv}
                                            >
                                                <Option value="add_donvi" disabled={stateoption}>Thêm đơn vị</Option>
                                                {
                                                    select_tendv.map((value, index) => {
                                                        return (
                                                            <Option value={value.dm_dv_id}>{value.tendonvi}</Option>
                                                        )
                                                    })}
                                            </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Vị trí công tác:'>
                                        {getFieldDecorator('kh_vitricongtac', {
                                            
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Liên lạc:'>
                                        {getFieldDecorator('kh_lienlac', {
                                            rules: [{required: true, message: 'Vui lòng nhập vào ô này !!',}],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder='Please select'
                                            onChange={handleChange}
                                        >
                                            {combobox}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            )
        }
    }
)
const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        //   fetchUser,
        fetchLoading
    })
    (CreateModalCustomer);
