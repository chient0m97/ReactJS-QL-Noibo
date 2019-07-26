import { Layout } from 'antd'
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;

const { Sider } = Layout


class AppSider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed
        }

        this.setCollapsed(props.collapsed)
    }

    setCollapsed = (value) => {
        this.setState({
            collapsed : value 
        })
    }

    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="home"/>
                        <span><NavLink to="/HomePage" className="">Home</NavLink ></span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>Menu</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5"><NavLink to="/user" className="">User</NavLink ></Menu.Item>
                        <Menu.Item key="3"><NavLink to="/hopdong" className="">Group</NavLink ></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Team</span>
                            </span>
                        }
                    >
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