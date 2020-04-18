<template>
    <container>
        <h1>404</h1>
        <router-link to="/Logged"> На Главную </router-link>
    </container>
</template>

<script>
    import router from "../router";
    export default {
        name: 'nf',
        mounted() {
            var s = decodeURIComponent(this.$route.fullPath);
            // eslint-disable-next-line no-console
            console.log(s)
            if(s==='/')
            {
                router.push('/Logged')
            }
        }
    }
</script>

<style scoped>

</style>