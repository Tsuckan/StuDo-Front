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
        <div class="container">
            <div class="row">
                <div class="col-4">
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
                <div id="clear"> </div>
                <div class="col-lg-4">
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
                            <div class="rightBlock_firstBlock">
                                <div class="searchform d-flex">
                                    <input type="text" class="searchInput">
                                    <div class="rightBlock_firstBlock_searchLogo">
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
                    url: 'https://studo.rtuitlab.ru/api/ad/bookmarks/' + a,
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
                    url: 'https://dev.studo.rtuitlab.ru/api/ad',
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
            }}
</script>

<style scoped>
    .CommentblockForPost
    {
        padding-bottom:20px;
        width: 90%;
        height: auto;
        margin-left: 25px;
        padding-top: 19px;
        font-size: 16px;
        color: #ACACAC;
    }
    .CommentAuthorForPost
    {
        float: right;
        margin-right: 10px;
    }
    .BookmarkBtn
    {
        background: transparent;
        border:none;
        float: right;
        padding-bottom: 20px;
        margin-right: 10px;
        background-image: url("../assets/star_check_ON.svg");
        background-repeat: no-repeat;
        margin-top: 10px;
    }
    .rightBlock_firstBlock
    {
        visibility: hidden;
    }
    .BookmarkBtnIs
    {
        background: transparent;
        border:none;
        float: right;
        padding-bottom: 20px;
        margin-right: 10px;
        background-image: url("../assets/star_check_OFF.svg");
        background-repeat: no-repeat;
        margin-top: 10px;
    }
    .BookmarkBtn:hover
    {
        color: blue;
    }
    header{
        height: 50px;
        background: #222222;
        margin: 0 auto;
    }
    body{
        background: #141414;
        font-family: Roboto;


    }
    .logoBlock{
        width: 213px;
        background: #2F2F2F;
        height: 70px;
        border-bottom-left-radius: 13px;
        border-bottom-right-radius: 13px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }
    .imgLogo{

    }
    .nameLogo{
        font-size: 24px;
        color: white;
        margin-top: 10px;
        margin-left: 10px;

    }
    .logo{
        margin: 5px auto;
    }
    .menuBar{
        width: 319px;
        position: fixed;
        margin-left: 20px;

    }
    .btnMenuItems{
        margin-top: 37px;
    }
    .btnMenuItems{
        width: 319px;

        height: 40px;
        border-radius: 8px;
        background: #222222;
        margin-top: 5px;
        color: white;
        font-size: 18px;

        padding-left: 20px;
    }
    .btnsMenu{
        margin-top: 37px;
    }
    .btnActiv{

        width: 6px;
        height: 40px;
        background: #673AB7;
        margin-right: 20px;


    }
    .btnPassiv{
        width: 6px;
        height: 40px;
        background: #2F2F2F;
        margin-right: 20px;


    }
    .topMenu{
        width: 319px;
        height: 46px;
        background: #2F2F2F;
        border-radius: 13px;
        position: fixed;
        top:25px;
        right: 22%;
        display: flex;
        margin-left: 20px;
        justify-content: space-around;
        text-transform: uppercase;
    }
    .topMenuItems{
        color: white;
        font-size: 14px;
        margin-top: 12px;


    }
    .active{
        border-bottom: 2px solid white;
    }
    .postBlock{
        width: 100%;
        margin: 0 auto;
        height: auto;
        margin-top: 50px;
        background: #3B3B3B;
        padding-left: 0px;
        border-radius: 13px;
    }
    .postTopBlock{
        height: 63px;
    }
    .postDownBlock{
        position: relative;
        width: 100%;
        height: auto;
        padding-bottom: 15px;
        background: #2F2F2F;
        border-radius: 0 0 13px 13px;
    }
    .titleForPost{
        color: white;
        font-size: 19px;
        margin: 0 auto;
        padding-top: 15px;
        padding-left: 90px;
    }
    .blockTopForLogo{
        width: 48px;
        height: 53px;
        border-radius: 5px 5px 13px 13px;
        background: #673AB7;
        position: absolute;
        z-index: 1;
        margin-top: -5px;
        margin-left: 25px;
        color: white;
        font-size: 25px;
        text-align: center;
        padding-top: 10px;
    }
    .textblockForPost{
        width: 90%;
        height: auto;
        margin-left: 25px;
        padding-top: 19px;
        font-size: 16px;
        color: #ACACAC;
    }
    .postBlocks{
        padding-top: 35px;
        padding-bottom: 47px;

    }
    .rightBlock_firstBlock{
        padding-top: 15px;
        height: 204px;
        background: #222222;
        border-radius: 13px;


    }
    .rightBlock{
        width: 319px;
        margin-top: 59px;
        position: fixed;

        margin-left: 40px;
    }
    .rightBlock_secondBlock{
        margin-top: 39.2px;
        height: 285px;
        background: #222222;
        border-radius: 13px;
        padding-top: 1px;
    }
    .searchform{
        background: #3B3B3B;
        border-radius: 36px;
        color: white;
        border: 1px solid #3B3B3B;
        width: 279px;
        margin-left: 19px;
        padding-top: 1px;


    }
    .searchInput{
        background: #3B3B3B;
        border-radius: 36px 0 0 36px;
        color: white;
        border: 1px solid #3B3B3B;
        width: 245px;
        margin-right: 5px;
        padding-left: 5px;


    }
    .sortBlock{
        width: 290px;
        height: 100px;

        margin-left: 19px;
        margin-top: 27.4px;
        color: #ACACAC;
        font-size: 16px;
    }
    .catBlock{
        width: 290px;


        margin-left: 19px;
        margin-top: 14px;
        color: #ACACAC;
        font-size: 16px;
    }
    .sortItems{
        color: white;
    }
    .sortItemsStatus {
        margin-top: 6px;
        margin-right: 14px;
        background: #3B3B3B;
        border-radius: 50%;
        height: 10px;
        width: 10px;
    }
    .sortItem{
        margin-top: 15px;

    }
    .sortItemsStatusActiv{

        background:  #673AB7;

    }
    .catBlock .sortItemsStatus{
        border-radius: 0;
    }
    .countCat{
        text-align: right;
        position: absolute;
        right: 22px;
        font-size: 18px;
        color: #ACACAC;
    }
    .postdate
    {
        margin-left: 40%;
    }
</style>