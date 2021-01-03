<template>
    <header>
        <router-link to="/Logged">
            <div class="logoBlock d-flex">
                <div class="logo d-flex">
                    <div class="imgLogo">
                        <img src="../../src/assets/logo.png" height="50px" width="50px"/></div>
                    <div class="nameLogo">
                        StuDo
                    </div>
                </div>
            </div>
        </router-link>
    </header>
</template>

<script>
export default {
    name: "appHeader"
}
</script>