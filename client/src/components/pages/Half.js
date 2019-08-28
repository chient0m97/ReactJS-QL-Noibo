import React, { Component } from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card, DatePicker } from 'antd';

class Half extends Component {
    render() {
        var formatDateHMS = require('dateformat')
        return (
            <div>
                <Tag color="#f50">Thời gian đăng ký</Tag>
                <Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>
            </div>
        );
    }
}

export default Half;