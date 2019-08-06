import { Tree } from 'antd';
import React from 'react';
const { TreeNode } = Tree;

const treeData = [
  
      {
        title: 'quản lý user',
        key: 'user',
        children: [
          { title: 'xem', key: 'USER.READ' },
          { title: 'thêm', key: 'USER.INSERT' },
          { title: 'sửa', key: 'USER.UPDATE' },
          { title: 'xóa', key: 'USER.DELETE' },
        ],
      },
      {
        title: 'quản lý vai trò',
        key: 'role',
        children: [
          { title: 'xem', key: 'ROLE.READ' },
          { title: 'thêm', key: 'ROLE.INSERT' },
          { title: 'sửa', key: 'ROLE.UPDATE' },
          { title: 'xóa', key: 'ROLE.DELETE' },
          { title: 'phân quyền', key: 'ROLE.PERMISISON' },
        ],
      },
      {
        title: 'quản lý lt',
        key: 'customer',
        children: [
          { title: 'xem', key: 'CUSTOMER.READ' },
          { title: 'thêm', key: 'CUSTOMER.INSERT' },
          { title: 'sửa', key: 'CUSTOMER.UPDATE' },
          { title: 'xóa', key: 'CUSTOMER.DELETE' },
        ],
      },
      {
        title: 'no name',
        key: 'admin',
        children: [
          { title: 'xem', key: 'ADMIN.READ' },
          { title: 'thêm', key: 'ADMIN.INSERT' },
          { title: 'sửa', key: 'ADMIN.UPDATE' },
          { title: 'xóa', key: 'ADMIN.DELETE' },
        ],
      },
    

  
];

class Demo extends React.Component {
  state = {
    expandedKeys: ['user', 'role'],
    autoExpandParent: true,
    checkedKeys: this.props.dataTree,
    selectedKeys: [],
  };

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  getState = () =>{
      return this.state.checkedKeys;
  }
  onCheck = async checkedKeys => {
    console.log('onCheck', checkedKeys);
   await this.setState({ checkedKeys });
    console.log('tree',this.state.checkedKeys)
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
componentWillReceiveProps(nextProps){
    if(nextProps.dataTree){
        this.setState({
            checkedKeys: nextProps.dataTree
        })
    }
}
  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}


export default Demo;