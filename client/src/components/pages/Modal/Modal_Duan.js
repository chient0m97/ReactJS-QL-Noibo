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
const Modal_Duan = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible_duan_modal, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, comboBoxDatasource } = this.props;
      var combobox = []
      comboBoxDatasource.map((value, index) => {
        combobox.push(<Option value={value.ns_id}>{value.ns_ten}</Option>)
      })
      console.log(id_visible)
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible_duan_modal}
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
                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                  <Form.Item label="Id:" >
                    {getFieldDecorator('id', {
                      rules: [{}],
                    })(<Input type="number" disabled />)}
                  </Form.Item>
                </div>
              </Col>
            </Row>
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
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    showSearch
                  >
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
const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps,
  {
    //   fetchUser,
    fetchLoading
  })
  (Modal_Duan);  