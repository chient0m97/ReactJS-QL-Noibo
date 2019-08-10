import React, { Component } from 'react';
import Request from '@apis/Request'
import { Upload, Button, Icon } from 'antd';
import { array } from 'prop-types';
// import ChildComp2 from './ChildComp2';

const fileList = [
    {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tiger-591359_960_720.jpg',
        thumbUrl: 'https://cdn.pixabay.com/photo/2015/01/07/11/31/tiger-591359_960_720.jpg',
    }]

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [...fileList],
};

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            pageNumber: 1,
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Menu',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            isSort: true,
            sortBy: '',
            index: 'dm_menu_id',
            orderby: 'arrow-up',
            stateconfirmdelete: false,
            checkStateConfirm: true,
            statebuttondelete: true,
            statebuttonedit: true,
            rowthotroselected: [],
            selectedId: [],
            selectedRowKeys: [],
            url: null
        }
    }
    getUrl = (pageNumber) => {
        var array = null
        if (pageNumber <= 0)
            return;
        Request('menu/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {

                array = res.data.data.menus[res.data.data.menus.length - 1].dm_menu_url
                this.setState({
                    url: array
                })
                console.log("Hien thi ", res.data.data.menus.length)
                this.setState({
                    menu: res.data.data.menus,
                    count: res.data.data.count
                })
            })
    }

    componentDidMount() {
        this.getUrl(this.state.pageNumber, this.state.index, this.state.sortBy);
    }

    render() {
        return (
            <div>
                {/* <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                </Upload>
                <img style={{ width: '100%' }} src={this.state.url} alt="ảnh" /> */}


                <table style={{borderCollapse: 'collapse' }}>
                    <tr>
                        <th>NHU CẦU KINH PHÍ THỰC HIỆN BẢO HIỂM THẤT NGHIỆP THEO NGHỊ ĐỊNH 28/2015/NĐ - CP NĂM 2019</th>
                    </tr>
                    <tr>
                        <td >(Dùng cho các sở, ban ngành, cơ quan đảng, đoàn thể, UBND huyện, thành phố, Bảo hiểm xã hội tỉnh báo cáo Sở Tài chính)</td>
                    </tr>
                    {/* <td>b</td> */}
                </table>
            </div>
        );
    }
}

export default About;