import React, { Component } from 'react'
import { Layout, Button, Icon, Dropdown, Menu, Col, Tooltip, Card, Row, Avatar } from 'antd'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import Request from '@apis/Request'

const { Header } = Layout

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      collapsed: props.collapsed,
      name: null
    }
  }

  getName = (cookie) => {
    Request('hotro/getname', 'POST', { cookie }).then((res) => {
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

  renderMenuUser = () => {
    return (
      <Menu>
        <Menu.Item key="0">
        <a href="https://www.google.com/">View Profile</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/changepassword">Change Password</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a onClick={this.logOut} href="/">Log Out</a>
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

  render() {
    let token = cookie.load('token')
    let payload = jwt.decode(token);
    let fullname = payload.fullname;
    console.log(payload,'alo alo')
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Button type="dashed" onClick={this.toggleCollapsed} style={{ marginLeft: 12 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Dropdown overlay={this.state.menu} trigger={['click']}>
            <a style={{ marginLeft: '75%' }} className="ant-dropdown-link" href="/">
              <Avatar icon="user" style={{ fontSize: '20px', backgroundColor: 'orange' }} />
              <Tooltip title="Tên tài khoản">
                <span style={{ fontSize: '18px' }}> {fullname} </span>
              </Tooltip>
            </a>
          </Dropdown>
        </Header>
      </div>
    )
  }
}

export default AppHeader