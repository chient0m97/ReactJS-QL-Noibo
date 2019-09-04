import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class AppFooter extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center', fontSize: '12px', padding: '5px' }}>
                <div>Version 1.0.</div>
                <div>Copyright @ 2019 HCM Company.</div>
                <div>All rights reserved.</div>
            </Footer>
        )
    }
}

export default AppFooter