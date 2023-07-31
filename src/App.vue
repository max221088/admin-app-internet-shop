<template>
  <template v-if="!isLogin">
    <div class="overlay">
      <div class="log-win">
        <div class="title-login">Login</div>
        <input v-model="userCred.email" type="text" class="form-control login" placeholder="Email">
        <input v-model="userCred.pass" type="password" class="form-control pass" placeholder="Password" >
        <button @click="login()" type="button" class="btn btn-success mt-3">Enter</button>
      </div>
    </div>
  </template>
  <template v-if="isLogin">
    <nav class="navbar navbar-expand-lg navbar-light bg-light title-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
      <img src="./assets/logo.png" alt="icon" width="30" height="24" class="d-inline-block align-text-top">
      Brand
    </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'EditProduct' , params:{id:'new'}}" 
            class="nav-link" aria-current="page">Add product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" class="nav-link" >Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/categories-manager/" class="nav-link" >Categories Manager</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link" >Users</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Information bar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/information/about/" 
                class="nav-link" aria-current="page">About</router-link></li>
              <li><router-link to="/information/news/" 
                class="nav-link" aria-current="page">News</router-link></li>
              <li><router-link to="/information/contacts/" 
                class="nav-link" aria-current="page">Contact</router-link></li>
              <li><router-link to="/information/waranty/"
                class="nav-link" aria-current="page">Waranty Info</router-link></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <button @click="logout()" class="btn btn-outline-success" type="submit">Exit</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="content-wropper">
    <router-view/>
  </div>
  </template>
</template>

<script>
  export default {
    name: 'App',
    data: () => {
      return {
        userCred: {
          email: '',
          pass: ''
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        window.sessionStorage.clear()
      },
      login () {
        this.$store.dispatch('login', this.userCred);
      }
    },
    computed: {
      isLogin () {
          return this.$store.getters['getIsLogin'];
      },
      
    },
    created: function () {
      if (window.sessionStorage.length) {
        this.userCred = JSON.parse(window.sessionStorage.login);
        this.login()
      }
    }
  }
</script>


<style lang="less">
  @import './assets/style/index.less';
</style>
