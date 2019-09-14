import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import io from 'socket.io-client';
import cookie from 'react-cookies'
var socket = io('localhost:6969');
var ten = cookie.load('user');
const { Column } = Table;
var datas = [
    {
        key: '1',
        nguoiDangKy: 'John Brown',
        thoiGianDangKy: 'New York No. 1 Lake Park',
        ngayBatDau: 'New York No. 1 Lake Park',
        ngayKetThuc: 'New York No. 1 Lake Park',
        lyDo: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        nguoiDangKy: 'Jim Green',
        thoiGianDangKy: 42,
        ngayBatDau: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        nguoiDangKy: 'Joe Black',
        thoiGianDangKy: 32,
        ngayBatDau: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

class Approved extends Component {
    
    componentWillMount() {
        if(ten==="admin")
        {
         socket.on("server-send-nhuan", function(data){
            console.log(data,'data');
            datas.push(data)
         })            
        }
    }
    
    onClickPheDuyet = () => {
        if(ten==="admin")
        {
         socket.on("server-send-nhuan", data)
             console.log(data,'data');
        }
    }
    render() {
        return (
            <Table dataSource={datas}>
                <Column title="Tên" dataIndex='nguoiDangKy' key='nguoiDangKy' />
                <Column title="Thời gian đăng ký" dataIndex='thoiGianDangKy' key='thoiGianDangKy' />
                <Column title="Ngày bắt đầu" dataIndex='ngayBatDau' key='ngayBatDau' />
                <Column title="Ngày kết thúc" dataIndex='ngayKetThuc' key='ngayKetThuc' />
                <Column title="Lý do" dataIndex='lyDo' key='lyDo' />
                <Column title="Hành động" key='action' render = { () =>
                    (<span>
                        <Tag color="geekblue" onClick={()=>this.onClickPheDuyet()}>Phê duyệt</Tag>
                        <Divider type="vertical" />
                        <Tag color="volcano">Không phê duyệt</Tag>
                    </span>)
                }/>
            </Table>
        );
    }
}

export default Approved;