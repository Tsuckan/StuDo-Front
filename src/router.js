import VueRouter from "vue-router";
import HelloWorld from './components/HelloWorld'
import PassForogot from "@/components/PassForogot";
import Register from "./components/Register";
import Logged from "@/components/Logged";
import OneElem from "./components/OneElem";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Resumes from "./components/Resumes";
import ResumeCreate from "./components/ResumeCreate";

export default new VueRouter({
    routes: [
        {
            path: '/Login',
            component: HelloWorld,
        },
        {
            path: '/Resumes',
            component: Resumes,
        },
        {
            path: '/Create',
            component: Create,
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
        },
        {
            path: '/ResumeCreate',
            component: ResumeCreate,
        }
    ],
    mode:'history'
})