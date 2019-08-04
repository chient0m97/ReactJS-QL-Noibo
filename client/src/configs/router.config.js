import RoleAction from '@pages/RoleAction';
import HomePage from '@pages/HomePage';
import User from '@pages/User';



const routers = [
    {
        path: '/',
        component: HomePage,
        name: 'Home'
    },
    {
        path: '/quan-ly-quyen',
        component: RoleAction,
        name: 'quản lý quyền'
    },
    {
        path: '/user',
        component: User,
        name: 'user'
    },
]

export default routers