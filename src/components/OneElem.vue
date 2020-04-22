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
        <div v-on:click="back()" class="blur_test">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="menuBar">
                        <div class="btnsMenu">
                            <router-link style="position: relative; color: white;" class="menuBarBut" to="/Create">Создать объявление</router-link>
                            <div class="btnMenuItems d-flex">
                                <div class="btnActiv"></div>
                                <router-link style="position: relative; color: white;" to="/Logged">Все объявления</router-link>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <router-link style="position: relative; color: white;"  to="/MyLogged">Мои объявления</router-link>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <router-link style="position: relative; color: white;"  to="/Favorited">Закладки</router-link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div class="col-lg-4">
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


            </div>
        </div>
        </div>

        <div style="margin: auto;" class="aaa col-lg-4">
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
                            {{posts.data.shortDescription}}
                        </div>
                        <div class="postdate postdate_post">
                            {{formatDate(new Date(posts.data.beginTime))}} - {{formatDate(new Date(posts.data.endTime))}}
                        </div>
                    </div>
                </div>
                <div><router-link :to="{name: 'Comment', params: {id: posts.data.id}, props: {id: posts.data.id}}"
                >Оставить комментарий</router-link></div>
            </div>
            <div class="postBlocks"  v-for="post in posts.data.comments" :key="post.id">
                <div v-if="posts.data.comments.length!=0" :id='post.id' class="postBlock">
                    <div  class="postTopBlock">
                        <button v-if="checker(post.authorId)"  class="BookmarkBtn" @click="Bookmark(post.id)">
                        </button>
                        <div class="blockTopForLogo">
                            <i class="fa fa-ambulance" aria-hidden="true"></i>
                        </div>
                        <div class="titleForPost">{{post.author}}
                        </div>
                    </div>
                    <div class="postDownBlock">
                        <div class="textblockForPost">
                            {{post.text}}
                        </div>
                        <div class="postdate">
                            {{formatDate(new Date(post.commentTime))}}
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
        props: ['id'],
        data() {
            return {
                rawHtml: {},
                posts: [],
                postid: this.$router.currentRoute.params['id']
            };
        },methods : {
            back()
            {
              router.push('/Logged')
            },
            checker(comid)
            {
                return comid===this.$cookies.get("USER").id
            },
            Bookmark(a) {
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'delete',
                    url: 'https://studo.rtuitlab.ru/api/ad/comment/' + this.postid + '/' + a,
                    data: {}
                }).then(data => {
                    if(data)
                        document.getElementById(a).remove();
                    this.$popup('append', 'Комментарий удалён');
                })
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
                url: 'https://studo.rtuitlab.ru/api/ad/' + this.postid,
                data: {}
            })
                .then(data => {
                    this.posts=data;
                    // eslint-disable-next-line no-console
                    console.log(this.posts)
                    // eslint-disable-next-line no-console
                    console.log(this.posts.data.comments.length)
                }).catch(error => {
                if(error.response.status==401)
                {
                    axios({
                        method: 'post',
                        url: 'https://studo.rtuitlab.ru/api/auth/refresh',
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
    .qq{
        border: 1px solid black;
    }

    .blur_test
    {
        filter: blur(20px);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-size: 100%;
        margin: 0;
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
    .menuBarBut{
        width: 319px;

        height: 51px;
        border-radius: 13px;
        border-bottom: 3px solid #673AB7;
        background: #2F2F2F;
        margin-top: 37px;
        color: white;
        font-size: 18px;
        text-align: center;
        padding-top: 10px;


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
    .textBtns{
        padding-top: 7px;
    }
    .topMenu{
        width: 319px;
        height: 46px;
        background: #2F2F2F;
        border-radius: 13px;
        position: fixed;
        top:25px;
        display: flex;
        margin-left: 40px;
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
    .postdate{
        height: 25px;
        width: 90px;
        color: white;
        border-radius: 13px;
        background: #3B3B3B;
        margin-left: 270px;
        font-size: 14px;
        text-align: center;
        padding-top: 3px;
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
    .postdate
    {
        margin-left: 40%;
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
    .postdate_post
    {
        width: 200px;
    }
    .topMenu, .menuBar
    {
        pointer-events: none;

    }
</style>