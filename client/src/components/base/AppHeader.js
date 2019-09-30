import React, { Component } from 'react'
import { Layout, Button, Icon, Dropdown, Menu, Col, Tooltip, Divider, Row, Avatar, Badge, notification } from 'antd'
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
      valueRate: 3,
      address: '',
      countBadge: 0,
      menuThongbao: null,
      noidung: 'có nội dung'
    }
  }


  getName = (user_cookie) => {
    Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
      if (res) {
        if (res.data.data.name[0] === undefined)
          this.setState({
            name: 'Chưa tạo nhân sự'
          })
        else
          this.setState({
            name: res.data.data.name[0].ns_hovaten,
            address: res.data.data.name[0].ns_address
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
      // console.log("values ", values)
      if (values.ht_thoigian_dukien_hoanthanh === null || values.ht_thoigian_dukien_hoanthanh === undefined) {
        values.ht_thoigian_dukien_hoanthanh = format(new Date(), 'yyyy-mm-dd')
      }
      Request(url, 'POST', values)
        .then(async (response) => {
          // console.log("read response ",response)
          //--------------------------
          var thongbao = {}
          thongbao.tb_thoigiantao = format(new Date(), 'dd-mm-yyyy - HH:MM:ss')
          thongbao.tb_noidung = values.ns_id_nguoitao + ' đã tạo công việc và gán cho bạn vào lúc ' + thongbao.tb_thoigiantao
          thongbao.tb_trangthai = 'chuadoc'
          thongbao.tb_ns_id = values.ns_id_ass
          thongbao.tb_ht_id = response.data.ht_id
          thongbao.tb_link = 'link'

          console.log('thongbao ', thongbao)
          //--------------------------

          Request('thongbao/insert', 'POST', thongbao).then((res) => {
            console.log("da cai dat duoc thongbao")
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
          var message = 'Thành Công'

          // console.log("check response ", response.data.success)
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
          // setTimeout(() => {
          //   window.location.reload()
          // }, 50);

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
      <Menu style={{ width: '140px' }}>
        <Menu.Item key="0">
          <a href="/viewprofile"> <Icon type="user" /> <span style={{ marginLeft: '5px' }}> View Profile </span></a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/changepassword"> <Icon type="edit" /> <span style={{ marginLeft: '5px' }}> Đổi mật khẩu </span></a>
        </Menu.Item>
        <Divider style={{ marginTop: '5px', marginBottom: '5px' }} />
        <Menu.Item key="2">
          <a onClick={this.logOut} href="/" style={{ color: 'red' }}> <Icon type="logout" /> <span style={{ marginLeft: '5px' }}>Đăng xuất</span></a>
        </Menu.Item>
      </Menu>
    );
  }

  renderMenuThongbao = () => {
    console.log("noidung ",this.state.noidung)
    return (
      this.state.noidung.map((value, index) => {
        {<Menu>
          <Menu.Item key={index + 10}>
            {value}
          </Menu.Item>
        </Menu>}
      })
    )
    // return (
    //   <Menu style={{ padding: '10px' }}>
    //     {this.state.countBadge === 0 ? 'Không có thông báo' : this.state.noidung}

    //     {/* <Menu.Item key="3">
    //       </Menu.Item> */}
    //   </Menu>
    // );
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
      menuThongbao: this.renderMenuThongbao
    })
    this.getName(user_cookie)
    this.getThongbao(user_cookie)
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

  handleChangeRate = valueRate => {
    const { form } = this.formRef.props
    form.setFieldsValue({ ht_vote: valueRate })
    this.setState({ valueRate });
  }

  getThongbao = (tb_ns_id) => {
    Request('thongbao/get', 'POST', { tb_ns_id }).then((res) => {
      if (res) {
        console.log("dem so thong bao ", res)
        this.setState({
          countBadge: res.data.data.thongbao.length
        })
        var noidung = []
        res.data.data.thongbao.map((value, index) => {
          noidung.push(value.tb_noidung)
        })
        this.setState({
          noidung: noidung
        })
        console.log("noi dung ", this.state.noidung)
      }
    })
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
          <Tooltip title='Tạo nhanh công việc'>
            <Button style={{ marginLeft: '65%' }} onClick={this.showModal.bind(this)}><Icon type="plus" /></Button>
          </Tooltip>

          <Dropdown overlay={this.state.menuThongbao}>
            <Badge count={this.state.countBadge} style={{ fontSize: '12 px', margin: '20px' }}>
              <a><Icon type="bell" style={{ fontSize: '25px', margin: '20px' }} /></a>
            </Badge>
          </Dropdown>

          <Dropdown overlay={this.state.menu} trigger={['click']}>
            <a style={{ marginLeft: '2%' }} className="ant-dropdown-link" href="/">
              <Avatar src={this.state.address} style={{ fontSize: '20px', backgroundColor: 'orange' }} />
              <Tooltip title="Tên tài khoản">
                <span style={{ fontSize: '16px' }}> {this.state.name} </span>
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
          handleChangeRate={this.handleChangeRate}
          valueRate={this.state.valueRate}
        />
      </div>
    )
  }
}

export default AppHeader