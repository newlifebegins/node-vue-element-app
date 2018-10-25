<template>
<div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
</div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name: 'app',
    components: {},
    created() {
        if (localStorage.getItem('token')) {
            let decoded = jwt_decode(localStorage.getItem('token'));
            // token存储到vuex中
            this.$store.dispatch('setIsAuthorization', !this.isEmpty(decoded));
            this.$store.dispatch('setUser', decoded)
        }
    },
    methods: {
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }
}
</script>

<style>
html,
body,
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
