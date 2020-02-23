
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
import MyLogged from "./components/MyLogged";
import MyResume from "./components/MyResume";
import Resume from "./components/Resume";
import passchange from "./components/passchange";
import emailchange from "./components/emailchange";

export default new VueRouter({
    routes: [
        {
            path: '/Login',
            component: HelloWorld,
        },
        {
            path: '/Resumes',
            component: Resumes,
            name: 'ResumeId',
            props: true
        },
        {
            path: '/Create',
            component: Create,
        },
        {
            path: '/MyLogged',
            component: MyLogged,
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
            path: '/passchange',
            component: passchange,
        },
        {
            path: '/emailchange',
            component: emailchange,
        },
        {
            path: '/PassForgot',
            component: PassForogot,
        },
        {
            path: '/Logged',
            component: Logged,
            name: 'LoggedId',
            props: true
        },
        {
            path: '/Ad',
            component: OneElem,
            name: 'Ad',
            props: true
        },
        {
            path: '/Resume',
            component: Resume,
            name: 'Resume',
            props: true
        },
        {
            path: '/MyResume',
            component: MyResume,
            name: 'Resume',
            props: true
        },
        {
            path: '/ResumeCreate',
            component: ResumeCreate,
        }
    ],
    mode:'history'
})