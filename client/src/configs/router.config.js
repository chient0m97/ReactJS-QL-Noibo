import RoleAction from '@pages/RoleAction';
import Action from '@pages/Action';
import NhanSu from '@pages/Nhansu'
import HoTro from '@pages/Hotro'
import Menu from '@pages/Menu'
import Unit from '@pages/Unit'
import Customer from '@pages/Customer'
import User from '@pages/User';
import Hopdong from '@pages/Hopdong'
import Diaban from '@pages/Diaban'
import Duan from '@pages/Duan'
import Donvi from '@pages/Unit'
import Group from '@pages/Group'
import Member from '../components/pages/Member';
import ChangePassword from '../components/pages/Modal/ChangePassword';
import ok from '../components/common/ok';

const routers = [
    {
        path: '/homepage',
        component: Action,
        name: 'homepage'
    },
    {
        path: '/member',
        component: Member,
        name: 'member'
    },
    {
        path: '/role',
        component: RoleAction,
        name: 'quản lý quyền'
    },
    {
        path: '/user',
        component: User,
        name: 'user'
    },
    {
        path: '/nhansu',
        component: NhanSu,
        name: 'nhansu'
    },
    {
        path: '/hotro',
        component: HoTro,
        name: 'hotro'
    },
    {
        path: '/menu',
        component: Menu,
        name: 'menu'
    },
    {
        path: '/unit',
        component: Unit,
        name: 'unit'
    },
    {
        path: '/khachhang',
        component: Customer,
        name: 'khachhang'
    },
  
    {
        path: '/hopdong',
        component: Hopdong,
        name: 'Hopdong'
    },
    {
        path: '/diaban',
        component: Diaban,
        name: 'Diaban'
    },
    {
        path: '/duan',
        component: Duan,
        name: 'Duan'
    },
    {
        path: '/donvi',
        component: Donvi,
        name: 'donvi'
    },
    {
        path: '/group',
        component: Group,
        name: 'Group'
    },
    {
        path: '/changepassword',
        component: ChangePassword,
        name: 'changepassword'
    },
    {
        path: '/ok',
        component: ok,
        name: 'ok'
    },
]

export default routers