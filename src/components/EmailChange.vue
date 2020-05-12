
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Смена почты</div>
            <div class="popupBody">
                <label for="oldEmail">Старая почта</label>
                <input placeholder="" required id="oldEmail" v-model="oldEmail" name="oldEmail" type="text">
                <label for="newEmail">Новая почта</label>
                <input placeholder="" required id="newEmail" v-model="newEmail" name="newEmail" type="text">
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
        name: 'EmailChange',
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
                    method: 'post',
                    url: process.env.VUE_APP_API + 'user/change/email',
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    data: {
                        id: this.$cookies.get("USER").id,
                        oldEmail: this.oldEmail,
                        newEmail: this.newEmail
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
