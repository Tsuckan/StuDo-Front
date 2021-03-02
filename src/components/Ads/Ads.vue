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
                    <div class="menuBarBut">
                        <a href="javascript: void(0);" @click="create">Создать объявление</a>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('all')">
                        <div :class="mode.all === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Все объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('my')">
                        <div :class="mode.my === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex" @click="to('favorite')">
                        <div :class="mode.favorite === true ? 'btnActiv' : 'btnPassiv'"></div>
                        <div class="pointers">
                            <div style="position: relative; color: white; opacity: 0.8;">Закладки</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4 firstCol" :class="blur">
                    <div class="fixedCol">
                        <div class="menuBar">
                            <div class="btnsMenu">
                                <div class="menuBarBut">
                                    <a href="javascript: void(0);" @click="create">Создать объявление</a>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('all')">
                                    <div :class="mode.all === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Все объявления</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('my')">
                                    <div :class="mode.my === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Мои объявления</div>
                                    </div>
                                </div>
                                <div class="btnMenuItems d-flex" @click="to('favorite')">
                                    <div :class="mode.favorite === true ? 'btnActiv' : 'btnPassiv'"></div>
                                    <div class="pointers">
                                        <div style="position: relative; color: white; opacity: 0.8;">Закладки</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clear"></div>
                <div class="col-4 mainArea">
                    <div class="postBlocks" v-for="post in getFilteredPosts()" :key="post.id">
                        <transition name="popup">
                            <popup v-if="isShowing(post.id)" class="inFront" :viewName="'adInfo'" :id="post.id" @close="closePopup" />
                        </transition>
                        <div class="postBlock" :class="blur">
                            <div class="postTopBlock">
                                <button :id="post.id" v-if="isFavorite(post)" class="BookmarkBtn" @click="Bookmark(post.id)">
                                </button>
                                <button :id="post.id" v-if="!isFavorite(post)" class="BookmarkBtnIs" @click="Bookmark(post.id)">
                                </button>
                                <div class="blockTopForLogo">
                                    <i class="fa fa-ambulance" aria-hidden="true"></i>
                                </div>
                                <div class="titleForPost"><a href="javascript: void(0);" @click="showPost(post.id)">{{post.name}}</a>
                                </div>
                            </div>
                            <div class="postDownBlock">
                                <div class="textblockForPost">
                                    {{post.shortDescription}}
                                </div>
                                <div class="postdate">
                                    {{formatDate(new Date(post.beginTime))}} - {{formatDate(new Date(post.endTime))}}
                                </div>
                            </div>
                            <div style="color: honeydew" v-if="post.lastComment" class="CommentAuthorForPost">
                                Автор: {{post.lastComment.author}}
                            </div>
                            <div v-if="post.lastComment" class="CommentblockForPost">
                                {{post.lastComment.text}}...
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 thirdCol" :class="blur">
                    <div class="fixedCol">
                        <div class="topMenu d-flex">
                            <div class="topMenuItems active">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/ads">Объявления</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/resumes">Резюме</router-link>
                            </div>
                            <div class="topMenuItems">
                                <router-link style="position: relative; color: white; opacity: 0.8;" to="/Profile">Профиль</router-link>
                            </div>
                        </div>

                        <div class="rightBlock">
                            <div class="rightBlock_block">
                                <div class="searchform d-flex">
                                    <input type="text" class="searchInput" v-model="search">
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
        props: ['id'],
        data() {
            return {
                mode: {
                    all: true,
                    my: false,
                    favorite: false
                },
                posts: [],
                comments: [],
                search: '',
                openedPost: -1,
                showPopup: false,
                showLogin: false,
                message: 'login',
                blur: 'blur_test'
            };
        },
        methods : {
            getFilteredPosts() {
                let _posts = this.posts;

                if (this.search) {
                    _posts = this.searchPosts();
                }

                return _posts;
            },
            to(modeName) {
                let url;
                this.mode = { all: false, my: false, favorite: false };

                if (modeName === 'all' && localStorage.getItem('mode') !== 'my' && localStorage.getItem('mode') !== 'favorite') {
                    url = 'ad';
                    this.mode.all = true;
                }

                if (modeName === 'my' || localStorage.getItem('mode') === 'my') {
                    url = 'ad/user/'+this.$cookies.get("USER").id;
                    this.mode.my = true;
                    localStorage.removeItem('mode');
                }

                if (modeName === 'favorite' || localStorage.getItem('mode') === 'favorite') {
                    url = 'ad/bookmarks';
                    this.mode.favorite = true;
                    localStorage.removeItem('mode');
                }

                axios({
                    method: 'get',
                    url: url,
                    data: {}
                }).then(data => {
                    console.log('SUCCESS');
                    console.log(data);
                    this.posts = data.data;
                    for (let i = 0; i < this.posts.length; i++) {
                        this.posts[i].show = false;
                        this.comments.push(this.posts[i].lastComment);
                    }
                    this.blur = '';

                    if (this.id != '') {
                        for (let i = 0; i < this.posts.length; i++) {
                            if (this.posts[i].id === this.id) {
                                this.posts[i].show = true;
                                this.showPopup = true;
                                this.openedPost = i;
                                this.blur = 'blur_test';
                            }
                        }
                    }
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
            isShowing(id) {
                if (this.openedPost === -1)
                    return false
                else if (this.posts[this.openedPost].id === id)
                    return true
                else
                    return false;
            },
            isFavorite(post) {
                return post.isFavorite
            },
            back() {
                if (document.getElementById('menu_toggle').checked) {
                    this.toggleMenu();
                }
                else {
                    router.push({query: ''});
                    if (this.openedPost != -1) {
                        this.posts[this.openedPost].show = false;
                        this.openedPost = -1;
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
            formatDate(date) {
                let dd = date.getDate();
                if (dd < 10) dd = '0' + dd;

                let mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;

                let yy = date.getFullYear();
                if (yy < 10) yy = '0' + yy;
                
                return dd + '.' + mm + '.' + yy;
            },
            Bookmark(a) {
                axios({
                    method: 'post',
                    url: 'ad/bookmarks/' + a,
                    data: {}
                }).then(() => {
                    let leftSection = document.getElementById(a);
                    leftSection.classList.replace('BookmarkBtnIs', 'BookmarkBtn');
                    this.$notify({
                        group: 'foo',
                        title: 'Пост добавлен в закладки'
                    });
                }).catch(error => {
                    if(error)
                        this.$notify({
                        group: 'foo',
                        title: 'Пост уже был добавлен в закладки'
                    });
                });
            },
            showPost(id) {
                router.push({query: {id: id}});
                for (let i = 0; i < this.posts.length; i++) {
                    if (this.posts[i].id === id) {
                        this.posts[i].show = true;
                        this.showPopup = true;
                        this.openedPost = i;
                        this.blur = 'blur_test';
                    }
                }
            },
            closePopup(e) {
                if (e === 'unauthorized') {
                    this.posts[this.openedPost].show = false;
                    this.openedPost = -1;

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
            },
            searchPosts() {
                let _posts = this.posts.filter((post) => {
                    if (post.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                        return true;
                    if (post.shortDescription.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                        return true;
                    return false;
                });

                return _posts;
            }
        },
        mounted() {
            this.to('all');
        }
    }
</script>

<style scoped>

</style>