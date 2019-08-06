import About from '@pages/About';
import HomePage from '@pages/HomePage';
import User from '@pages/User'
import NhanSu from '@pages/Nhansu'
import HoTro from '@pages/Hotro'
import Menu from '@pages/Menu'


const routers = [
    {
        path: '/homepage',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/about',
        component: About,
        name: 'About'
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
    }

]

export default routers