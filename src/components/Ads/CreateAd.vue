
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Создание объявления</div>
            <div class="popupBody">
                <label for="name">Название</label>
                <input placeholder="" required id="name" v-model="name" name="name" type="text">
                <label for="description">Описание</label>
                <textarea cols="103" required placeholder="" id="description" v-model="description" name="description" type="text" class="customScroll"></textarea>
                <label for="shortDescription">Краткое описание</label>
                <input placeholder="" required id="shortDescription" v-model="shortDescription" name="shortDescription" type="text">
                <label for="beginTime">Начало</label>
                <input placeholder="" required id="beginTime" v-model="beginTime" name="beginTime" type="date">
                <label for="endTime">Конец</label>
                <input placeholder="" required id="endTime" v-model="endTime" name="endTime" type="date">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <a href="javascript: void(0);" @click="$emit('close')">Назад</a>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Создать
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
        name: 'CreateAd',
        data(){
            return {
                "name": "",
                "description": "",
                "shortDescription": "",
                "beginTime": "",
                "endTime": "",
                "organizationId": ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                axios({
                    headers: {
                        'Authorization': "bearer " + this.$cookies.get("ACCESSTOKEN")
                    },
                    method: 'post',
                    url: process.env.VUE_APP_API + 'ad',
                    data: {
                        "name": this.name,
                        "description": this.description,
                        "shortDescription": this.shortDescription,
                        "beginTime": this.beginTime,
                        "endTime": this.endTime,
                        "organizationId": this.organizationId
                    }
                }).then(({ data }) => {this.$notify({
                    group: 'foo',
                    title: 'Успешно',
                    text: 'Объявление создано'
                });
                    router.go();
                    if (data) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
