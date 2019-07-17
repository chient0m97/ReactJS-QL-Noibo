import React from 'react';

import { Icon, Input, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Drawer, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { async } from 'q';
const _ = require('lodash')
const { Option } = Select

const compareOperator = [
    {name: 'Bằng', value : '=', icon: <Icon type="team"  />},
    {name: 'Khác', value : '<>', icon: <Icon type="diff"/>},
    {name: 'Lớn hơn', value : '>', icon: <Icon type="right" />},
    {name: 'Bé hơn', value : '<', icon: <Icon type="left" />}
]
class Groupfilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Tiềm kiếm nâng cao',
            visible: false, 
            placement: 'top',
            condition: [
                {
                    key: 0,
                    group_parent: '',
                    keyCondition: 0,
                    type: 'gcd',
                    level: 0,
                    value: ''
                }
            ]
        }
    }
    onClose = () => {
        this.setState({
            visible: this.state.visible ? false : true,
            condition: [
                {
                    key: 0,
                    group_parent: '',
                    keyCondition: 0,
                    type: 'gcd',
                    level: 0,
                    value: ''
                }
            ]
        })
    }
    showFilter = () => {
        this.setState({
            visible: true
        })
    }
    onSearch = () => {

    }

    addCondition = async (value, type) => {
        console.log(type, 'ddaay laf type')
        var condition = this.state.condition.sort(this.compareLevel)
        if (value.keyCondition === condition[ condition.length - 1 ].keyCondition) {
            condition.push({
                key: Number(this.state.condition[ Number(this.state.condition.length) - 1 ].key) + 1,
                group_parent: value.keyCondition,
                keyCondition: (Number(this.state.condition.length)),
                type: type,
                name: '',
                level: value.level + 1,
                value: 'key' + (value.keyCondition + 1) + '|cha|' + value.key
            })
        }
        else {
            for (var i = 0; i < condition.length; i++) {
                if (Number(condition[ i ].keyCondition) > Number(value.keyCondition)) {
                    condition[ i ].keyCondition = condition[ i ].keyCondition + 1
                }
                if (Number(condition[ i ].group_parent) > Number(value.keyCondition)) {
                    condition[ i ].group_parent = condition[ i ].group_parent + 1
                }
            }
            condition.push({
                key: Number(this.state.condition[ Number(this.state.condition.length) - 1 ].key) + 1,
                group_parent: value.keyCondition,
                keyCondition: value.keyCondition + 1,
                type: type,
                name: '',
                level: value.level + 1,
                value: 'key' + (value.keyCondition + 1) + '|cha|' + value.key
            })
        }
        await this.setState({
            condition: []
        })
        this.setState({
            condition: condition
        })
    }
    compareLevel = (a, b) => {
        if (a.level < b.level) {
            return -1;
        }
        if (a.last_nom > b.last_nom) {
            return 1;
        }
        return 0;
    }
    compareGroup = (a, b) => {
        if (Number(a.group_parent) < Number(b.group_parent)) {
            return -1;
        }
        if (Number(a.group_parent) > Number(b.group_parent)) {
            return 1;
        }
        return 0;
    }
    comparekeyCondition = (a, b) => {
        if (Number(a.keyCondition) < Number(b.keyCondition)) {
            return -1;
        }
        if (Number(a.keyCondition) > Number(b.keyCondition)) {
            return 1;
        }
        return 0;
    }
    

    onDeleteCondition = (key, level) => {

    }

    renderColumnSelect = (value) => {
        const { columnFilter } = this.props
        var itemColumnSelect = []
        columnFilter.map((valuefil, index)=> {
            itemColumnSelect.push(<Option value={valuefil.column + '@' + valuefil.type}> {valuefil.name} </Option>)
        })
        return (
            <Select defaultValue = {columnFilter[0].column+'@'+columnFilter[0].type} onChange ={ this.onChangeColumn.bind(this, value)}>
                {itemColumnSelect}
            </Select>
        )
    }
    renderCopareSelect = (value) => {
        var itemSelect = []
        compareOperator.map((valueComp, index)=> {
            itemSelect.push(<Option value= {valueComp.value}>{valueComp.name}<span style={{float: 'right'}}>{ valueComp.icon }</span></Option>)
        }) 

        return (
            <Select onChange = {this.onChangeCompare.bind(this, value)} defaultValue= {compareOperator[0].value}>
                { itemSelect }
            </Select>
        )
    }
    onChangeCompare =(value, e)=> {
        console.log(e, 'e  ddaay nha')
        console.log(value, 'value  ddaay nha')
    }
    onChangeColumn = (value, e)=> {
        console.log(e, 'e  ddaay nha')
        console.log(value, 'value  ddaay nha')
    }

    render() {
        var arr_condition = this.state.condition

        arr_condition.sort(this.comparekeyCondition)
        return (
            <div>
                <a href onClick={this.showFilter}>
                    <Icon type="filter" />
                    <span style={{ display: 'inline-block', padding: '0px 10px' }} >
                        {this.state.title}
                    </span>
                </a>
                <Drawer
                    title={this.state.tittle}
                    placement='top'
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    height={window.innerHeight - 0.2 * window.innerHeight}
                    width={window.innerWidth - 0.2 * window.innerWidth}
                    style={
                        {
                            overflowY: 'auto'
                        }
                    }

                >
                    <div>
                        {
                            arr_condition.map((value, index) => {
                                console.log(value.value, 'dcm value' + value.value)
                                const menu = (
                                    <Menu>
                                        <Menu.Item key="0">
                                            <a href onClick={this.addCondition.bind(this, value, 'cd')}>Điều kiện lọc </a>
                                        </Menu.Item>
                                        <Menu.Item key="1">
                                            <a href onClick={this.addCondition.bind(this, value, 'gcd')}>Nhóm điều kiện lọc </a>
                                        </Menu.Item>
                                    </Menu>
                                )

                                if (value.type === 'gcd') {
                                    var deleteGroup = ''
                                    if (!!!_.isEqual(this.state.condition[ 0 ], value)) {
                                        (
                                            deleteGroup = (
                                                <a className="ant-dropdown-link" href onClick={this.onDeleteCondition(value.key, value.level)}>
                                                    <Icon type="close" style={{ lineHeight: '100%' }} />
                                                </a>
                                            )
                                        )
                                    }
                                    else {
                                        deleteGroup = '' 
                                    }

                                    return (
                                        <Row gutter={24} style={{ marginLeft: value.level * 50 + 'px', height: '15x' }} className="mg-bt-10">
                                            <Col span={1}>
                                                {deleteGroup}
                                            </Col>

                                            <Col span={2}>
                                                <Select defaultValue='and' style={{ minWidth: '100px', height: '15x' }}>
                                                    <Option value='and'>Và</Option>
                                                    <Option value='or'>Hoặc</Option>
                                                </Select>
                                            </Col>
                                            <Col span={1}>
                                                <Dropdown overlay={menu} trigger={[ 'click' ]}>
                                                    <a className="ant-dropdown-link" href>
                                                        <Icon type="plus" />
                                                    </a>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    )

                                }

                                if (value.type === 'cd') {
                                    return (
                                        <Row gutter={24} style={{ marginLeft: value.level * 50 + 'px', height: '15x' }} className="mg-bt-10">
                                           <Col span={1}>
                                                <a className="ant-dropdown-link" href onClick={this.onDeleteCondition(value.key, value.level)}>
                                                    <Icon type="close" style={{ lineHeight: '100%' }} />
                                                </a>
                                            </Col>
                                            <Col span={2}>
                                                {this.renderColumnSelect(value)}
                                            </Col>
                                            <Col span={1}>
                                                {this.renderCopareSelect(value)} 
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                    </div>
                    <div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e8e8e8',
                                padding: '10px 16px',
                                textAlign: 'right',
                                left: 0,
                                background: '#fff',
                                borderRadius: '0 0 4px 4px',
                            }}
                        >
                            <Button
                                style={{
                                    marginRight: 8,
                                }}
                                onClick={this.onClose}
                            >
                                Thoát
                        </Button>
                            <Button onClick={this.onSearch} type="primary">
                                Tiềm kiếm
                        </Button>
                        </div>
                    </div>
                </Drawer>
            </div>
        );

    }

}
const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
    }
)(Groupfilter);
