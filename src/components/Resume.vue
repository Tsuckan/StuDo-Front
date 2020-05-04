/* eslint-disable */
<template>
    <div class="box">
        <header>
            <div class="logoBlock d-flex">
                <div class="logo d-flex">
                    <div class="imgLogo">
                        <img src="../../src/assets/logo.png" height="50px" width="50px"/></div>
                    <div class="nameLogo">
                        StuDo
                    </div>
                </div>
            </div>
        </header>

        <div>
            <div class="menu">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" for="menu_toggle">
                    <span></span>   
                </label>
                <div class="btnsMenu">
                    <div class="menuBarBut">
                        <router-link style="position: relative; color: white;" to="/ResumeCreate">Создать Резюме</router-link>
                        </div>
                        <div class="btnMenuItems d-flex">
                            <div class="btnActiv"></div>
                            <div class="pointers">
                                <router-link style="position: relative; color: white;" to="/Resumes">Все Резюме</router-link>
                            </div>
                        </div>
                        <div class="btnMenuItems d-flex">
                            <div class="btnPassiv"></div>
                            <div class="pointers">
                            <router-link style="position: relative; color: white;"  to="/MyResume">Мои Резюме</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4 firstCol">
                    <div class="fixedCol">
                        <div class="menuBar">
                            <div class="btnsMenu">
                                <div class="menuBarBut">
                                    <router-link style="position: relative; color: white;" to="/ResumeCreate">Создать Резюме</router-link>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnActiv"></div>
                                    <div class="pointers">
                                        <router-link style="position: relative; color: white;" to="/Resumes">Все Резюме</router-link>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                    <router-link style="position: relative; color: white;"  to="/MyResume">Мои Резюме</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 mainArea">
                    <div class="postBlocks">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost">{{posts.data.name}}
                                </div>
                            </div>
                            <div class="postDownBlock">
                                <div class="textblockForPost">
                                {{posts.data.description}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white;" to="/Logged">Объявления</router-link>
                            </div>
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white;" to="/Resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white;" to="/Profile">Профиль</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from "@/router";
    import axios from 'axios';
    export default {
        name: "Ad",
        props: ['Resumeid'],
        data() {
            return {
                rawHtml: {},
                posts: [],
                ids: this.$router.currentRoute.params['Resumeid']
            };
        },methods : {
            handleSubmit(Idval) {
                router.push({ path: '/Ad', query: { Id: Idval } })
            },
            Create() {
                router.push("/Resumes")
            }
        },
        mounted() {
            axios({
                headers: {
                    'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                },
                method: 'get',
                url: 'https://dev.studo.rtuitlab.ru/api/resumes/' + this.ids,
                data: {}
            })
                .then(data => {
                    this.posts=data;
                }).catch(error => {
                if(error.response.status==401)
                {
                    axios({
                        method: 'post',
                        url: 'https://dev.studo.rtuitlab.ru/api/auth/refresh',
                        data: {
                            refreshToken: this.$cookies.get("REFRESHTOKENTOKEN"),
                        }
                    })
                        .then(({ data }) => {
                            if (data.accessToken!=null)
                            {
                                this.$store.commit("SET_USER", data.user);
                                this.$store.commit("SET_ACCESSTOKEN", data.accessToken);
                                this.$cookies.set('ACCESSTOKEN', this.$store.getters.ACCESSTOKEN, '1m');
                                this.$cookies.set('USER', this.$store.getters.USER, '1m');
                                this.$cookies.set('REFRESHTOKENTOKEN', data.refreshToken, '1m');
                                this.$store.getters.USER;
                                window.location.reload();
                            }
                        }).catch(error => {
                        if(error)
                            router.push({ path: '/Login', query: { InCorrect: true } })
                    });
                }
            });


        }
    }
</script>

<style scoped>
    .catBlock{
        width: 290px;
        margin-left: 19px;
        margin-top: 14px;
        color: #ACACAC;
        font-size: 16px;
    }
    .catBlock {
        border-radius: 0;
    }
    .countCat{
        text-align: right;
        position: absolute;
        right: 22px;
        font-size: 18px;
        color: #ACACAC;
    }
</style>