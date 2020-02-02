import VueRouter from "vue-router";
import HelloWorld from './components/HelloWorld'
import PassForogot from "@/components/PassForogot";
import Register from "./components/Register";
import Logged from "@/components/Logged";
import OneElem from "./components/OneElem";
import Profile from "./components/Profile";

export default new VueRouter({
    routes: [
        {
            path: '/Login',
            component: HelloWorld,
        },
        {
            path: '/Profile',
            component: Profile,
        },
        {
            path: '/Register',
            component: Register,
        },
        {
            path: '/PassForgot',
            component: PassForogot,
        },
        {
            path: '/Logged',
            component: Logged,
        },
        {
            path: '/Ad',
            component: OneElem,
        }
    ],
    mode:'history'
})