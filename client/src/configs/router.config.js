import About from '@pages/About';
import HomePage from '@pages/HomePage';
import User from '@pages/User'
import NhanSu from '@pages/Nhansu'



const routers = [
    {
        path: '/',
        component: HomePage,
        name: 'Home'
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
    

]

export default routers