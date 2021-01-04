
import VueRouter from "vue-router";
import Ads from "./components/Ads/Ads";
import Profile from "./components/Profile";
import Resumes from "./components/Resumes/Resumes";
import Resume from "./components/Resumes/ResumeInfo";
import EmailAccept from "./components/EmailAccept";
import PassReset from "./components/PassReset";
import nf from "./components/nf";

export default new VueRouter({
    routes: [
        {
            path: '/resumes',
            component: Resumes,
            name: 'Resumes',
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
            path: '/ads',
            component: Ads,
            name: 'Ads',
            props: (route) => ({ id: route.query.id })
        },
        {
            path: '/resume/:id',
            component: Resume,
            name: 'Resume',
            props: true
        },
        {
            path: '/Acceptation',
            component: EmailAccept,
        }
    ],
})