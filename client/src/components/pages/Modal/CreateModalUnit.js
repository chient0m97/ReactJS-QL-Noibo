import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Divider } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
// import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import { async } from 'q';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;

const CreateModalUnit = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { Option } = Select;
            const combobox = [];
            // var kh_tendaydu = this.props.settenkh;
            combobox.push(<Option key={'HD'}>Hoạt động</Option>);
            combobox.push(<Option key={'DHD'}>Dừng hoạt động</Option>);
            combobox.push(<Option key={'GT'}>Giải thể</Option>);
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, dm_dv_id_visible, handleChange, select_diabanhuyen, select_diabantinh, select_diabanxa, onSelectDiaBanTinh, onSelectDiaBanHuyen, onSelectDiaBanXa, select_tenkh, onSelectKh } = this.props;
            console.log(dm_dv_id_visible)
            console.log("hien thi form ", form)
            const { getFieldDecorator } = form;
            var datacha = this.props.datacha
            console.log('fyuqfgqyu', this.props.settenkh)

            return (
                <div>
                    <Modal
                        visible={visible}
                        title="NHẬP THÔNG TIN ĐƠN VỊ:"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onSave}
                        confirmLoading={confirmLoading}
                        width={1000}
                    >
                        <Form layout={formtype}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <div style={{ display: dm_dv_id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item label="">
                                            {getFieldDecorator('dm_dv_id', {
                                                rules: [{}],
                                            })(<Input type="text" disabled hidden />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label='Tên Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_ten', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Địa Chỉ Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_diachi', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={24} >
                                <Col span={8}>
                                    <Form.Item label='Địa Bàn Tỉnh'>
                                        {getFieldDecorator('dm_db_id_tinh', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanTinh}>
                                            {
                                                select_diabantinh.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã Địa Bàn Huyện'>
                                        {getFieldDecorator('dm_db_id_huyen', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanHuyen}>
                                            {
                                                select_diabanhuyen.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Mã Địa Bàn Xã'>
                                        {getFieldDecorator('dm_db_id_xa', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanXa}>
                                            {
                                                select_diabanxa.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Mã Số Thuế Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_masothue', {
                                            // rules: [ {required: true, message: 'Vui lòng nhập vào ô này !!'}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Số Điện Thoại Đơn Vị:'>
                                        {getFieldDecorator('dm_dv_sodienthoai', {
                                            // rules: [ {required: true, message: 'Vui lòng nhập vào ô này !!'}],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Trạng Thái Đơn Vị'>
                                        {getFieldDecorator('dm_dv_trangthai', {
                                            rules: [{ required: true }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            onChange={handleChange}
                                        >
                                            {combobox}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label='Người Đại Diện'>
                                        {getFieldDecorator('kh_id_nguoidaidien', {
                                            // rules: [{required: true}],
                                        })(<Select onSelect={onSelectKh}
                                        >
                                            <Option value="add_nguoidaidien">Thêm người đại diện</Option>
                                            {
                                                select_tenkh.map((value, index) => {
                                                    return (
                                                        <Option value={value.kh_id}>{value.tennguoidaidien}</Option>
                                                    )
                                                })}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Đơn vị cấp trên:">
                                        {getFieldDecorator('dm_dv_id_cha', {
                                            // rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!',}],
                                        })(
                                            <Select>
                                                {datacha.map((item, i) => {
                                                    return (
                                                        <Option value={item.dm_dv_id}>{item.dm_dv_ten}</Option>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Form>

                    </Modal>
                </div>
            );

        }
    },
)
const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        //   fetchUser,
        fetchLoading
    })
    (CreateModalUnit);
