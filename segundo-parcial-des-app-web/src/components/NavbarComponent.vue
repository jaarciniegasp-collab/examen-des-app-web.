<template>
<nav class="navbar navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="../assets/iconos/Logo.png" alt="Bootstrap" width="250" height="150"></a>
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Buscar</button>
    </form>
    <SidebarComponent/>
  </div>
</nav>
</template>

<script>
import SidebarComponent from './SidebarComponent.vue';

export default{
  name:'NavbarComponent',

  components:{
    SidebarComponent
  }
}
</script>