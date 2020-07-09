<template>
    <div>
        <div class="popupBlock">
            <div class="popupHeader">Авторизация</div>
            <div class="popupBody">
                <label for="Email">Email</label>
                <input placeholder="" id="Email" required v-model="Email" name="Email" type="text">
                <label for="Password">Пароль</label>
                <input placeholder="" id="Password" required v-model="Password" name="Password" type="password">
            </div>
            <div class="popupFooter">
                <div class="halfBlock leftAlign">
                    <a href="javascript: void(0);" @click="$emit('change', 'registration')">Регистрация</a>
                    <a href="javascript: void(0);" @click="$emit('change', 'passForget')">Забыл пароль</a>
                </div>
                <div class="halfBlock rightAlign">
                    <button @click="handleSubmit">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios';
  // eslint-disable-next-line no-unused-vars
  export default {

    name: 'Authorize',

    data(){
      return {
        Email : "",
        Password : "",
        IsNotify: this.$router.currentRoute.params['IsNotify'],
        IsCorrect: this.$router.currentRoute.params['IsCorrect']
      }
    },
      mounted()
      {
          if(this.IsNotify)
          {
              this.$notify({
                  group: 'foo',
                  title: 'Почта подтверждена'
              });
          }
          if (this.$cookies.get("ACCESSTOKEN") && this.IsCorrect)
          {
              this.$emit('close');
          }
      },
methods : {
  handleSubmit(e){
    e.preventDefault()
      if (this.Email === '' || this.Email === undefined) {
        this.$notify({
          group: 'foo',
          title: 'Ошибка',
          text: 'Поле Почта незаполнено'
        });
      }
      else if (this.Password === '' || this.Password === undefined) {
        this.$notify({
          group: 'foo',
          title: 'Ошибка',
          text: 'Поле Пароль незаполнено'
        });
      }
      else axios({
      method: 'post',
      url: process.env.VUE_APP_API + 'auth/login',
      data: {
        email: this.Email,
        password: this.Password
      }
    })
    .then(({ data }) => {
        if (data.accessToken!=null)
        {
            this.$store.commit("SET_USER", data.user);
            this.$store.commit("SET_ACCESSTOKEN", data.accessToken);
            this.$cookies.set('ACCESSTOKEN', this.$store.getters.ACCESSTOKEN, '1m');
            this.$cookies.set('USER', this.$store.getters.USER, '1m');
            this.$cookies.set('REFRESHTOKENTOKEN', data.refreshToken, '1m');
            this.$store.getters.USER;
            this.$emit('close');
        }
    }).catch(error => {
          if(error)
              this.$notify({
                  group: 'foo',
                  title: 'Ошибка',
                  text: 'Проверьте логин и пароль'
              });
      });
  }
}
}

    document.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            var elems = document.getElementsByClassName("Login_BTN");
            elems[0].click();

        }
        // Отменяем действие браузера
        return false;
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
