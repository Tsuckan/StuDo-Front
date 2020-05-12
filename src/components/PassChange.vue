
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Смена пароля</div>
            <div class="popupBody">
                <label for="oldPassword">Старый пароль</label>
                <input placeholder="" required id="oldPassword" v-model="oldPassword" name="oldPassword" type="password">
                <label for="newPassword">Новый пароль</label>
                <input placeholder="" required id="newPassword" v-model="newPassword" name="newPassword" type="password">
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
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'post',
                    url: process.env.VUE_APP_API + 'user/password/change',
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
