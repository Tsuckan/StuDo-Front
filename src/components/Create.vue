
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
                    <div class="col-4 mainArea"></div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="blur_layer"></div>
        <div class="popupBlock">
            <div class="popupHeader">Создание объявления</div>
            <div class="popupBody">
                <label for="name">Название</label>
                <input placeholder="" required id="name" v-model="name" name="name" type="text">
                <label for="description">Описание</label>
                <textarea cols="103" required placeholder="" id="description" v-model="description" name="description" type="text"></textarea>
                <label for="shortDescription">Краткое описание</label>
                <input placeholder="" required id="shortDescription" v-model="shortDescription" name="shortDescription" type="text">
                <label for="beginTime">Начало</label>
                <input placeholder="" required id="beginTime" v-model="beginTime" name="beginTime" type="date">
                <label for="endTime">Конец</label>
                <input placeholder="" required id="endTime" v-model="endTime" name="endTime" type="date">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <router-link to="/Logged">Назад</router-link>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
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
                "name": "",
                "description": "",
                "shortDescription": "",
                "beginTime": "",
                "endTime": "",
                "organizationId": ""
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
                    url: 'https://dev.studo.rtuitlab.ru/api/ad',
                    data: {
                        "name": this.name,
                        "description": this.description,
                        "shortDescription": this.shortDescription,
                        "beginTime": this.beginTime,
                        "endTime": this.endTime,
                        "organizationId": this.organizationId
                    }
                }).then(({ data }) => {this.$notify({
                    group: 'foo',
                    title: 'Успешно',
                    text: 'Объявление создано'
                });
                    router.push('/Logged')
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
