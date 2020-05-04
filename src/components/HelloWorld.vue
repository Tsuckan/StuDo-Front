<template>
    <div class="main">
        <header>
            <div class="logoBlock d-flex">
                <div class="logo d-flex">
                    <div class="imgLogo">
                        <img src="../../src/assets/logo.png" height="50px" width="50px"/></div>
                    <div class="nameLogo">
                        StuDo
                    </div>
                </div>
            </div>
        </header>

        <div class="blur_test">
            <div class="menu">
                <input id="menu_toggle" type="checkbox" />
                <label id="menu_btn" for="menu_toggle">
                    <span></span>   
                </label>
                <div class="btnsMenu">
                    <div class="menuBarBut">
                        <router-link to="/Create">Создать объявление</router-link>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnActiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;" to="/Logged">Все объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;"  to="/MyLogged">Мои объявления</router-link>
                        </div>
                    </div>
                    <div class="btnMenuItems d-flex">
                        <div class="btnPassiv"></div>
                        <div class="pointers">
                            <router-link style="position: relative; color: white;"  to="/Favorited">Закладки</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col-4 firstCol">
                        <div class="fixedCol">
                            <div class="menuBar">
                                <div class="btnsMenu">
                                    <div class="menuBarBut">
                                        <router-link to="/Create">Создать объявление</router-link>
                                    </div>
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnActiv"></div>
                                        <div class="pointers">
                                            <router-link style="position: relative; color: white;" to="/Logged">Все объявления</router-link>
                                        </div>
                                    </div>
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                            <router-link style="position: relative; color: white;"  to="/MyLogged">Мои объявления</router-link>
                                        </div>
                                    </div>
                                    <div class="btnMenuItems d-flex">
                                        <div class="btnPassiv"></div>
                                        <div class="pointers">
                                            <router-link style="position: relative; color: white;"  to="/Favorited">Закладки</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 mainArea">
                        <div class="postBlocks">

                        </div>
                    </div>
                    <div class="col-4 thirdCol">
                        <div class="fixedCol">
                            <div class="topMenu d-flex">
                                <div class="topMenuItems active">
                                    <router-link to="/Logged">Объявления</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link to="/Resumes">Резюме</router-link>
                                </div>
                                <div class="topMenuItems">
                                    <router-link to="/Profile">Профиль</router-link>
                                </div>
                            </div>

                            <div class="rightBlock">
                                <div class="rightBlock_block">
                                    <div class="searchform d-flex">
                                        <input type="text" class="searchInput">
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
        <div class="blur_layer"></div>
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
                    <router-link class="doubleLink" to="/Register">Регистрация</router-link>
                    <router-link class="doubleLink" to="/PassForgot">Забыл пароль</router-link>
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
    import router from "@/router";
  import axios from 'axios';
  // eslint-disable-next-line no-unused-vars
  export default {

    name: 'HelloWorld',

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
              router.push("/Logged");
          }
      },
methods : {
  handleSubmit(e){
    e.preventDefault()
      axios({
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
            router.push("/Logged");
        }
    }).catch(error => {
          if(error)
              this.$notify({
                  group: 'foo',
                  title: 'Ошибка',
                  text: 'Проверьте пару логин и пароль'
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
