import React, { Component } from 'react'
import { Layout } from 'antd'

const {Footer} = Layout

class AppFooter extends Component {
    render (){
        return (
            <Footer style={{ textAlign: 'center' }}>HCM Company</Footer>
        )
    }
}

export default AppFooter