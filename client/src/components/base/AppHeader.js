import React, { Component } from 'react'
import { Layout, Button, Icon, Dropdown, Menu, Col, Tooltip } from 'antd'
import cookie from 'react-cookies'

const { Header } = Layout

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      collapsed: props.collapsed
    }
  }
  renderMenuUser = () => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="/changepassword">Change Password</a>
        </Menu.Item>
        <Menu.Item key="1">
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
    this.setState({
      menu: this.renderMenuUser,
    })
  }

  render() {
    var user_cookie = cookie.load('user');
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Button type="dashed" onClick={this.toggleCollapsed} style={{ marginLeft: 12 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Dropdown overlay={this.state.menu} trigger={['click']}>
            <a style={{ marginLeft: '83%' }} className="ant-dropdown-link" href="/">
              <Icon type="user" style={{ fontSize: '20px' }} />
              <Tooltip title="Tên tài khoản">
              <span style={{ fontSize: '18px' }}> {user_cookie} </span>
              </Tooltip>
            </a>
          </Dropdown>
        </Header>
      </div>
    )
  }
}

export default AppHeader