
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
                        </div>
                    </div>
                    <div class="col-4 mainArea">
                        <div class="postBlocks">

                        </div>
                    </div>
                    <div class="col-4 thirdCol">
                        <div class="fixedCol">
                            <div class="topMenu d-flex">
                                <div class="topMenuItems active">
                                    <router-link  to="/Logged">Объявления</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link  to="/Resumes">Резюме</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link  to="/Profile">Профиль</router-link>
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
        <div class="blur_layer"></div>
        <div class="popupBlock">
            <div class="popupHeader">Восстановление пароля</div>
            <div class="popupBody">
                <label for="Email">Email</label>
                <input placeholder="" required id="Email" v-model="Email" name="Email" type="text">
                <label for="Password">Пароль</label>
                <input placeholder="" id="Password" required v-model="Password" name="Password" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <router-link class="doubleLink" to="/Login">Войти</router-link>
                    <router-link class="doubleLink" to="/Register">Зарегистрироваться</router-link>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Восстановить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from "../router";
    export default {
        name: 'PassForgot',
        data(){
            return {
                Email : ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API + 'user/password/reset',
                    data: {
                        email: this.Email
                    }
                }).then(({ data }) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Ссылка отправлена на почту',
                        text: 'Проверьте почтовый ящик: '+ this.Email
                    });
                    router.push("/Login");
                    if (data)
                    {
                        data=0;
                    }
                }).catch(error => {
                    if(error)
                        this.$notify({
                        group: 'foo',
                        title: 'Произошла ошибка',
                        text: 'Проверьте поля заполнения'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    
</style>