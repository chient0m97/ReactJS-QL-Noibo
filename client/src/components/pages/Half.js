import React, { Component } from 'react';
import { Icon, Input, Button, Select, Tag, DatePicker } from 'antd';
const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;
class Half extends Component {
    render() {
        var formatDateHMS = require('dateformat')
        return (
            <div>
                <Tag color="#f50">Thời gian đăng ký</Tag>
                <Tag > <Icon type="clock-circle" />&nbsp; {formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")} </Tag>
                <hr style={{ width: '0px' }} />
                <InputGroup style={{ width: 316 }} compact>
                    <Select style={{ width: '26%' }} defaultValue="sang">
                        <Option value="sang">Sáng</Option>
                        <Option value="chieu">Chiều</Option>
                    </Select>
                    <DatePicker style={{ width: '74%' }}/>
                </InputGroup>
                <hr style={{ width: '0px' }} />
                <Select style={{ width: 316 }} placeholder="Đăng ký cho ai?">
                    <Option value="nhuan">anh Nhuận</Option>
                    <Option value="phe">anh Phê</Option>
                    <Option value="hoai">chị Hoài</Option>
                    <Option value="hoa">chị Hoa</Option>
                </Select>
                <hr style={{ width: '0px' }} />
                <TextArea
                    style={{ width: 316 }}
                    placeholder="Lý do nghỉ"
                    autosize={{ minRows: 3, maxRows: 5 }}
                />
                <hr style={{ width: '0px' }} />
                <Button type="primary">Đăng ký</Button>
            </div>
        );
    }
}
export default Half;