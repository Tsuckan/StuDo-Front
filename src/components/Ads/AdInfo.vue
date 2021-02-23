<template>
    <div>
        <div class="singleAd">
            <div class="postBlock" id="full" ref="block">
                <div class="postTopBlock">
                    <div class="blockTopForLogo">
                        <i class="fa fa-ambulance" aria-hidden="true"></i>
                    </div>
                    <div class="titleForPost">{{posts.data.name}}
                    </div>
                </div>
                <div class="postDownBlock" style="min-height: 335px;">
                    <div class="textblockForPost">
                        {{posts.data.shortDescription}}
                    </div>
                    <div class="postdate postdate_post">
                        {{formatDate(new Date(posts.data.beginTime))}} - {{formatDate(new Date(posts.data.endTime))}}
                    </div>
                </div>
            </div>
            <div ref="container" class="commentsContainer">
                <div ref="comments" class="commentsBlock">
                    <div v-if="posts.data.comments.length!=0" class="oneComment customScroll" ref="commentsField">
                        <div class="commentsblocks"  v-for="post in posts.data.comments" :key="post.id">
                            <div v-if="posts.data.comments.length!=0" :id='post.id' class="commentblock">
                                <div class="commentauthor">
                                    {{post.author}}
                                </div>
                                <div class="textblockForComment">
                                    {{post.text}}
                                </div>
                                <div class="commentdate">
                                    {{formatDate(new Date(post.commentTime))}}
                                </div>
                                <button v-if="checker(post.authorId)"  class="DeleteBtn" @click="Bookmark(post.id)">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref="noComments" class="noComments" style="padding-top:15px; text-align: center;" v-else>Комментариев нет</div>
                    <div class="writecomment">
                        <textarea v-model="description" id="description" class="customScroll"></textarea>
                        <button @click="handleSubmit"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "AdInfo",
        props: ['id'],
        data() {
            return {
                posts: [],
                postid: this.id
            };
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()
                axios({
                    method: 'post',
                    url: 'ad/comment/' + this.postid,
                    data: {
                        text: this.description
                    }
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(({data}) => {
                        // eslint-disable-next-line no-console
                        console.log('status: ', data.status);
                        this.description='';
                        this.$notify({
                            group: 'foo',
                            title: 'Успешно',
                            text: 'Комментарий успешно отправлен'
                        });

                        axios({
                            method: 'get',
                            url: 'ad/' + this.postid,
                            data: {}
                        })
                            .then(data => {
                                this.posts=data;
                            }).catch(error => {
                            if(error.response.status==401) {
                                this.$emit('close', 'unauthorized');
                            }
                        });
                    }).catch(error => {
                    if (error)
                        // eslint-disable-next-line no-console
                        console.log('status: ', error.code);
                    this.$notify({
                        group: 'foo',
                        title: 'Произошла ошибка',
                        text: 'Проверьте поля заполнения'
                    });
                });
            },
            checker(comid) {
                return comid===this.$cookies.get("USER").id
            },
            Bookmark(a) {
                axios({
                    method: 'delete',
                    url: 'ad/comment/' + this.postid + '/' + a,
                    data: {}
                }).then(data => {
                    if(data)
                        document.getElementById(a).remove();
                    this.$popup('append', 'Комментарий удалён');
                })
            },
            formatDate(date) {
                var dd = date.getDate();
                if (dd < 10) dd = '0' + dd;
                var mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;
                var yy = date.getFullYear();
                if (yy < 10) yy = '0' + yy;
                return dd + '.' + mm + '.' + yy;
            }
        },
        mounted() {
            axios({
                method: 'get',
                url: 'ad/' + this.postid,
                data: {}
            })
                .then(data => {
                    this.posts=data;
                }).catch(error => {
                if(error.response.status==401) {
                    this.$emit('close', 'unauthorized');
                }
            });
        },
        updated() {
            let height = this.$refs.block.clientHeight;
            if (this.$refs.noComments) {
                this.$refs.noComments.style.height=(height-58.5)+'px';
            }
            if (this.$refs.commentsField) {
                this.$refs.commentsField.style.height=(height-58.5)+'px';
            }
            this.$refs.container.style.height=(height)+'px';
        },
    }
</script>

<style scoped>
    .textblockForComment {
        width: 100%;
        height: auto;
        padding-left: 15px;
        font-size: 16px;
        color: var(--textblockForPost-color);
    }
    .commentauthor {
        padding-bottom: 5px;
        color: var(--comment-color);
    }
    .commentdate {
        display: inline-block;
        padding: 15px 0 0 15px;
        color: var(--comment-color);
    }
    .postdate_post {
        width: 200px;
    }
</style>