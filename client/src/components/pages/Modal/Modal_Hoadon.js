import React from 'react';
import { Tooltip, Icon, Input, Modal, message, Button, Form, Row, Col, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
const { Option } = Select

const Modal_Menus = Form.create({ name: 'from_in_modal_menus' })(
    class extends React.Component {
        render() {
            const { title, visible, onCancel, onSave, formtype, form, id_visible, setKhachHang } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    centered
                    title={title}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onSave}
                >
                    <Form layout={formtype}>
                        <Row>
                            <Col>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item >
                                        {getFieldDecorator('qlhd_sohoadon', {
                                        })(<Input type="number" hidden />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Item label='Tên hóa đơn'>
                                    {getFieldDecorator('qlhd_tenhoadon', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Input type="text" size="small"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Tên khách hàng:'>
                                    {getFieldDecorator('qlhd_kh_id', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Select
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="small"
                                    >
                                        {
                                            setKhachHang.map((value, index) => {
                                                return (<Option value={value.kh_id}>{value.kh_ten}</Option>)
                                            })
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Ngày xuất hóa đơn:'>
                                    {getFieldDecorator('qlhd_ngayxuat_hoadon', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                        <Input type="date" size="small" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Tình trạng thanh toán :'>
                                    {getFieldDecorator('qlhd_tinhtrang_thanhtoan', {
                                    })(
                                        <Select
                                            size={"small"}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="CTT">Chưa thanh toán</Option>
                                            <Option value="DTT">Đã thanh toán</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    })

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchUser,
        fetchLoading
    })
    (Modal_Menus)