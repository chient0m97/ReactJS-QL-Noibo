import { Layout } from 'antd'
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import Permission from '../Authen/Permission'
// import menu from '../Authen/GetMenu'
const { SubMenu } = Menu;

const { Sider } = Layout

class AppSider extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
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
        let token = cookie.load('token');

        let payload = jwt.decode(token);
        let claims = payload.claims;
        console.log('quyen ban oiiiiiiiiiiiiiiiiiii ', claims)
        if(claims !== undefined){
            for (let i = 0; i < claims.length; i++) {
                if (claims[i] === Permission.Role.Read) {
                    claims[i] = { url: '/role', des: 'Phân quyền',menu:1 }
                }
                else if (claims[i] === Permission.User.Read) {
                    claims[i] = { url: '/user', des: 'user',menu:1 }
                }
                else if (claims[i] === Permission.Hotro.Read) {
                    claims[i] = { url: '/hotro', des: 'Hỗ trợ',menu:2 }
                }
                else if (claims[i] === Permission.Nhansu.Read) {
                    claims[i] = { url: '/nhansu', des: 'Nhân sự',menu:2 }
                }
                else if (claims[i] === Permission.Diaban.Read) {
                    claims[i] = { url: '/diaban', des: 'Địa bàn',menu:3 }
                }
                else if (claims[i] === Permission.Duan.Read) {
                    claims[i] = { url: '/duan', des: 'Dự án',menu:3 }
                }
                else if (claims[i] === Permission.Khachhang.Read) {
                    claims[i] = { url: '/khachhang', des: 'Khách hàng',menu:2 }
                }
                else if (claims[i] === Permission.Donvi.Read) {
                    claims[i] = { url: '/donvi', des: 'Đơn vị',menu:2 }
                }
                else if (claims[i] === Permission.Hopdong.Read) {
                    claims[i] = { url: '/hopdong', des: 'Hợp đồng',menu:3}
                }
    
    
            }
        }
    
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
                        {claims.map((item, i) => {
                            if (item.url) {
                                if(item.menu===1){
                                    return <Menu.Item key={item.url}><NavLink to={item.url} className="">{item.des}</NavLink ></Menu.Item>
                                }
                            }

                        })}
                        {/* <Menu.Item key="2"><NavLink to="/user" className="">User</NavLink ></Menu.Item>
                        <Menu.Item key="3"><NavLink to="/quan-ly-quyen" className="">Quản lý quyền</NavLink ></Menu.Item>
                        <Menu.Item key="4"><NavLink to="/menu">Menu</NavLink></Menu.Item> */}

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
                    {claims.map((item, i) => {
                        if (item.url) {
                            if(item.menu===2){
                                return <Menu.Item key={item.url}><NavLink to={item.url} className="">{item.des}</NavLink ></Menu.Item>
                            }
                        }

                    })}
                        {/* <Menu.Item key="5"><NavLink to="/hotro" >Hỗ Trợ khách hàng</NavLink></Menu.Item>
                        <Menu.Item key="6"><NavLink to="/nhansu" >Nhân Sự</NavLink></Menu.Item>
                        <Menu.Item key="7"><NavLink to="/hopdong">Hợp đồng</NavLink></Menu.Item>
                        <Menu.Item key="9"><NavLink to="/customer" className="">Khách Hàng</NavLink></Menu.Item> */}
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
                         {claims.map((item, i) => {
                        if (item.url) {
                            if(item.menu===3){
                                return <Menu.Item key={item.url}><NavLink to={item.url} className="">{item.des}</NavLink ></Menu.Item>
                            }
                        }

                    })}
                        {/* <Menu.Item key="11"><NavLink to="/duan" className="">Dự án</NavLink ></Menu.Item>
                        <Menu.Item key="10"><NavLink to="/diaban" className="">Địa bàn</NavLink ></Menu.Item>
                        <Menu.Item key="8"><NavLink to="/unit" className="">Đơn vị</NavLink></Menu.Item>
                        <Menu.Item key="/231123das"><NavLink to="" className="">omg</NavLink></Menu.Item> */}
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