<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Регистрация</div>
            <div class="popupBody">
                <div class="halfBlock">
                    <label for="firstname">Имя</label>
                    <input placeholder="" id="firstname" v-model="firstname" name="firstname" required type="text">
                </div>
                <div class="halfBlock">
                    <label for="surname">Фамилия</label>
                    <input placeholder="" id="surname" v-model="surname" name="surname" required type="text">
                </div>
                <label for="studentCardNumber">Номер студенческого</label>
                <input placeholder="" id="studentCardNumber" v-model="studentCardNumber" required name="studentCardNumber" type="text">
                <label for="Email">Email</label>
                <input placeholder="" id="Email" v-model="Email" name="Email" required type="text">
                <label for="Password">Пароль</label>
                <input placeholder="" id="Password" v-model="Password" name="password" required type="password">
                <label for="passwordConfirm">Повтор Пароля</label>
                <input placeholder="" id="passwordConfirm" v-model="passwordConfirm" required name="passwordConfirm" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <a href="javascript: void(0);" @click="$emit('change', 'login')">Авторизация</a>
                    <a href="javascript: void(0);" @click="$emit('change', 'passForget')">Забыл пароль</a>
                </div>
                <div class="halfBlock rightAlign">
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
        name: 'Reg',
        data(){
            return {
                Email : "",
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.firstname === '' || this.firstname === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Имя незаполнено'
                    });
                }
                else if (this.surname === '' || this.surname === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Фамилия незаполнено'
                    });
                }
                else if (this.studentCardNumber === '' || this.studentCardNumber === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Номер студенческого незаполнено'
                    });
                }
                else if (this.Email === '' || this.Email === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Почта незаполнено'
                    });
                }
                else if (this.Password === '' || this.Password === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Пароль незаполнено'
                    });
                }
                else if (this.passwordConfirm === '' || this.passwordConfirm === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Повтор пароля незаполнено'
                    });
                }
                else if (this.Password.length < 6) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Пароль меньше 6 символов'
                    });
                }
                else if (this.passwordConfirm != this.Password) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Пароли не совпадают'
                    });
                }
                else axios({
                headers: {
                    'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                },
                    method: 'post',
                    url: process.env.VUE_APP_API + 'auth/register',
                    data: {
                        "firstname": this.firstname,
                        "surname": this.surname,
                        "email": this.Email,
                        "studentCardNumber": this.studentCardNumber,
                        "password": this.Password,
                        "passwordConfirm": this.passwordConfirm
                    }
                }).then(({ data }) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Успешно',
                        text: 'Подтвердите вашу почту по ссылке'
                    });
                    if (data)
                    {
                        data=0;
                    }
                    this.$emit('change', 'login');
                }).catch(error => {
                    if(error)
                        this.$notify({
                            group: 'foo',
                            title: 'Ошибка',
                            text: 'Проверьте поля заполнения'
                        });
                });
            }
        }
    }
</script>

<style scoped>

</style>