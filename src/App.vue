<template>
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
            <router-link to="/about" class="nav-link" >Orders</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" >Categories</a>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link" >Users</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Information bar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link :to="{name: 'InformationView' , params:{id: 'about'}}" 
                class="nav-link" aria-current="page">About</router-link></li>
              <li><router-link :to="{name: 'InformationView' , params:{id: 'news'}}" 
                class="nav-link" aria-current="page">News</router-link></li>
              <li><router-link :to="{name: 'InformationView' , params:{id: 'contacts'}}" 
                class="nav-link" aria-current="page">Contact</router-link></li>
                <li><router-link :to="{name: 'InformationView' , params:{id: 'client-info'}}" 
                class="nav-link" aria-current="page">For Client</router-link></li>
              <li><a class="dropdown-item" href="#">Social link</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <!-- <input class="form-control me-2" type="search" placeholder="Поиск" aria-label="Поиск"> -->
          <button class="btn btn-outline-success" type="submit">Выход</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="content-wropper">
    <router-view/>
  </div>
</template>

<style lang="less">
@import './assets/style/style.less';
</style>
