
<template>
  <div class="container">
      <notifications classes="my-style" group="foo" />
      <router-view></router-view>
  </div>

</template>

<script>
    window.globalVar = "https://dev.studo.rtuitlab.ru/api/";
export default {
    mounted()
    {
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
