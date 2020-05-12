
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Восстановление пароля</div>
            <div class="popupBody">
                <label for="Email">Email</label>
                <input placeholder="" required id="Email" v-model="Email" name="Email" type="text">
                <label for="Password">Пароль</label>
                <input placeholder="" id="Password" required v-model="Password" name="Password" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <a href="javascript: void(0);" @click="$emit('change', 'login')">Авторизация</a>
                    <a href="javascript: void(0);" @click="$emit('change', 'registration')">Регистрация</a>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Восстановить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'PassForget',
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
                    url: process.env.VUE_APP_API + 'user/password/reset',
                    data: {
                        email: this.Email
                    }
                }).then(({ data }) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Ссылка отправлена на почту',
                        text: 'Проверьте почтовый ящик: '+ this.Email
                    });
                    this.$emit('change', 'login');
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

<style scoped>
    
</style>