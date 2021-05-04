import Login from '../auth/login';
import SignUp from '../auth/signup';

import Message from '../message'

export const routes = [
    // {
    //     pathName: '/signup',
    //     pageName: 'Sign up',
    //     component: SignUp
    // },
    // {
    //     pathName: '/login',
    //     pageName: 'Login',
    //     component: Login
    // }
    {
        pathName:'/message',
        pageName:'message',
        component:Message
    }
]