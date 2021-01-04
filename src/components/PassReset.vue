
<template>
    <div class="main">
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
                            <div style="position: relative; color: white; opacity: 0.8;">Все объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Закладки</div>
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
                                            <div style="position: relative; color: white; opacity: 0.8;">Все объявления</div>
                                        </div>
                                    </div>
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                            <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                                        </div>
                                    </div>
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                            <div style="position: relative; color: white; opacity: 0.8;">Закладки</div>
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
                                    <router-link  to="/ads">Объявления</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link  to="/resumes">Резюме</router-link>
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
                <label for="Password">Пароль</label>
                <input placeholder="" required id="Password" v-model="Password" name="Password" type="password">
                <label for="PasswordAgain">Ещё раз Пароль</label>
                <input placeholder="" required id="PasswordAgain" v-model="PasswordAgain" name="PasswordAgain" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <router-link class="doubleLink" to="/Login">Войти</router-link>
                    <router-link class="doubleLink" to="/Register">Зарегистрироваться</router-link>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    function $_GET(kavo,key) {
        var s = decodeURIComponent(kavo);
        s = s.match(new RegExp(key + '=([^&=]+)'));
        // eslint-disable-next-line no-console
        return s ? s[1] : false;
    }
    function $_GETT(kavo,key) {
        var s = decodeURIComponent(kavo);
        s = s.match(new RegExp(key + '=([^]+)'));
        // eslint-disable-next-line no-console
        return s ? s[1] : false;
    }


    import router from "@/router";
    import axios from 'axios';
    export default {
        name: 'HelloWorld',
        data(){
            return {
                Email : "",
                Password : ""
            }
        },
        mounted()
        {
            // eslint-disable-next-line no-console
            console.log("Pass Reset")
        },
        methods : {
            handleSubmit(e){
                var kav=$_GETT(this.$route.fullPath,"token");
                var rdy=kav.split(' ').join('+');
                e.preventDefault()
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API + 'account/manage/resetPassword',
                    data: {
                        "userId": $_GET(this.$route.fullPath,"userId"),
                        "token":rdy,
                        "newPassword": this.Password,
                        "newPasswordConfirm": this.PasswordAgain
                    }
                })
                    .then(({ data }) => {
                        router.push({ path: '/Login', query: { InCorrect: true } })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
