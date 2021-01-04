
/* eslint-disable */
<template>
    <div class="box">
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
                    <div class="btnMenuItems d-flex" @click="to('all')">
                        <div :class="mode.all === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Все Резюме</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('my')">
                        <div :class="mode.my === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Мои Резюме</div>
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
                                <div class="btnMenuItems d-flex" @click="to('all')">
                                    <div :class="mode.all === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Все Резюме</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('my')">
                                    <div :class="mode.my === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои Резюме</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clear"></div>
                <div class="col-4 mainArea">
                    <div class="postBlocks" v-for="post in getFilteredPosts()" :key="post.id">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost"><router-link :to="{name: 'Resume', params: {id: post.id}}"
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
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/ads">Объявления</router-link>
                            </div>
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Profile">Профиль</router-link>
                            </div>
                        </div>

                        <div class="rightBlock">
                            <div class="rightBlock_block">
                                <div class="searchform d-flex">
                                    <input type="text" class="searchInput" v-model="search">
                                    <div class="searchLogo">
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
    import popup from '../Popups/Popup';
    export default {
        name: "Resumes",
        components: {
            popup: popup
        },
        data() {
            return {
                mode: {
                    all: true,
                    my: false
                },
                posts: [],
                search: '',
                showPopup: false,
                message: 'login',
                blur: ''
            };
        },
        methods : {
            getFilteredPosts() {
                let _posts = this.posts;

                if (this.search) {
                    _posts = this.searchPosts();
                }

                return _posts;
            },
            to(modeName) {
                let url;
                this.mode = { all: false, my: false };

                if (modeName === 'all' && localStorage.getItem('mode') !== 'my') {
                    url = process.env.VUE_APP_API + 'resumes';
                    this.mode.all = true;
                }

                if (modeName === 'my' || localStorage.getItem('mode') === 'my') {
                    url = process.env.VUE_APP_API + 'resumes/user/'+this.$cookies.get('USER').id;
                    this.mode.my = true;
                    localStorage.removeItem('mode');
                }

                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'get',
                    url: url,
                    data: {}
                })
                .then(data => {
                    this.posts = data.data;

                    if (document.getElementById('menu_toggle')) {
                        document.getElementById('menu_toggle').checked = false;
                    }
                }).catch(error => {
                    if(error.response.status==401) {
                        this.message = 'login';
                        this.showPopup = true;
                        this.blur = 'blur_test';
                    }
                });
            },
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
            searchPosts() {
                let _posts = this.posts.filter((post) => {
                    if (post.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                        return true;
                    if (post.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                        return true;
                    return false;
                });

                return _posts;
            }
        },
        mounted() {
            this.to('all');
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