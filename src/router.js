
import VueRouter from "vue-router";
import Logged from "./components/Ads/Ads";
import Profile from "./components/Profile";
import Resumes from "./components/Resumes/Resumes";
import MyResume from "./components/Resumes/MyResumes";
import Resume from "./components/Resumes/ResumeInfo";
import EmailAccept from "./components/EmailAccept";
import PassReset from "./components/PassReset";
import EmailTest from "./components/EmailTest";
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