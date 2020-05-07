
<template>
    <div class="main">
        <VuePopupPlugin :config="popupDefaultConfig"/>
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
            <div class="popupHeader">Смена пароля</div>
            <div class="popupBody">
                <label for="oldPassword">Старый пароль</label>
                <input placeholder="" required id="oldPassword" v-model="oldPassword" name="oldPassword" type="password">
                <label for="newPassword">Новый пароль</label>
                <input placeholder="" required id="newPassword" v-model="newPassword" name="newPassword" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <router-link to="/Profile">Назад</router-link>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Принять
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
        name: 'PassChange',
        data(){
            return {
                Email : "",
                Password : ""
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
                    url: process.env.VUE_APP_API + 'user/password/change',
                    data: {
                        id: this.$cookies.get("USER").id,
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    }
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(({ data }) => {
                        // eslint-disable-next-line no-console
                        console.log('status: ', data.status);
                            router.push("/Profile");
                    }).catch(error => {
                    if(error)
                        // eslint-disable-next-line no-console
                        console.log('status: ', error.code);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
