
<template>
  <div class="container">
      <notifications classes="my-style" group="foo" />
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
<style>
    .my-style {
         padding: 10px;
         margin: 0 5px 5px;
         font-size: 12px;
         color: #ffffff;
         border-left: 5px solid rgb(102,62,179);
         background: rgb(102,49,179) !important;
     }
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
