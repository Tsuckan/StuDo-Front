
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

        <transition name="popup">
            <div v-if="showPopup" class="blur_layer" />
        </transition>

        <transition name="popup">
            <popup v-if="showPopup" class="inFront" :viewName="message" @close="closePopup" />
        </transition>

        <div>
            <div class="menu" :class="blur">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" for="menu_toggle">
                    <span></span>   
                </label>
                <div class="btnsMenu">
                    <div class="menuBarBut">
                        <a href="javascript: void(0);" @click="createResume">Создать резюме</a>
                        </div>
                        <div class="btnMenuItems d-flex">
                            <div class="btnActiv"></div>
                            <div class="pointers">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Resumes">Все Резюме</router-link>
                            </div>
                        </div>
                        <div class="btnMenuItems d-flex">
                            <div class="btnPassiv"></div>
                            <div class="pointers">
                            <router-link style="position: relative; color: white; opacity: 0.8;"  to="/MyResume">Мои Резюме</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" :class="blur">
                <div class="col-4 firstCol">
                    <div class="fixedCol">
                        <div class="menuBar">
                            <div class="btnsMenu">
                                <div class="menuBarBut">
                                    <a href="javascript: void(0);" @click="createResume">Создать резюме</a>
                                </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnActiv"></div>
                                    <div class="pointers">
                                        <router-link style="position: relative; color: white; opacity: 0.8;" to="/Resumes">Все Резюме</router-link>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <router-link style="position: relative; color: white; opacity: 0.8;"  to="/MyResume">Мои Резюме</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clear"></div>
                <div class="col-4 mainArea">
                    <div class="postBlocks" v-for="post in filteredPosts" :key="post.id">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost"><router-link :to="{name: 'Resume', params: {Resumeid: post.id}, props: {Resumeid: post.id}}"
                                >{{post.name}}</router-link>
                                </div>
                            </div>
                            <div class="postDownBlock">
                                <div class="textblockForPost">
                                    {{post.description}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Logged">Объявления</router-link>
                            </div>
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Profile">Профиль</router-link>
                            </div>
                        </div>

                        <div class="rightBlock">
                            <div class="rightBlock_block">
                                <div class="searchform d-flex">
                                    <input type="text" class="searchInput" v-model="query">
                                    <div class="searchLogo" @click="filterPosts(query)">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </div>
                                </div>
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
    import popup from './Popup';
    export default {
        name: "Resumes",
        components: {
            popup: popup
        },
        data() {
            return {
                rawHtml: {},
                posts: [],
                filteredPosts: [],
                showPopup: false,
                message: 'login',
                blur: ''
            };
        },
        methods : {
            createResume() {
                this.message = 'createResume';
                this.showPopup = true;
                this.blur = 'blur_test';
            },
            closePopup(e) {
                if (e === 'unauthorized') {
                    this.message = 'login';
                    this.showPopup = true;
                }
                else {
                    this.showPopup = false;
                    this.blur = '';

                    if (this.message === 'login')
                        router.go();
                }
            },
            filterPosts(query) {
                this.filteredPosts = this.posts.filter(function(post) {
                    if (post.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
                        return true;
                    if (post.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
                        return true;
                    return false;
                });
            }
        },
        mounted() {
            axios({
                headers: {
                    'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                },
                method: 'get',
                url: process.env.VUE_APP_API + 'resumes',
                data: {}
            })
            .then(data => {
                this.posts = data.data;
                this.filteredPosts = JSON.parse(JSON.stringify(data.data));
            }).catch(error => {
                if(error.response.status==401) {
                    this.message = 'login';
                    this.showPopup = true;
                    this.blur = 'blur_test';
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