import React, { Component } from 'react'
import { Layout, Button, Icon, Dropdown, Menu, Col, Tooltip, Card, Row, Avatar, Badge, notification } from 'antd'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import Request from '@apis/Request'
import Modal_Hotro from '@pages/Modal/Modal_Hotro.js'

const { Header } = Layout
var format = require('dateformat')

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      collapsed: props.collapsed,
      name: null,
      visible: false,
      id_duanfillmodal: [],
      nhansu: [],
      khachhang: [],
      donvis: [],
      date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</a>,
      trangthaibutton: false,
    }
  }

  getName = (user_cookie) => {
    Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
      if (res) {
        if (res.data.data.name[0] === undefined)
          this.setState({
            name: 'Chưa có tài khoản'
          })
        else
          this.setState({
            name: res.data.data.name[0].ns_hovaten
          })
      }
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false
    });
  };

  insertOrUpdate = async () => {
    const { form } = await this.formRef.props;

    await form.validateFields((err, values) => {
      if (err) {
        return
      }
      var url = 'hotro/insert'
      if (url === 'hotro/update') {
        let user_cookie = cookie.load('user');
        values.ns_id_capnhat = user_cookie
        values.nkht_thoigiancapnhat = new Date()
      }
      if (values.ht_thoigian_dukien_hoanthanh === null) {
        values.ht_thoigian_dukien_hoanthanh = format(new Date(), 'yyyy-mm-dd')
      }
      Request(url, 'POST', values)
        .then(async (response) => {
          if (response.status === 200 & response.data.success === true) {
            form.resetFields();
            this.setState({
              visible: false,
              message: response.data.message
            })
          }
          var description = response.data.message
          var notifi_type = 'success'
          var message = 'Thành Công'

          console.log("check response ", response.data.success)
          if (await !!!response.data.success) {
            message = 'Có lỗi xảy ra !'
            notifi_type = 'error'
            description = response.data.message.map((value, index) => {
              return <Alert type='error' message={value}></Alert>
            })
          }
          await notification[notifi_type]({
            message: message,
            description: description
          });
          this.props.getNhansu
          // this.render()
        }).catch((err) => {
          console.log(err)
        })
    })
  }

  onTodoChange = async (value) => {
    const { form } = this.formRef.props
    if (value === "daxong") {
      await this.setState({
        date: format(new Date(), "dd / mm / yyyy -- HH : MM : ss"),
        trangthai: true
      })
      form.setFieldsValue({ ht_thoigian_hoanthanh: format(new Date(), "yyyy-mm-dd") })
      form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: format(new Date(), "yyyy-mm-dd") })
    }
    else {
      await this.setState({
        date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</a>,
        trangthai: false
      })
      form.setFieldsValue({ ht_thoigian_hoanthanh: null })
    }
  }

  changeButton = (value) => {
    if (value !== "9298eb00-a6d9-11e9-bd04-0986e022adbf")
      this.setState({
        trangthaibutton: false
      })
    else
      this.setState({
        trangthaibutton: true
      })
  }

  Assignme = () => {
    var user_cookie = cookie.load('user');
    Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
      if (res) {
        if (res.data.data.name[0] === undefined) {
          this.setState({
            trangthaibutton: true
          })
        }
        else {
          var ns_id = res.data.data.name[0].ns_id
          const { form } = this.formRef.props
          form.setFieldsValue({ ns_id_ass: ns_id })
          this.setState({
            trangthaibutton: true
          })
        }
      }
    })
  }

  renderMenuUser = () => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="/viewprofile">View Profile</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/changepassword">Đổi mật khẩu</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a onClick={this.logOut} href="/"> <Icon type="logout" />Đăng xuất</a>
        </Menu.Item>
      </Menu>
    );
  }

  toggleCollapsed = (e) => {
    this.props.OnCollapsed(!this.state.collapsed)
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logOut = (e) => {
    cookie.remove('token', { path: '/' })
    cookie.remove('user', this.state.username)
    window.location.reload();
  }

  componentDidMount() {
    var user_cookie = cookie.load('user');
    this.setState({
      menu: this.renderMenuUser,
    })
    this.getName(user_cookie)
  }

  set_Select_KhachHang(dv) {
    if (dv === null) {
      dv = ""
    }
    Request('hotro/getkhachhangwhere', 'POST', { dv }).then((res) => {
      if (res.data.data.khachhangs) {
        this.setState({
          khachhang: res.data.data.khachhangs
        })
      }
    })
  }

  set_Select_id_duan() {
    Request('hotro/getidduan', 'POST', {}).then((res) => {
      if (res.data.data.duans) {
        this.setState({
          id_duanfillmodal: res.data.data.duans
        })
      }
    })
  }

  set_Select_NhanSu() {
    Request('hotro/getnhansu', 'POST', {}).then((res) => {
      if (res.data.data.nhansu) {
        this.setState({
          nhansu: res.data.data.nhansu
        })
      }
    })
  }

  set_Select_DonVi() {
    Request('hotro/getdonvi', 'POST', {}).then((res) => {
      if (res.data.data.donvis) {
        this.setState({
          donvis: res.data.data.donvis
        })
      }
    })
  }

  showModal = async () => {
    const { form } = this.formRef.props
    await this.setState({
      visible: true
    });
    form.setFieldsValue({ ht_thoigiantiepnhan: format(new Date(), "yyyy-mm-dd") });
    var user_cookie = await cookie.load('user');
    await form.setFieldsValue({ ns_id_nguoitao: user_cookie })
    this.set_Select_id_duan();
    this.set_Select_NhanSu();
    this.set_Select_KhachHang(null);
    this.set_Select_DonVi();
  }

  render() {
    let token = cookie.load('token')
    let payload = jwt.decode(token);
    let fullname = payload.fullname;
    // console.log(payload,'alo alo')
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Button type="dashed" onClick={this.toggleCollapsed} style={{ marginLeft: 12 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Button style={{ marginLeft: '50%' }} onClick={this.showModal.bind(this)}><Icon type="plus" />Tạo nhanh công việc</Button>
          <Dropdown overlay={this.state.menu} trigger={['click']}>
            <a style={{ marginLeft: '2%' }} className="ant-dropdown-link" href="/">
              <Badge count={0} style={{ fontSize: '20px', margin: '20px' }}>
                <Icon type="bell" style={{ fontSize: '25px', margin: '20px' }} />
              </Badge>
              <Avatar icon="user" style={{ fontSize: '20px', backgroundColor: 'orange' }} />
              <Tooltip title="Tên tài khoản">
                <span style={{ fontSize: '18px' }}> {this.state.name} </span>
              </Tooltip>
            </a>
          </Dropdown>
        </Header>
        <Modal_Hotro
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSave={this.insertOrUpdate}
          setidduan={this.state.id_duanfillmodal}
          setNhansu={this.state.nhansu}
          setKhachHang={this.state.khachhang}
          setDonVi={this.state.donvis}
          onTodoChange={this.onTodoChange}
          date={this.state.date}
          // trangthai={this.state.trangthai}
          assignme={this.Assignme}
          trangthaibutton={this.state.trangthaibutton}
          changeButton={this.changeButton}
          set_Select_KhachHang={this.set_Select_KhachHang.bind(this)}
        />
      </div>
    )
  }
}

export default AppHeader