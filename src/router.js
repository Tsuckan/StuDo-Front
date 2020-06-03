
import VueRouter from "vue-router";
import Logged from "./components/Logged";
import Profile from "./components/Profile";
import Resumes from "./components/Resumes";
import MyLogged from "./components/MyLogged";
import MyResume from "./components/MyResume";
import Resume from "./components/Resume";
import EmailAccept from "./components/EmailAccept";
import PassReset from "./components/PassReset";
import EmailTest from "./components/EmailTest";
import Favorited from "./components/Favorited";
import nf from "./components/nf";
export default new VueRouter({
    routes: [
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
            path: '/Favorited',
            component: Favorited,
            props: (route) => ({ id: route.query.id })
        },
        {
            path: '/MyLogged',
            component: MyLogged,
            props: (route) => ({ id: route.query.id })
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
            path: '/Profile',
            component: Profile,
        },
        {
            path: '/Logged',
            component: Logged,
            name: 'LoggedId',
            props: (route) => ({ id: route.query.id })
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
            path: '/Acceptation',
            component: EmailAccept,
        }

    ],

})