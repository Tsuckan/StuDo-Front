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
                <div class="col-lg-4">
                    <div class="menuBar">
                        <div class="menuBarBut">Создать объявление</div>
                        <div class="btnsMenu">
                            <div class="btnMenuItems d-flex">
                                <div class="btnActiv"></div>
                                <div class="textBtns">Все объявления</div>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <div class="textBtns">Мои объявления</div>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <div class="textBtns">Отслеживаемые</div>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <div class="textBtns">Вкладка 4</div>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <div class="textBtns">Вкладка 5</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="postBlocks" v-html="rawHtml.slice(15)">

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="topMenu d-flex">
                        <div class="topMenuItems active">
                            Объявления
                        </div>
                        <div class="topMenuItems">
                            Резюме
                        </div>
                        <div class="topMenuItems">
                            <button @click="
 handleSubmit">
                                Главная
                            </button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from "@/router";
    import store from '@/main';
    import axios from 'axios';
    export default {
        name: "Logged",
        data() {
            showMobileMenu: false
            return {
                rawHtml: {}
            };
        },methods : {
            handleSubmit() {
                router.push("/Logged")
            }
        },
        mounted() {
            axios({
                headers: {
                    'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                },
                method: 'get',
                url: 'https://dev.studo.rtuitlab.ru/api/ad',
                data: {}
            })
                .then(({data}) => {
                    console.log(data)
                    {
                        for (var i = 0; i < 1; i++)
                        this.rawHtml +=
                            `<div class="postBlock">
                        <div class="postTopBlock">
                        <div class="blockTopForLogo">
                        <i class="fa fa-ambulance" aria-hidden="true"></i>
                        </div>
                        <div class="titleForPost">` +  this.$cookies.get("USER").id  + `</div>
                        </div>
                        <div class="postDownBlock">
                        <div class="textblockForPost">
                        ` + "Имя: " +this.$cookies.get("USER").surname +"   Фамилия: "+this.$cookies.get("USER").firstname +"   Почта: "+this.$cookies.get("USER").email + "  Номер студенческого: "+this.$cookies.get("USER").studentCardNumber +`
                    </div>
                    <div class="postdate">
                        25.12.2012
                    </div>
                    </div>
                    </div>
                    </div>`
                        console.log(this.$store.getters.USER)
                    }
                }).catch(error => {
                router.push("/Login");
            });


        }
    }
</script>

<style scoped>

</style>