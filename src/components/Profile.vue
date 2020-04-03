
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
                        <router-link style="position: relative; color: white;" class="menuBarBut" to="/Create">Создать объявление</router-link>
                        <router-link style="position: relative; color: white;"  class="menuBarBut" to="/Resumes">Создать Резюме</router-link>

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
                                <button class="ExitBtn" @click="exit">
                                    Exit
                                </button>
                                <button class="AcceptBtn" @click="accept">
                                    Accept
                                </button>
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
                router.push("/Login")
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
                    router.push('/Logged')
                    }).catch(error => {
                    if(error)
                        router.push("/Login");
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
    }
    .ExitBtn
    {
        margin-top:10px;
        float: right;
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
    .qq{
        border: 1px solid black;
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
    .Login_BTN
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
    .Login_BTN:last-child
    {
        float: left;
        margin-left: 130px;
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
        height: 360px;
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