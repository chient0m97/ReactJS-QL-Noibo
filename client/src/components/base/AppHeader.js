import React, { Component } from 'react'
import { Layout, Button, Icon, Dropdown, Menu } from 'antd'
import cookie from 'react-cookies'

const { Header } = Layout

class AppHeader extends Component {
  constructor(props){
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
          <a href="/">Change Password</a>
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
    window.location.reload();
  }

  componentDidMount() {
    this.setState({
      menu: this.renderMenuUser
    })
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginLeft: 12 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Dropdown overlay={this.state.menu} trigger={[ 'click' ]}>
          <a style={{ marginLeft: '90%' }} className="ant-dropdown-link" href="/">
            <Icon type="user" />
          </a>
        </Dropdown>
              </Header>
    )
  }
}

export default AppHeader