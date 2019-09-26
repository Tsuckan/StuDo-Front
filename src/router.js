import VueRouter from "vue-router";
import HelloWorld from './components/HelloWorld'
import PassForogot from "@/components/PassForogot";
import Register from "./components/Register";
import Logged from "@/components/Logged";

export default new VueRouter({
    routes: [
        {
            path: '',
            component: HelloWorld,
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
        }
    ],
    mode:'history'
})