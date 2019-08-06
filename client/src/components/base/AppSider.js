import { Layout } from 'antd'
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;

const { Sider } = Layout


class AppSider extends Component {
    rootSubmenuKeys = ['sub1', 'sub2','sub3'];
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
            menu: [],
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

    componentDidMount() {

    }

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
                        <Menu.Item key="2"><NavLink to="/user" className="">User</NavLink ></Menu.Item>
                        <Menu.Item key="3"><NavLink to="/quan-ly-quyen" className="">Quản lý quyền</NavLink ></Menu.Item>
                        <Menu.Item key="4"><NavLink to="/menu">Menu</NavLink></Menu.Item>

                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Quản lý khách hàng</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5"><NavLink to="/hotro" >Hỗ Trợ khách hàng</NavLink></Menu.Item>
                        <Menu.Item key="6"><NavLink to="/nhansu" >Nhân Sự</NavLink></Menu.Item>
                        <Menu.Item key="7"><NavLink to="/hopdong">Hợp đồng</NavLink></Menu.Item>
                        <Menu.Item key="9"><NavLink to="/customer" className="">Khách Hàng</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Quản lý ...</span>
                            </span>
                        }
                    >
                        <Menu.Item key="11"><NavLink to="/duan" className="">Dự án</NavLink ></Menu.Item>
                        <Menu.Item key="10"><NavLink to="/diaban" className="">Địa bàn</NavLink ></Menu.Item>
                        <Menu.Item key="8"><NavLink to="/unit" className="">Đơn vị</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="12">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default AppSider