import About from '@pages/About';
import HomePage from '@pages/HomePage';
import User from '@pages/User'
import Unit from '@pages/Unit'



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
       path: '/unit',
       component: Unit,
       name: 'unit' 
    }
]

export default routers