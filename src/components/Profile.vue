<template>
    <div class="box">
        <transition name="popup">
            <div v-if="showPopup" class="blur_layer" @click="back" />
        </transition>

        <transition name="popup">
            <popup v-if="showPopup && !isChecked()" class="inFront" :viewName="this.rootMessage" @close="closePopup" />
        </transition>

        <div>
            <div class="menu">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" @click="toggleMenu()">
                    <span></span>
                </label>
                <div class="btnsMenu">
                    <div class="menuBarBut">
                        <a href="javascript: void(0);" @click="createOrganization">Создать организацию</a>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div :class="mode.profile === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;" @click="to('profile')">Мои данные</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;" @click="to('ads')">Мои объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;" @click="to('resumes')">Мои Резюме</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div :class="mode.followed === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;" @click="to('followed')">Подписки</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div :class="mode.my === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;" @click="to('my')">Мои организации</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div :class="mode.all === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;" @click="to('all')">Все организации</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" :class="blur">
                <div class="col-4 firstCol">
                    <div class="fixedCol">
                        <div class="menuBar">
                            <div class="btnsMenu">
                                <div class="menuBarBut">
                                    <a href="javascript: void(0);" @click="createOrganization">Создать организацию</a>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('profile')">
                                    <div :class="mode.profile === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои данные</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('ads')">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('resumes')">
                                    <div class="btnPassiv"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои Резюме</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('followed')">
                                    <div :class="mode.followed === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Подписки</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('my')">
                                    <div :class="mode.my === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои организации</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('all')">
                                    <div :class="mode.all === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Все организации</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 mainArea">
                    <div v-if="mode.profile" class="postBlocks">
                        <div class="postBlock">
                            <div class="postTopBlock">
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost">Данные профиля</div>
                            </div>
                            <div class="postDownBlock profileInfo">
                                <div class="textblockForPost">
                                    <label for="firstname">Имя</label>
                                    <input placeholder="" id="firstname" v-model="firstname" name="firstname" class="profileField" type="text" required>
                                    <label for="surname">Фамилия</label>
                                    <input placeholder="" id="surname" v-model="surname" name="surname" class="profileField" type="text" required>
                                    <label for="studentCardNumber">Номер студенческого</label>
                                    <input placeholder="" id="studentCardNumber" v-model="studentCardNumber" name="studentCardNumber" class="profileField" type="text" required>
                                </div>
                            </div>
                            <div class="changeDataBlock">
                                <div class="halfBlock">
                                    <button class="profile" @click="changepass">
                                        Изменить пароль
                                    </button>
                                </div>
                                <div class="halfBlock">
                                    <button class="profile" @click="changeemail">
                                        Изменить почту
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="halfBlock leftAlign">
                            <button class="transparent" @click="accept">
                                Accept
                            </button>
                        </div>
                        <div class="halfBlock rightAlign">
                            <button class="transparent" @click="exit('login')">
                                Выйти
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="postBlocks" v-for="org in getFilteredOrgs()" :key="org.id">
                            <div class="postBlock">
                                <div class="postTopBlock">
                                    <div class="titleForPost"><router-link :to="`/organization/${org.id}/ads`">{{org.name}}</router-link>
                                    </div>
                                </div>
                                <div class="postDownBlock">
                                    <div class="textblockForPost">
                                        {{org.description}}
                                    </div>
                                    <div class="org-footer">
                                        <div class="members">
                                            {{getMembers(org.members.length)}}
                                        </div>
                                        <div v-if="isMember(org) === 'not-member'" class="act-btn" @click="enter(org)">Подать заявку</div>
                                        <!--<div v-else-if="org.isMember === 'member'" class="deact-btn">Покинуть</div>-->
                                        <div v-else class="deact-btn">Заявка подана</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol">
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
                                <div v-if="mode.profile" class="sortBlock">
                                    Настройки
                                    <div class="sortItems">
                                        <div class="sortItem d-flex">
                                            Изменить тему
                                            <label class="switch">
                                                <input type="checkbox" id="theme_check">
                                                <span class="slider round" @click="changeTheme"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="searchform d-flex">
                                    <input type="text" class="searchInput" placeholder="Название организации" v-model="search">
                                    <div class="searchLogo">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </div>
                                </div>
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
    import popup from './Popups/Popup';
    import axios from "axios";
    export default {
        name: "Prof",
        components: {
            popup: popup
        },
        data() {
            return {
                mode: {
                    organizations: [],
                    profile: true,  // tab Профиль
                    followed: false,// tab Подписки
                    my: false,      // tab Мои организации
                    all: false      // tab Все организации
                },
                firstname: '',
                surname: '',
                studentCardNumber: '',
                rootMessage: '',
                showPopup: false,
                blur: 'blur_test',
                search: ''
            };
        },
        created: function () {
            if (this.$cookies.get("USER")) {
                this.blur = '';
                this.firstname = this.$cookies.get("USER").firstname;
                this.surname = this.$cookies.get("USER").surname;
                this.studentCardNumber = this.$cookies.get("USER").studentCardNumber;
            }
            else {
                this.blur='blur_test';
                this.rootMessage = 'login';
                this.showPopup = true;
            }
        },
        methods: {
            isMember(org) {
                console.log(this.organizations);
                return org.isMember;
            },
            getFilteredOrgs() {
                let organizations = this.organizations;

                if (this.search) {
                    organizations = this.searchOrgs();
                }

                if (this.mode.my)
                    return organizations.filter((O) => O.creatorId === this.$cookies.get("USER").id);
                else if (this.mode.all)
                    return organizations;
                else if (this.mode.followed)
                    return organizations.filter((O) => {
                        return !!O.members.find((M) => M.organizationRights.find((R) => R.rightName === 'Member') && M.user.id === this.$cookies.get("USER").id);
                    });
                return [];
            },
            to(modeName) {
                const url = 'organization';
                this.mode = { all: false, my: false, followed: false, profile: false };

                if (modeName === 'ads') {
                    localStorage.setItem('mode', 'my');
                    router.push({ name: 'Ads' });
                }

                if (modeName === 'resumes') {
                    localStorage.setItem('mode', 'my');
                    router.push({ name: 'Resumes' });
                }
                
                if (modeName === 'profile') {
                    this.mode.profile = true;
                    if (this.$cookies.get("USER")) {
                        this.blur = '';
                        this.firstname = this.$cookies.get("USER").firstname;
                        this.surname = this.$cookies.get("USER").surname;
                        this.studentCardNumber = this.$cookies.get("USER").studentCardNumber;
                    } else {
                        this.blur='blur_test';
                        this.rootMessage = 'login';
                        this.showPopup = true;
                    }
                }
                
                if (modeName === 'my') {
                    this.mode.my = true;
                    localStorage.removeItem('mode');
                }
                
                if (modeName === 'all') {
                    this.mode.all = true;
                    localStorage.removeItem('mode');
                }
                
                if (modeName === 'followed') {
                    this.mode.followed = true;
                    localStorage.removeItem('mode');
                }

                axios({
                    method: 'get',
                    url: url,
                    data: {}
                }).then(async (data) => {
                    this.organizations = data.data;

                    for (let org of this.organizations) {
                        org.members = (await axios.get(`organization/members/${org.id}`)).data;
                        let user = org.members.find((M) => M.user.id === this.$cookies.get("USER").id)

                        if (user) {
                            org.isMember = 'member';
                        } else {
                            let wishes = (await axios.get(`organization/wish/${org.id}`)).data;
                            if (wishes.find((W) => W.user.id === this.$cookies.get("USER").id))
                                org.isMember = 'whisher'
                            else
                                org.isMember = 'not-member';
                        }

                        console.log(org)
                    }
                }).catch(error => {
                    console.log('ERROR');
                    console.log(error);
                    if(error.response.status==401) {
                        this.rootMessage = 'login';
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
            async enter(org) {
                if ((await axios.post(`organization/wish/${org.id}`))) {
                    this.organizations.map((O) => {
                        if (O.id === org.id) {
                            O.isMember = 'wisher';
                        }
                        return O;
                    });
                    this.$forceUpdate();
                }
            },
            searchOrgs() {
                let _orgs = this.organizations.filter((org) => {
                    if (org.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                        return true;
                    return false;
                });

                return _orgs;
            },
            toggleMenu() {
                if (this.showPopup && !document.getElementById('menu_toggle').checked)
                    return;
                
                if (document.getElementById('menu_toggle').checked) {
                    this.blur = '';
                    this.showPopup = false;
                }
                else {
                    this.blur = 'blur_test';
                    this.showPopup = true;
                }
                document.getElementById('menu_toggle').checked = !document.getElementById('menu_toggle').checked;
            },
            getMembers(count) {
                if (count === 1) {
                    return '1 участник';
                } else if (count < 5) {
                    return `${count} участника`;
                } else if (count < 1000) {
                    return `${count} участников`;
                } else if (count < 1000000) {
                    return `${Math.floor(count / 1000)}K участников`
                } else {
                    return `${Math.floor(count / 1000000)}M участников`
                }
            },
            isChecked() {
                return document.getElementById('menu_toggle').checked;
            },
            back() {
                if (document.getElementById('menu_toggle').checked) {
                    this.toggleMenu();
                }
            },
            exit(message) {
                this.blur='blur_test';
                this.rootMessage = message;

                this.firstname = '';
                this.surname = '';
                this.studentCardNumber = '';

                this.showPopup = true;
                this.$cookies.remove("ACCESSTOKEN");
                this.$cookies.remove("USER");
            },
            changeTheme() {
                if (document.documentElement.getAttribute('theme') === 'light') {
                    document.documentElement.removeAttribute('theme');
                    this.$cookies.set("THEME", "DARK");
                }
                else {
                    document.documentElement.setAttribute('theme', 'light');
                    this.$cookies.set("THEME", "LIGHT");
                }
            },
            changepass() {
                this.blur='blur_test';
                this.rootMessage = 'passChange';
                this.showPopup = true;
            },
            changeemail() {
                this.blur='blur_test';
                this.rootMessage = 'emailChange';
                this.showPopup = true;
            },
            accept() {
                if (this.firstname === '') {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Имя незаполнено'
                    });
                }
                else if (this.surname === '') {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Фамилия незаполнено'
                    });
                }
                else if (this.studentCardNumber === '') {
                    this.$notify({
                        group: 'foo',
                        title: 'Ошибка',
                        text: 'Поле Номер студенческого незаполнено'
                    });
                }
                else axios({
                    method: 'post',
                    url: 'user/change/info',
                    data: {
                        id: this.$cookies.get("USER").id,
                        studentCardNumber: this.studentCardNumber,
                        firstname: this.firstname,
                        surname: this.surname
                    }
                }).then(data => {
                    if(data)
                    this.$cookies.set('USER', data.data)
                    this.$notify({
                        group: 'foo',
                        title: 'Успешно',
                        text: 'Данные успешно изменены'
                    });
                    router.go();
                }).catch(error => {
                    if(error) {
                        this.$notify({
                            group: 'foo',
                            title: 'Ошибка',
                            text: 'Произошла ошибка'
                        });
                    }
                }).finally(() => {
                    if (document.getElementById('menu_toggle')) {
                        document.getElementById('menu_toggle').checked = false;
                    }
                });
            },
            createOrganization() {
                this.rootMessage = 'createOrganization';
                this.showPopup = true;
                this.blur = 'blur_test';
            },
            closePopup(e) {
                if (e === 'unauthorized') {
                    this.rootMessage = 'login';
                    this.showPopup = true;
                }
                else {
                    this.showPopup = false;
                    this.blur = '';

                    this.firstname = this.$cookies.get("USER").firstname;
                    this.surname = this.$cookies.get("USER").surname;
                    this.studentCardNumber = this.$cookies.get("USER").studentCardNumber;

                    if (this.rootMessage === 'login')
                        router.go();
                }
            }
        },
        mounted() {
            this.to('profile')
            if (this.$cookies.get("THEME") === "LIGHT") {
                var checkbox = document.getElementById('theme_check');
                checkbox.checked = true;
            }
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
    width: max-content;
    margin: 5px 10px 0 auto;
}

.members {
    display: inline-block;
    height: 25px;
    width: max-content;
    color: var(--postdate-color);
    border-radius: 13px;
    background: var(--postdate-background);
    margin-right: 10px;
    font-size: 14px;
    text-align: center;
    padding: 1px 10px;
}

.act-btn {
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

.deact-btn {
    display: inline-block;
    height: 25px;
    width: max-content;
    color: #000000;
    border-radius: 7px;
    background: #ACACAC;
    font-size: 14px;
    text-align: center;
    padding: 1px 10px;
    cursor: pointer;
}
</style>