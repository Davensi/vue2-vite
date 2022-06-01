<template>
    <div class="app">
        <img src="../favicon.svg" alt="" height="100px">
        <h1>vue2+vite</h1>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/test">test</router-link>
        <router-view />

    </div>
</template>

<script>
    export default {
        
    }
</script>
<style lang="scss">
    .App {
        ul {
            li {
                list-style: none;
            }
        }
    }
</style>

