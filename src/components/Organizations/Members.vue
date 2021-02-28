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
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Участники</div>
                        </div>
                    </div>
                    <div v-if="rights.find((R) => R.rightName === 'CanEditMembers')" class="btnMenuItems d-flex" @click="to('new')">
                        <div class="btnPassiv"></div>
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
                                    <div class="btnActiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Участники</div>
                                    </div>
                                </div>
                                <div v-if="rights.find((R) => R.rightName === 'CanEditMembers')" class="btnMenuItems d-flex" @click="to('new')">
                                    <div class="btnPassiv"></div>
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
                                <div v-if="rights.find((R) => R.rightName === 'CanEditRights')" class="submenu">
                                    <li>Изменить права</li>
                                    <ul>
                                        <li v-for="item in rightsDict" :key="item">
                                            <input type="checkbox" :checked="!!user.organizationRights.find((R) => rightsDict[R.rightName] === item)" :id="item" @change="(e) => changeRight(e, item, user.user)" />
                                            <label :for="item">{{item}}</label>
                                        </li>
                                        <li class="delete" @click="leave(user)">Исключить из организации</li>
                                    </ul>
                                </div>
                                <div v-else class="members">
                                    {{user.organizationRights.length === 1 ? 'Участник' : 'Администратор'}}
                                </div>
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
                organization: {},
                rightsDict: {
                    CanEditMembers: 'Изменение пользователей',
                    CanEditRights: 'Изменение прав',
                    CanEditAd: 'Изменение объявлений',
                }
            };
        },
        methods : {
            async to(modeName) {
                let url = `organization/members/${this.orgId}`;

                if (modeName === 'ads') {
                    this.$router.push(`/organization/${this.orgId}/ads`);
                }

                if (modeName === 'new') {
                    this.$router.push(`/organization/${this.orgId}/applications`);
                }

                this.organization = (await axios.get(`organization/${this.orgId}`)).data;

                axios({
                    method: 'get',
                    url: url,
                    data: {}
                }).then(data => {
                    console.log('SUCCESS');
                    console.log(data);
                    this.users = data.data;
                    this.rights = this.users.find((M) => M.user.id === this.$cookies.get("USER").id).organizationRights;
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
            detach(user, right) {
                return axios.post('organization/right/detach', {
                    organizationId: this.orgId,
                    userId: user.id,
                    right: right
                });
            },
            getRightName(value) {
                for (let R in this.rightsDict) {
                    if (value === this.rightsDict[R])
                        return R;
                }
            },
            async changeRight(e, right, user) {
                const rightName = this.getRightName(right);
                
                if (e.target.checked) {
                    try {
                        let res = (await this.accept(user, rightName)).data;
                        console(res);
                    } catch(e) {
                        e.target.checked = false;
                    }
                } else {
                    try {
                        let res = (await this.detach(user, rightName)).data;
                        console(res);
                    } catch(e) {
                        e.target.checked = true;
                    }
                }
            },
            leave(user) {
                for (let R of user.organizationRights) {
                    console.log(R)
                    this.detach(user.user, R.rightName);
                }

                this.users = this.users.filter((U) => U.user.id !== user.user.id);
            },
            accept(user, right) {
                return axios.post('organization/right/attach', {
                    organizationId: this.orgId,
                    userId: user.id,
                    right: right
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
            this.to('members');
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
    display: block;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 10px;
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

.members {
    display: block;
    height: 25px;
    width: max-content;
    color: var(--postdate-color);
    border-radius: 13px;
    background: var(--postDownBlock-background);
    margin: 0 10px 0 auto;
    font-size: 14px;
    text-align: center;
    padding: 1px 10px;
}

.submenu {
    position: relative;
    display: inline-block;
    width: 100%;
}

.submenu > li {
    display: block;
    width: 100%;
    padding: 5px 15px;
    border-radius: 5px;
    background: var(--postDownBlock-background);
    color: var(--postdate-color);
    cursor: pointer;
}

.submenu > ul {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 0;
    z-index: 1;
}

.submenu > ul > li {
    display: block;
    width: 100%;
    padding: 5px 15px;
    cursor: pointer;
    background: var(--postDownBlock-background);
    color: var(--postdate-color);
}

.submenu > ul > li > label {
    cursor: pointer;
}

input[type=checkbox] {
    display: none;
}

input[type=checkbox]:checked + label {
    color: var(--menuBarBut-bottom-color);
}

.delete {
    color: #DE6161 !important;
}

.submenu > ul > li:hover {
    background: var(--postBlock-background);
}

.submenu:hover ul {
    display: block;
}
</style>