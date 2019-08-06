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
            collapsed: props.collapsed,
            menu: []
        }

        this.setCollapsed(props.collapsed)
    }

    setCollapsed = (value) => {
        this.setState({
            collapsed : value 
        })
    }

    componentDidMount(){
        
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
                        <Menu.Item key="10"><NavLink to="/nhansu" >Nhân Sự</NavLink></Menu.Item>
                        <Menu.Item key="11"><NavLink to="/hotro" >Hỗ Trợ</NavLink></Menu.Item>
                        <Menu.Item key="12"><NavLink to="/menu">Menu</NavLink></Menu.Item>
                        <Menu.Item key="4"><NavLink to="/about" className="">About</NavLink ></Menu.Item>
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