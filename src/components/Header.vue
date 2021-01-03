<template>
    <header>
        <router-link class="logoBlock d-flex" to="/Logged">
            <div class="logo d-flex">
                <div class="imgLogo">
                    <img src="../../src/assets/logo.png" height="50px" width="50px"/></div>
                <div class="nameLogo">
                    StuDo
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

<style scoped>
header {
    height: 50px;
    background: var(--header-color);
    margin: 0 auto;
}

.logoBlock {
    width: 213px;
    background: var(--header-block-color);
    height: 70px;
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.logo{
    margin: 5px auto;
}

.imgLogo {
    opacity: 0.8;
}

.nameLogo {
    font-size: 24px;
    color: var(--header-text-color);
    margin-top: 10px;
    margin-left: 10px;
}

@media (max-width: 655px) {
    .logoBlock {
        height: 50px;
        border-radius: 0;
        background-color: transparent;
    }
    
    .logo {
        margin: 2px auto;
    }
}
</style>
