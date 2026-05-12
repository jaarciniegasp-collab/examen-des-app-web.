<template>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menú</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" @click="cliente">Cliente</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="productos">Productos Edicion</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item" href="#">Viveres</a></li>
                <li><a class="dropdown-item" href="#">Lacteos y Huevos</a></li>
                <li><a class="dropdown-item" href="#">Licores</a></li>
                <li><a class="dropdown-item" href="#">Dulces</a></li>
                <li><a class="dropdown-item" href="#">Cuidado Personal</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" >Contacto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="salida">Salir</a>
            </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        name:'SidebarComponent',
        
        methods:{
            cliente(){
                this.$router.push('/dashboard')
            },
            productos(){
                this.$router.push('/productos')
            },
            salida(){
                this.$router.push('/salida')
            }
        }
    }
</script>