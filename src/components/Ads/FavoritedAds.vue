/* eslint-disable */
<template>
    <div class="box">
        <VuePopupPlugin :config="popupDefaultConfig"/>
        <header>
            <div class="logoBlock d-flex">
                <div class="logo d-flex">
                    <div class="imgLogo">
                        <img src="../../../src/assets/logo.png" height="50px" width="50px"/></div>
                    <div class="nameLogo">
                        StuDo
                    </div>
                </div>
            </div>
        </header>

        <transition name="popup">
            <div v-if="showPopup" class="blur_layer"  @click="back" />
        </transition>

        <transition name="popup">
            <popup v-if="showLogin" class="inFront" :viewName="message" @close="closePopup" />
        </transition>

        <div>
            <div class="menu" :class="blur">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" for="menu_toggle">
                    <span></span>   
                </label>
                <div class="btnsMenu">
                    <div class="menuBarBut">
                        <a href="javascript: void(0);" @click="create">Создать объявление</a>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white; opacity: 0.8;" to="/Logged">Все объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white; opacity: 0.8;"  to="/MyLogged">Мои объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white; opacity: 0.8;"  to="/Favorited">Закладки</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4 firstCol" :class="blur">
                    <div class="fixedCol">
                        <div class="menuBar">
                            <div class="btnsMenu">
                                <div class="menuBarBut">
                                    <a href="javascript: void(0);" @click="create">Создать объявление</a>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                    <router-link style="position: relative; color: white; opacity: 0.8;" to="/Logged">Все объявления</router-link>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                    <router-link style="position: relative; color: white; opacity: 0.8;"  to="/MyLogged">Мои объявления</router-link>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnActiv"></div>
                                    <div class="pointers">
                                    <router-link style="position: relative; color: white; opacity: 0.8;"  to="/Favorited">Закладки</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clear"></div>
                <div class="col-4 mainArea">
                    <div class="postBlocks" v-for="post in posts" :key="post.id">
                        <transition name="popup">
                            <popup v-if="isShowing(post.id)" class="inFront" :viewName="'adInfo'" :id="post.id" @close="closePopup" />
                        </transition>
                        <div :id="post.id" class="postBlock" :class="blur">
                            <div class="postTopBlock">
                                <button class="BookmarkBtn" @click="Bookmark(post.id)">
                                </button>
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost"><a href="javascript: void(0);" @click="showPost(post.id)">{{post.name}}</a>
                                </div>
                            </div>
                            <div class="postDownBlock">
                                <div class="textblockForPost">
                                    {{post.shortDescription}}
                                </div>
                                <div class="postdate">
                                    {{formatDate(new Date(post.beginTime))}} - {{formatDate(new Date(post.endTime))}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol" :class="blur">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Logged">Объявления</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Profile">Профиль</router-link>
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
    import popup from '../Popups/Popup';
    export default {
        name: "Logged",
        components: {
            popup: popup
        },
        props: ['id'],
        data() {
            return {
                rawHtml: {},
                posts: [],
                openedPost: -1,
                showPopup: false,
                showLogin: false,
                message: 'lodin',
                blur: ''
            };
        },
        methods : {
            formatDate(date) {
                var dd = date.getDate();
                if (dd < 10) dd = '0' + dd;
                var mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;
                var yy = date.getFullYear();
                if (yy < 10) yy = '0' + yy;
                return dd + '.' + mm + '.' + yy;
            },
            Bookmark(a) {
                this.$notify({
                    group: 'foo',
                    title: 'Пост удалён из закладок'
                });
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'delete',
                    url: process.env.VUE_APP_API + 'ad/bookmarks/' + a,
                    data: {}
                })
                var leftSection = document.getElementById(a);
                leftSection.parentNode.removeChild(leftSection);
            },
            isShowing(id) {
                if (this.openedPost === -1)
                    return false
                else if (this.posts[this.openedPost].id === id)
                    return true
                else
                    return false;
            },
            back() {
                if (this.openedPost != -1) {
                    this.posts[this.openedPost].show = false;
                    this.openedPost = -1;
                    this.showPopup = false;
                    this.blur = '';
                }
            },
            create() {
                this.message = 'create';
                this.showPopup = true;
                this.showLogin = true;
                this.blur = 'blur_test';
            },
            showPost(id) {
                router.push({query: {id: id}});
                for (var i = 0; i < this.posts.length; i++) {
                    if (this.posts[i].id === id) {
                        this.posts[i].show = true;
                        this.showPopup = true;
                        this.openedPost = i;
                        this.blur = 'blur_test';
                    }
                }
            },
            closePopup(e) {
                if (e === 'unauthorized') {
                    this.posts[this.openedPost].show = false;
                    this.openedPost = -1;

                    this.message = 'login';
                    this.showLogin = true;
                }
                else {
                    this.showPopup = false;
                    this.showLogin = false;
                    this.blur = '';

                    if (this.message === 'login')
                        router.go();
                }
            }
        },
        mounted() {
            axios({
                headers: {
                    'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                },
                method: 'get',
                url: process.env.VUE_APP_API + 'ad/bookmarks',
                data: {}
            }).then(data => {
                this.posts=data.data;
                for (let i = 0; i < this.posts.length; i++) {
                    this.posts[i].show = false;
                }
                if (this.id != '') {
                    for (var i = 0; i < this.posts.length; i++) {
                        if (this.posts[i].id === this.id) {
                            this.posts[i].show = true;
                            this.showPopup = true;
                            this.openedPost = i;
                            this.blur = 'blur_test';
                        }
                    }
                }
            }).catch(error => {
                if(error) {
                    if(error.response.status==401) {
                        this.message = 'login';
                        this.showPopup = true;
                        this.showLogin = true;
                        this.blur = 'blur_test';
                    }
                }
            });
        }}
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