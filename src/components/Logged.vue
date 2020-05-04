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
                        <router-link to="/Create">Создать объявление</router-link>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;" to="/Logged">Все объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;"  to="/MyLogged">Мои объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;"  to="/Favorited">Закладки</router-link>
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
                                    <router-link to="/Create">Создать объявление</router-link>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnActiv"></div>
                                    <div class="pointers">
                                        <router-link style="position: relative; color: white;" to="/Logged">Все объявления</router-link>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <router-link style="position: relative; color: white;"  to="/MyLogged">Мои объявления</router-link>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <router-link style="position: relative; color: white;"  to="/Favorited">Закладки</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clear"></div>
                <div class="col-4 mainArea">
                    <div class="postBlocks" v-for="post in posts" :key="post.id">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <button :id="post.id" v-if="post.isFavorite" class="BookmarkBtn" @click="Bookmark(post.id)">
                                </button>
                                <button :id="post.id" v-if="!post.isFavorite" class="BookmarkBtnIs" @click="Bookmark(post.id)">
                                </button>
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost"><router-link :to="{name: 'Ad', params: {id: post.id}, props: {id: post.id}}"
                                >{{post.name}}</router-link>
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
                            <div style="color: honeydew" v-if="getter(post.lastComment,false)" class="CommentAuthorForPost">
                                Автор: {{getter(post.lastComment,false)}}
                            </div>
                            <div  v-if="getter(post.lastComment,false)" class="CommentblockForPost">
                                {{getter(post.lastComment,true)}}...
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white;" to="/Logged">Объявления</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white;" to="/Resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white;" to="/Profile">Профиль</router-link>
                            </div>
                        </div>
        
                        <div class="rightBlock">
                            <div class="rightBlock_block">
                                <div class="searchform d-flex">
                                    <input type="text" class="searchInput">
                                    <div class="searchLogo">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="sortBlock">
                                    Сортировка
                                    <div class="sortItems">
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus sortItemsStatusActiv"></div>По дате создания
                                        </div>
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus"></div>Категории
                                        </div>
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
    // eslint-disable-next-line no-unused-vars
    import CiaoVuePopup from 'ciao-vue-popup'
    export default {
        name: "Logged",
        data() {
            return {
                rawHtml: {},
                posts: [],
                comments: []
            };
        },methods : {
            getter(data, isText)
            {
                try {
                    if(isText)
                    {
                        return data.text
                    }
                    else
                    {
                        return data.author
                    }
                } catch (err) {

                    return false;

                }
            },
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
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'post',
                    url: process.env.VUE_APP_API + 'ad/bookmarks/' + a,
                    data: {}
                }).then(data => {
                    if(data)
                    var leftSection = document.getElementById(a);
                    leftSection.parentNode.removeChild(leftSection);
                    this.$notify({
                        group: 'foo',
                        title: 'Пост добавлен в закладки'
                    });
                    }).catch(error => {
                    if(error)
                        this.$notify({
                        group: 'foo',
                        title: 'Пост уже был добавлен в закладки'
                    });
                });
            },
            handleSubmit(Idval) {
                router.push({path: '/Ad', query: {Id: Idval}})
            },
            Create() {
                router.push("/Resumes")
            },
        },
            mounted() {
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'get',
                    url: process.env.VUE_APP_API + 'ad',
                    data: {}
                }).then(data => {
                        this.posts=data.data;
                        for (let i = 0; i < this.posts.length; i++)
                        {
                            this.comments.push(this.posts[i].lastComment)
                        }
                    }).catch(error => {
                    // eslint-disable-next-line no-console
                    if(error.response.status==401)
                    {
                        axios({
                            method: 'post',
                            url: process.env.VUE_APP_API + 'auth/refresh',
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