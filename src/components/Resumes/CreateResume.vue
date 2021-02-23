
<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Создание Резюме</div>
            <div class="popupBody">
                <label for="name">Название</label>
                <input placeholder="" required id="name" v-model="name" name="name" type="text">
                <label for="description">Описание</label>
                <textarea cols="103" required placeholder="" id="description" v-model="description" name="description" type="text" class="customScroll"></textarea>
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <a href="javascript: void(0);" @click="$emit('close')">Назад</a>
                </div>
                <div class="halfBlock rightAlign">
                    <button class="Login_BTN" @click="handleSubmit">
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
        name: 'CreateResume',
        data(){
            return {
                id: '',
                name: '',
                description: '',
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                axios({
                    method: 'post',
                    url: 'resumes',
                    data: {
                        "id": "",
                        "name": this.name,
                        "description": this.description,
                        "userId": this.$cookies.get("USER").id,
                        "user": this.$cookies.get("USER")
                    }}).then(({ data }) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Успешно',
                        text: 'Резюме создано'
                    });
                    router.go();
                    if (data)
                    {
                        data=0;
                    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
