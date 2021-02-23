
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Смена пароля</div>
            <div class="popupBody">
                <label for="oldPassword">Старый пароль</label>
                <input placeholder="" required id="oldPassword" v-model="oldPassword" name="oldPassword" type="password">
                <label for="newPassword">Новый пароль</label>
                <input placeholder="Не менее 6 символов" required id="newPassword" v-model="newPassword" name="newPassword" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <a href="javascript: void(0);" @click="$emit('close')">Назад</a>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Принять
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
        name: 'PassChange',
        data(){
            return {
                Email : "",
                Password : ""
            }
        },
        mounted()
        {
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.oldPassword === '' || this.oldPassword === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Старый пароль незаполнено'
                    });
                }
                else if (this.newPassword === '' || this.newPassword === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Новый пароль незаполнено'
                    });
                }
                else if (this.newPassword.length < 6) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Пароль меньше 6 символов'
                    });
                }
                else axios({
                    method: 'post',
                    url: 'user/password/change',
                    data: {
                        id: this.$cookies.get("USER").id,
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    }
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(({ data }) => {
                        // eslint-disable-next-line no-console
                        console.log('status: ', data.status);
                        router.go();
                    }).catch(error => {
                    if(error)
                        // eslint-disable-next-line no-console
                        console.log('status: ', error.code);
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
