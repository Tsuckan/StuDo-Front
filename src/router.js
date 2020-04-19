
import VueRouter from "vue-router";
import HelloWorld from './components/HelloWorld'
import PassForogot from "./components/PassForogot";
import Register from "./components/Register";
import Logged from "./components/Logged";
import OneElem from "./components/OneElem";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Resumes from "./components/Resumes";
import ResumeCreate from "./components/ResumeCreate";
import MyLogged from "./components/MyLogged";
import MyResume from "./components/MyResume";
import Resume from "./components/Resume";
import EmailAccept from "./components/EmailAccept";
import PassReset from "./components/PassReset";
import PassChange from "./components/PassChange";
import EmailChange from "./components/EmailChange";
import EmailTest from "./components/EmailTest";
import Favorited from "./components/Favorited";
import Comment from "./components/Comment";
import nf from "./components/nf";
export default new VueRouter({
    routes: [
        {
            path: '/Login',
            component: HelloWorld,
            name: 'Login',
            props: true
        },
        {
            path: '/Test',
            component: EmailTest,
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
            path: '/Favorited',
            component: Favorited,
        },
        {
            path: '/MyLogged',
            component: MyLogged,
        },
        {
            path: '/PassReset',
            component: PassReset,
        },
        {
            path: "*",
            component: nf,
        },
        {
            path: '/Acceptation',
            component: EmailAccept,
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
            path: '/Passchange',
            component: PassChange,
        },
        {
            path: '/Emailchange',
            component: EmailChange,
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
            path: '/Comment',
            component: Comment,
            name: 'Comment',
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
            name: 'MyResume',
            props: true
        },
        {
            path: '/ResumeCreate',
            component: ResumeCreate,
        },
        {
            path: '/Acceptation',
            component: EmailAccept,
        }

    ],

})