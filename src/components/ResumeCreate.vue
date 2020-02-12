<template>
    <div class="main">

        <div class="blur_test">
        </div>
        <div class="Auth">
            <div>
                <h1>Создание Резюме</h1>
                <label for="name">Название</label><br>
                <input placeholder="" id="name" v-model="name" name="name" type="text"> <br>
                <label for="description">Описание</label><br>
                <textarea cols="103" placeholder="" id="description" v-model="description" name="description" type="text"></textarea> <br>
                <div class="buttons">

                    <router-link class="Registerbtn" to="/Resumes">Назад</router-link>

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
    import store from '@/main';
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
                    url: 'https://dev.studo.rtuitlab.ru/api/resumes',
                    data: {
                        "id": "",
                        "name": this.name,
                        "description": this.description,
                        "userId": this.$cookies.get("USER").id,
                        "user": this.$cookies.get("USER")
                    }})
                router.push('/Resumes')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .blur_test
    {
        filter: blur(20px);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background:no-repeat url("https://cs8.pikabu.ru/post_img/big/2017/12/27/6/1514367381163844367.jpg");
        background-size: 100%;
        margin: 0;
    }
    .Auth
    {
        display: flex;
        justify-content: center; /*Центрирование по горизонтали*/
        align-items: center;
    }
    .blur_test, .Auth
    {

        position: absolute;
        width: 100%;
        height: 100%    ;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }
    .Auth > div h1
    {
        color: rgb(255,254,255);
        padding-left: 30px;
        padding-top: 30px;
        padding-bottom: 10px;
        background-color: rgb(36,35,37);
        border-radius: 15px;
    }
    textarea
    {
        width: 480px;
        background-color: rgb(54,55,54);
        border: none;
        border-radius: 15px;
        height: 35px;
        resize: none;
        margin-left: 30px;
    }
    .Auth > div label
    {
        color: rgb(85,84,85);
        margin-left: 30px;
    }
    .Auth > div label
    {
        margin-top: 30px;
        color: rgb(85,84,85);
        margin-left: 30px;
    }
    .Auth > div input
    {
        width: 480px;
        background-color: rgb(54,55,54);
        border: none;
        border-radius: 15px;
        height: 35px;
        margin-left: 30px;
    }
    .Auth > div
    {
        border-radius: 15px;
        width: 540px;
        height: 400px;
        background-color: rgb(46,45,46);
    }
    .buttons
    {
        height: 93px;
        background-color: rgb(36,35,37);
        margin-top: 26px;
        border-radius: 15px;
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
    .Registerbtn
    {
        display: inline-block;
        margin-left: 30px;
        margin-top: 15px;
        color: white;
    }
    .Forgoten
    {
        position: relative;
        bottom: -40px;
        left: -95px;
        color: white;
    }
</style>
