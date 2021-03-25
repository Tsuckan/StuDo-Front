
<template>
    <div class="main">
        <transition name="popup">
            <popup v-if="passwordChanging" class="inFront" :viewName="'passReset'" @close="closePopup" />
        </transition>
        <div class="blur_test">
            <div class="menu">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" for="menu_toggle">
                    <span></span>   
                </label>
                <div class="btnsMenu">
                    <div class="menuBarBut">
                        <router-link to="/Create">Создать объявление</router-link>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('all')">
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Все объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('my')">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('favorite')">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Закладки</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col-4 firstCol">
                        <div class="fixedCol">
                            <div class="menuBar">
                                <div class="btnsMenu">
                                    <div class="menuBarBut">
                                        <router-link to="/Create">Создать объявление</router-link>
                                    </div>
                                    <div class="btnMenuItems d-flex" @click="to('all')">
                                        <div class="btnActiv"></div>
                                        <div class="pointers">
                                            <div style="position: relative; color: white; opacity: 0.8;">Все объявления</div>
                                        </div>
                                    </div>
                                    <div class="btnMenuItems d-flex" @click="to('my')">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                            <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                                        </div>
                                    </div>
                                    <div class="btnMenuItems d-flex" @click="to('favorite')">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                            <div style="position: relative; color: white; opacity: 0.8;">Закладки</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 mainArea">
                        <div class="postBlocks">

                        </div>
                    </div>
                    <div class="col-4 thirdCol">
                        <div class="fixedCol">
                            <div class="topMenu d-flex">
                                <div class="topMenuItems active">
                                    <router-link to="/ads">Объявления</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link to="/resumes">Резюме</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link to="/Profile">Профиль</router-link>
                                </div>
                            </div>

                            <div class="rightBlock">
                                <div class="rightBlock_block">
                                    <div class="searchform d-flex">
                                        <input type="text" class="searchInput">
                                        <div class="searchLogo">
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
        </div>
        <div class="blur_layer"></div>
        
        <div v-if="error" class="popupBlock">
            <div class="popupHeader">Произошла ошибка</div>
            <div class="popupFooter">
                <label style="color: var(--popupHeader-color)">{{error}}</label>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import popup from './Popups/Popup';
    export default {
        components: {
            popup: popup
        },
        data(){
            return {
                error: '',
                passwordChanging: false
            }
        },
        methods: {
            closePopup() {
                this.passwordChanging = false;
                this.error = 'Не удалось сменить пароль';
            }
        },
        mounted() {
            if (!this.$route.query) {
                this.$router.push('/ads');
            } else if (this.$route.query.userId === '' || this.$route.query.token === '') {
                this.$router.push('/ads');
            }

            if (this.$route.query.password) {
                this.passwordChanging = true;
            } else if (this.$route.query.NewEmail) {
                axios.post('account/manage/confirmEmail', {
                    userId: this.$route.query.userId,
                    token: this.$route.query.token,
                    newEmail: this.$route.query.NewEmail
                })
                .then((r) => {
                    if (!r) {
                        this.error = 'Не удалось изменить почту.';
                        console.log(this.error);
                    } else {
                        this.$router.push('/ads');
                    }
                })
                .catch(() => this.error = 'Не удалось восстановить пароль.');
            } else {
                axios.post('account/manage/confirmEmail', {
                    userId: this.$route.query.userId,
                    token: this.$route.query.token
                })
                .then((r) => {
                    if (!r) {
                        this.error = 'Не удалось подтвердить почту.';
                        console.log(this.error);
                    } else {
                        this.$router.push('/ads');
                    }
                })
                .catch(() => this.error = 'Не удалось подтвердить почту.');
            }
        }
            
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
