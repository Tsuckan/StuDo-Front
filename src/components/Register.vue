<template>

    <div class="main">

        <div class="blur_test">

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
                                Профиль
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
                            <div class="rightBlock_secondBlock">
                                <div class="catBlock">
                                    Категории
                                    <div class="sortItems">
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus sortItemsStatusActiv"></div>Программирование
                                            <div class="countCat">15</div>
                                        </div>
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus"></div>Дизайн
                                            <div class="countCat">12</div>
                                        </div>
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus"></div>Категории
                                            <div class="countCat">22</div>
                                        </div>
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus"></div>Общение
                                            <div class="countCat">33</div>
                                        </div>
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus"></div>Учеба
                                            <div class="countCat">111</div>
                                        </div>
                                        <div class="sortItem d-flex">
                                            <div class="sortItemsStatus"></div>Еще категории
                                            <div class="countCat">132</div>
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
                <label id="labelFirs" for="FirstName">Имя</label><br>
                <input placeholder="" id="FirstName" v-model="FirstName" name="FirstName" type="text">
                <div class="sur">
                <label for="Surname">Фамилия</label><br>
                <input placeholder="" id="Surname" v-model="Surname" name="Surname" type="text"> <br>
                </div>
                <label for="StudentCard">Номер студенческого</label><br>
                <input placeholder="" id="StudentCard" v-model="StudentCard" name="StudentCard" type="text"> <br>
                <label for="Password">Пароль</label><br>
                <input placeholder="" id="Password" v-model="Password" name="Password" type="password"> <br>
                <label for="PasswordConfirm">Повтор пароля</label><br>
                <input placeholder="" id="PasswordConfirm" v-model="PasswordConfirm" name="PasswordConfirm" type="password"> <br>
                <div class="buttons">

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
    import router from "../router";
    export default {
        name: 'Register',
        data(){
            return {
                Email : "",
                Password : "",
                FirstName : "",
                Surname : "",
                StudentCard : "",
                PasswordConfirm: ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                axios({
                    method: 'post',
                    url: 'https://dev.studo.rtuitlab.ru/api/auth/register',
                    data:
                        {
                            "Firstname" : this.FirstName,
                            "Surname" : this.Surname,
                            "Email" : this.Email,
                            "Password" : this.Password,
                            "PasswordConfirm":this.PasswordConfirm,
                            "StudentCardNumber" : this.StudentCard
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            router.push('/Login')
                        }
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
    #FirstName
    {
        display: block;
        width: 240px;
        background-color: rgb(54,55,54);
        border: none;
        border-radius: 15px;
        height: 35px;
        margin-left: 30px;
    }
    #Surname
    {
        display: block;
        width: 240px;
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
        height: 740px;
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
        margin-left: 37%;
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