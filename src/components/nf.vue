<script>
    export default {
        name: 'nf',
        mounted() {
            var s = decodeURIComponent(this.$route.fullPath);
            // eslint-disable-next-line no-console
            console.log(s);
            window.location.href = process.env.VUE_APP_FRONT + 'ads';
        }
    }
</script>

<style scoped>

</style>