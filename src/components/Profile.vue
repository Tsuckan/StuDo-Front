
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
                            <div class="btnsMenu">
                                <div class="btnMenuItems d-flex">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                    <router-link style="position: relative; color: white;"  to="/MyLogged">Мои объявления</router-link>
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
                <div class="col-lg-4">
                    <div class="postBlocks">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost">Данные профиля</div>

                                <button class="ExitBtn" @click="exit">
                                    Exit
                                </button>
                                <button class="AcceptBtn" @click="accept">
                                    Accept
                                </button>
                            </div>
                            <div class="postDownBlock">
                                <div class="textblockForPost">
                                    <label for="firstname">Имя</label><br>
                                    <input placeholder="" id="firstname" v-model="firstname" name="firstname" type="text"> <br>
                                    <label for="surname">Фамилия</label><br>
                                    <input placeholder="" id="surname" v-model="surname" name="surname" type="text"> <br>
                                    <label for="studentCardNumber">Номер студенческого</label><br>
                                    <input placeholder="" id="studentCardNumber" v-model="studentCardNumber" name="studentCardNumber" type="text"> <br>

                                    <button class="ChangePassBtn" @click="changepass">
                                        ChangePass
                                    </button>
                                    <button class="ChangeEmailBtn" @click="changeemail">
                                        ChangeEmail
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="topMenu d-flex">
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
                    url: 'https://studo.rtuitlab.ru/api/user/change/info',
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

    .ExitBtn, .AcceptBtn
    {
        background: transparent;
        color: honeydew;
        border: none;
        margin-top: 370px;
        position: absolute;
        top:80px;
        left:150px;
    }
    .ExitBtn
    {
        margin-left: 160px;
        margin-right: -100px;
        float: right;
    }
    .AcceptBtn
    {
        margin-left: -120px;
    }
    .ChangeEmailBtn
    {
        float: right;
        border-radius: 30px;
        background-color: rgb(102,49,179);
        border: none;
        color: white;
        width: 120px;
        margin-top: 20px;
        height: 46px;
    }
    .ChangePassBtn
    {
        float: left;
        border-radius: 30px;
        background-color: rgb(102,49,179);
        border: none;
        color: white;
        width: 120px;
        margin-top: 20px;
        height: 46px;
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
        height: 400px;
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
        height: 280px;
        margin-left: 25px;
        padding-top: 19px;
        font-size: 16px;
        color: #ACACAC;
    }
    .postBlocks{
        padding-top: 35px;
        padding-bottom: 47px;

    }
    input
    {

        width: 280px;
        background-color: rgb(54,55,54);
        border: none;
        border-radius: 15px;
        height: 35px;
        margin-left: 30px;
    }
</style>