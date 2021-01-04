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
                    <div class="btnMenuItems d-flex" @click="to('resumes')">
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Все Резюме</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('myResumes')">
                        <div class="btnPassiv"></div>
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
                                <div class="btnMenuItems d-flex" @click="to('resumes')">
                                    <div class="btnActiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Все Резюме</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('myResumes')">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои Резюме</div>
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
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/ads">Объявления</router-link>
                            </div>
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/resumes">Резюме</router-link>
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
        name: "ResumeInfo",
        components: {
            popup: popup
        },
        data() {
            return {
                rawHtml: {},
                posts: [],
                ids: this.$route.params.id,
                showPopup: false,
                message: 'login',
                blur: ''
            };
        },
        methods : {
            to(path) {
                if (path === 'resumes') {
                    router.push({ name: 'Resumes' });
                }

                if (path === 'myResumes') {
                    localStorage.setItem('mode', 'my');
                    router.push({ name: 'Resumes' });
                }
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
            }
        },
        mounted() {
            axios({
                headers: {
                    'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                },
                method: 'get',
                url: process.env.VUE_APP_API + 'resumes/' + this.ids,
                data: {}
            })
                .then(data => {
                    this.posts=data;
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