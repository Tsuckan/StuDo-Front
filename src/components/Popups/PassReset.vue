
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Смена пароля</div>
            <div class="popupBody">
                <label for="oldPassword">Новый пароль</label>
                <input placeholder="Не менее 6 символов"  required id="oldPassword" v-model="oldPassword" name="oldPassword" type="password">
                <label for="newPassword">Подтверждение нового пароля</label>
                <input required id="newPassword" v-model="newPassword" name="newPassword" type="password">
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
    import axios from 'axios';
    export default {
        name: 'PassReset',
        data(){
            return {
                Email : "",
                Password : "",
                oldPassword: '',
                newPassword: ''
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
                        text: 'Поле Новый пароль незаполнено'
                    });
                }
                else if (this.newPassword === '' || this.newPassword === undefined) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Подтверждение нового пароля незаполнено'
                    });
                }
                else if (this.newPassword.length < 6) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Пароль меньше 6 символов'
                    });
                }
                else if (this.newPassword !== this.oldPassword) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Пароли не совпадают'
                    });
                }
                else axios.post('account/manage/resetPassword', {
                    userId: this.$route.query.userId,
                    token: this.$route.query.token,
                    newPassword: this.newPassword,
                    newPasswordConfirm: this.oldPassword
                })
                .then((r) => {
                    if (!r) {
                        this.$emit('close');
                    } else {
                        this.$router.push('/ads');
                    }
                })
                .catch(() => this.$emit('close'));
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
