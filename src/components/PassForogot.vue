<template>
    <div class="box">
        <div class="login">
                <label for="email">Введите свой email</label> <br>
                <input v-model="Email" placeholder="Email" name="email" type="text"> <br>
                <button type="submit" @click="handleSubmit">
                    Register
                </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
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
                    url: 'https://dev.studo.rtuitlab.ru/api/user/password/reset',
                    data: {
                        email: this.Email
                    }
                })
                    .then(({ data }) => {
                        console.log(data)
                    })
            }
        }
    }
</script>

<style scoped>
    .login
    {
        padding: 10px;
        margin-top: 100px;
        margin-bottom: 200px;
    }
    .login form
    {
        margin: 0
    }
    .login form input{
        width: 100%;
        height: 30px;
        margin-bottom: 10px;
        border-radius: 5px;
    }
    .login svg {
        margin-bottom: 25px;
        margin-left: 5%;
    }
    .box
    {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: beige;
    }
    .go
    {
        background-color: coral;
        color: white;
    }
    .go:hover
    {
        box-shadow: darkred 3px 3px 0px 0px;
    }
    .erg:last-child
    {
        float: right;
    }
    a:active
    {
        color: darkred;
    }
    a:hover
    {
        color: crimson;
    }
    a
    {
        color: darkred;
    }
    label
    {
        font-size: 20px;
        font-weight: bolder;
        color: darkgoldenrod;
    }
</style>