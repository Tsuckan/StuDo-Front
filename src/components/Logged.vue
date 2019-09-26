<template>
    <div>
        <p>Logged</p>
        <button type="submit" @click="handleSubmit">
            Login
        </button>
    </div>
</template>

<script>
    import router from "@/router";
    import store from '@/main';
    export default {
        name: "Logged",
        methods: {
            handleSubmit(e) {
                console.log(this.$store.getters.USER);
            }
        }
    }
</script>

<style scoped>

</style>