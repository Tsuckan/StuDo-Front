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

        <div class="blur_test"><div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="menuBar">
                        <div class="btnsMenu">
                            <router-link style="position: relative" class="menuBarBut" to="/Create">Создать объявление</router-link>
                            <br>
                            <router-link style="position: relative" class="menuBarBut" to="/ResumeCreate">Создать Резюме</router-link>
                            <div class="btnMenuItems d-flex">
                                <div class="btnActiv"></div>
                                <router-link style="position: relative" to="/Logged">Все объявления</router-link>
                            </div>
                            <div class="btnMenuItems d-flex">
                                <div class="btnPassiv"></div>
                                <router-link style="position: relative"  to="/MyLogged">Мои объявления</router-link>
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
                    <div class="postBlocks">

                    </div>
                </div>
                <div class="col-lg-4">
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
                        <div class="rightBlock_firstBlock">
                            <div class="searchform d-flex">
                                <input type="text" class="searchInput">
                                <div class="rightBlock_firstBlock_searchLogo">
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
        <div class="Auth">
            <div>
                <h1>Регистрация</h1>
                <label for="Email">Email</label><br>
                <input placeholder="" id="Email" v-model="Email" name="Email" type="text"> <br>
                <label for="Password">Пароль</label><br>
                <input placeholder="" id="Password" v-model="Password" name="password" type="password"> <br>
                <label for="passwordConfirm">Повтор Пароля</label><br>
                <input placeholder="" id="passwordConfirm" v-model="passwordConfirm" name="passwordConfirm" type="password"> <br>
                <label for="firstname">Имя</label><br>
                <input placeholder="" id="firstname" v-model="firstname" name="firstname" type="text"> <br>
                <label for="surname">Фамилия</label><br>
                <input placeholder="" id="surname" v-model="surname" name="surname" type="password"> <br>
                <label for="studentCardNumber">Номер Студенческого</label><br>
                <input placeholder="" id="studentCardNumber" v-model="studentCardNumber" name="studentCardNumber" type="password"> <br>
                <div class="buttons">

                    <router-link class="Registerbtn" to="/HelloWorld">Авторизация</router-link>
                    <router-link class="Forgoten" to="/PassForgot">Забыл пароль</router-link>

                    <button class="Login_BTN" @click="handleSubmit">
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Register',
        data(){
            return {
                Email : "",
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                axios({
                    method: 'post',
                    url: 'https://dev.studo.rtuitlab.ru/api/auth/register',
                    data: {
                        "firstname": this.firstname,
                        "surname": this.surname,
                        "email": this.email,
                        "studentCardNumber": this.studentCardNumber,
                        "password": this.password,
                        "passwordConfirm": this.passwordConfirm
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

    .blur_test
    {
        filter: blur(20px);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
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
        height: 750px;
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