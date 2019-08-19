import RoleAction from '@pages/RoleAction';
import HomePage from '@pages/homepage';
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

const routers = [
    {
        path: '/homepage',
        component: HomePage,
        name: 'home'
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
        name: 'Duan'
    },
]

export default routers