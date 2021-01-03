
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
                                    <router-link to="/Logged">Объявления</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link to="/Resumes">Резюме</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link to="/Profile">Профиль</router-link>
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
            <div class="popupHeader">Подтверждение почты</div>
            <div class="popupBody">
                <label for="name">Произошла ошибка</label>
            </div>
            <div class="popupFooter">

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
            var kav=$_GETT(this.$route.fullPath,"token");
            var rdy=kav.split(' ').join('+');
            axios({
                method: 'post',
                url: process.env.VUE_APP_API + 'account/manage/confirmEmail',
                data: {
                    "userId": $_GET(this.$route.fullPath,"userId"),
                    "token":rdy
                }
            })
                .then(({ data }) => {
                    if (data)
                    {
                        data=0;
                    }
                        router.push({ name: 'Login', params: { IsNotify: true } })
                }).catch(error => {
                if(error)
                {
                    alert('Error')
                }
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
