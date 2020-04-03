
<template>
  <div class="container">
      <router-view></router-view>
  </div>

</template>

<script>

    import router from "@/router";
export default {
    mounted()
    {
            router.push("/Login");
    },
}
</script>
<style src="ciao-vue-popup/dist/ciao-vue-popup.css"></style>
<style>
    .postdate{
        height: 25px;
        width: 180px;
        color: white;
        border-radius: 13px;
        background: #3B3B3B;
        margin-left: 180px;
        font-size: 14px;
        text-align: center;
        padding-top: 3px;
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
