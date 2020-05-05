
<template>
    <div class="main">
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

        <div class="blur_test">
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
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white; opacity: 0.8;"  to="/Favorited">Закладки</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col-4 firstCol">
                        <div class="fixedCol">
                            <div class="menuBar">
                                <div class="btnsMenu">
                                    <div class="menuBarBut">
                                        <router-link style="position: relative; color: white; opacity: 0.8;" to="/ResumeCreate">Создать Резюме</router-link>
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
                        <div class="postBlocks" v-for="post in posts" :key="post.id">
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
                                        <input type="text" class="searchInput">
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
        <div class="blur_layer"></div>
        <div class="popupBlock">
            <div class="popupHeader">Создание Резюме</div>
            <div class="popupBody">
                <label for="name">Название</label>
                <input placeholder="" required id="name" v-model="name" name="name" type="text">
                <label for="description">Описание</label>
                <textarea cols="103" required placeholder="" id="description" v-model="description" name="description" type="text" class="customScroll"></textarea>
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <router-link to="/Resumes">Назад</router-link>
                </div>
                <div class="halfBlock rightAlign">
                    <button class="Login_BTN" @click="handleSubmit">
                        Создать
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import router from "@/router";
    import axios from 'axios';
    export default {
        name: 'HelloWorld',
        data(){
            return {
                "id": "",
                "name": "",
                "description": "",
            }
        },
        mounted()
        {
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'post',
                    url: process.env.VUE_APP_API + 'resumes',
                    data: {
                        "id": "",
                        "name": this.name,
                        "description": this.description,
                        "userId": this.$cookies.get("USER").id,
                        "user": this.$cookies.get("USER")
                    }}).then(({ data }) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Успешно',
                        text: 'Резюме создано'
                    });
                    router.push('/Resumes')
                    if (data)
                    {
                        data=0;
                    }
                }).catch(error => {
                    if(error)
                        this.$notify({
                            group: 'foo',
                            title: 'Ошибка',
                            text: 'Проверьте поля заполнения'
                        });
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
