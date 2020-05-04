
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
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;"  to="/MyLogged">Мои  объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                        <router-link style="position: relative; color: white;"  to="/MyResume">Мои Резюме</router-link>
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
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                        <router-link style="position: relative; color: white;"  to="/MyLogged">Мои  объявления</router-link>
                                    </div>
                                    </div>
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                        <router-link style="position: relative; color: white;"  to="/MyResume">Мои Резюме</router-link>
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
                <div class="col-4 mainArea">
                    <div class="postBlocks">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost">Данные профиля</div>
                            </div>
                            <div class="postDownBlock profileInfo">
                                <div class="textblockForPost">
                                    <label for="firstname">Имя</label>
                                    <input placeholder="" id="firstname" v-model="firstname" name="firstname" class="profileField" type="text">
                                    <label for="surname">Фамилия</label>
                                    <input placeholder="" id="surname" v-model="surname" name="surname" class="profileField" type="text">
                                    <label for="studentCardNumber">Номер студенческого</label>
                                    <input placeholder="" id="studentCardNumber" v-model="studentCardNumber" name="studentCardNumber" class="profileField" type="text">
                                </div>
                            </div>
                            <div class="changeDataBlock">
                                <div class="halfBlock">
                                    <button class="profile" @click="changepass">
                                        Изменить пароль
                                    </button>
                                </div>
                                <div class="halfBlock">
                                    <button class="profile" @click="changeemail">
                                        Изменить почту
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="halfBlock leftAlign">
                            <button class="transparent" @click="accept">
                                Accept
                            </button>
                        </div>
                        <div class="halfBlock rightAlign">
                            <button class="transparent" @click="exit">
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white;" to="/Logged">Объявления</router-link>
                            </div>
                            <div class="topMenuItems ">
                                <router-link style="position: relative; color: white;" to="/Resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white;" to="/Profile">Профиль</router-link>
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
    import axios from "axios";
    export default {
        name: "Logged",
        data() {
            return {
                firstname:this.$cookies.get("USER").firstname,
                surname:this.$cookies.get("USER").surname,
                studentCardNumber:this.$cookies.get("USER").studentCardNumber,
                rawHtml: {}
            };
        }, methods: {
            exit() {
                this.$cookies.remove("ACCESSTOKEN");
                this.$cookies.remove("USER");
                router.push({ path: '/Login', query: { InCorrect: true } })
            },
            changepass() {
                router.push("/passchange")
            },
            changeemail() {
                router.push("/emailchange")
            },
            accept() {
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'post',
                    url: 'https://dev.studo.rtuitlab.ru/api/user/change/info',
                    data: {
                        id: this.$cookies.get("USER").id,
                        studentCardNumber: this.studentCardNumber,
                        firstname: this.firstname,
                        surname: this.surname
                }
                }).then(data => {
                    if(data)
                    this.$cookies.set('USER', data.data)
                    this.$notify({
                        group: 'foo',
                        title: 'Успешно',
                        text: 'Данные успешно изменены'
                    });
                    router.push('/Profile')
                    }).catch(error => {
                        if(error)
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Произошла ошибка'
                    });
                });
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>