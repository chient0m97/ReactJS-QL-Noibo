import { Layout } from 'antd'
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;

const { Sider } = Layout


class AppSider extends Component {
    rootSubmenuKeys = ['sub1', 'sub2'];
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
            openKeys: [],
        }

        this.setCollapsed(props.collapsed)
    }

    setCollapsed = (value) => {
        this.setState({
            collapsed: value
        })
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    <Menu.Item key="1">
                        <Icon type="home" />
                        <span><NavLink to="/HomePage" className="">Home</NavLink ></span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>Quản lý người dùng</span>
                            </span>
                        }
                    >
                        <Menu.Item key="2"><NavLink to="/user" className="">Quản lý nhân sự</NavLink ></Menu.Item>
                        <Menu.Item key="3"><NavLink to="/quan-ly-quyen" className="">Quản lý quyền</NavLink ></Menu.Item>
                        <Menu.Item key="4"><NavLink to="/quan-ly-san-pham" className="">Quản lý sản phẩm</NavLink ></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Menu gì</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5"><NavLink to="/quan-ly-nhan-su" className="">Quản lý khách hàng</NavLink ></Menu.Item>
                        <Menu.Item key="6"><NavLink to="/quan-ly-dia-ban" className="">Quản lý địa bàn</NavLink ></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default AppSider