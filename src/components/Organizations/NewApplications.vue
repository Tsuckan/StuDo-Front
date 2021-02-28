<template>
    <div class="box">
        <transition name="popup">
            <div v-if="showPopup" class="blur_layer" @click="back" />
        </transition>

        <transition name="popup">
            <popup v-if="showLogin" class="inFront" :viewName="message" @close="closePopup" />
        </transition>

        <div>
            <div class="menu">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" @click="toggleMenu()">
                    <span></span> 
                </label>
                <div class="btnsMenu">
                    <div class="btnMenuItems d-flex" @click="to('ads')">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('members')">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Участники</div>
                        </div>
                    </div>
                    <div v-if="rights.find((R) => R.rightName === 'CanEditMembers')" class="btnMenuItems d-flex" @click="to('new')">
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Новые заявки</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4 firstCol" :class="blur">
                    <div class="fixedCol">
                        <div class="menuBar">
                            <div class="btnsMenu">
                                <div class="btnMenuItems d-flex" @click="to('ads')">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Oбъявления</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('members')">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Участники</div>
                                    </div>
                                </div>
                                <div v-if="rights.find((R) => R.rightName === 'CanEditMembers')" class="btnMenuItems d-flex" @click="to('new')">
                                    <div class="btnActiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Новые заявки</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clear"></div>
                <div class="col-4 mainArea">
                    <div class="postBlocks" v-for="user in users" :key="user.user.id">
                        <div class="postBlock" :class="blur">
                            <div class="postTopBlock">
                                <div class="titleForPost">{{`${user.user.surname} ${user.user.firstname}`}}</div>
                            </div>
                            <div class="org-footer">
                                <div class="detach" @click="detach(user.user)">Отклонить</div>
                                <div class="accept" @click="accept(user.user)">Принять заявку</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol" :class="blur">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/ads">Объявления</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Profile">Профиль</router-link>
                            </div>
                        </div>

                        <div class="rightBlock">
                            <div class="rightBlock_block">
                                <div class="titleForPost" style="padding-top: 0">{{organization.name}}</div>
                                <div class="textblockForPost" style="padding: 0; margin: 0">{{organization.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from "@/router";
    import axios from 'axios';
    import popup from '../Popups/Popup';

    export default {
        name: "Ads",
        components: {
            popup: popup
        },
        props: ['adId', 'orgId'],
        data() {
            return {
                users: [],
                showPopup: false,
                showLogin: false,
                message: 'login',
                blur: 'blur_test',
                rights: [],
                organization: {}
            };
        },
        methods : {
            async to(modeName) {
                let url = 'organization/wish/' + this.orgId;

                if (modeName === 'ads') {
                    this.$router.push(`/organization/${this.orgId}/ads`);
                }

                if (modeName === 'members') {
                    this.$router.push(`/organization/${this.orgId}/members`);
                }

                this.organization = (await axios.get(`organization/${this.orgId}`)).data;

                try {
                    this.rights = (await axios.get(`organization/members/${this.orgId}`)).data.find((M) => M.user.id === this.$cookies.get("USER").id).organizationRights
                    if (!this.rights.find((R) => R.rightName === 'CanEditMembers')) {
                        this.$router.push(`/organization/${this.orgId}/ads`);
                    }
                } catch(e) {
                    this.$router.push(`/organization/${this.orgId}/ads`);
                }

                axios({
                    method: 'get',
                    url: url,
                    data: {}
                }).then(data => {
                    console.log('SUCCESS');
                    console.log(data);
                    this.users = data.data;
                    this.blur = '';
                }).catch(error => {
                    console.log('ERROR');
                    console.log(error);
                    if(error.response.status==401) {
                        this.message = 'login';
                        this.showPopup = true;
                        this.showLogin = true;
                        this.blur = 'blur_test';
                    }
                }).finally(() => {
                    if (document.getElementById('menu_toggle')) {
                        document.getElementById('menu_toggle').checked = false;
                    }
                });
            },
            detach(user) {
                axios.post('organization/right/detach', {
                    organizationId: this.orgId,
                    userId: user.id,
                    right: 'Wisher'
                }).then(() => {
                    this.users = this.users.filter((U) => U.user.id !== user.id);
                })
            },
            accept(user) {
                axios.post('organization/right/attach', {
                    organizationId: this.orgId,
                    userId: user.id,
                    right: 'Member'
                }).then(() => {
                    this.users = this.users.filter((U) => U.user.id !== user.id);
                    this.detach(user);
                })
            },
            toggleMenu() {
                if (this.showLogin)
                    return;
                
                if (document.getElementById('menu_toggle').checked && this.openedPost === -1) {
                    this.blur = '';
                    this.showPopup = false;
                }
                else {
                    this.blur = 'blur_test';
                    this.showPopup = true;
                }
                document.getElementById('menu_toggle').checked = !document.getElementById('menu_toggle').checked;
            },
            back() {
                if (document.getElementById('menu_toggle').checked) {
                    this.toggleMenu();
                }
                else {
                    router.push({query: ''});
                    if (this.openedPost != -1) {
                        this.showPopup = false;
                        this.blur = '';
                    }
                }
            },
            create() {
                this.message = 'createAd';
                this.showPopup = true;
                this.showLogin = true;
                this.blur = 'blur_test';
            },
            closePopup(e) {
                if (e === 'unauthorized') {
                    this.message = 'login';
                    this.showLogin = true;
                }
                else {
                    this.showPopup = false;
                    this.showLogin = false;
                    this.blur = '';

                    if (this.message === 'login')
                        router.go();
                }
            }
        },
        mounted() {
            this.to('new');
        }
    }
</script>

<style scoped>
.postTopBlock {
    width: 90%;
    margin: 0 auto;
    display: block;
}

.org-footer {
    display: grid;
    grid-template-columns: 50% 50%;
}

.accept {
    margin: 0 10% 10px auto;
    display: inline-block;
    height: 25px;
    width: max-content;
    color: var(--postdate-color);
    border-radius: 7px;
    background: var(--btnActive-background);
    font-size: 14px;
    text-align: center;
    padding: 1px 10px;
    cursor: pointer;
}

.detach {
    margin: 0 auto 10px 10%;
    color: #DE6161;
    cursor: pointer;
}
</style>