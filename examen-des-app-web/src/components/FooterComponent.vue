<template>
  <footer id="contacto" class="footer">
    <div class="footer-contenedor">

      <div class="footer-logo">
        <img src="/imagenes/Logo.png" alt="Logo Micromercado Koki">
        <h3>Micromercado Koki</h3>
      </div>

      <div class="footer-info">
        <p><i class="fa-solid fa-phone"></i> 300 123 4567</p>
        <p><i class="fa-solid fa-envelope"></i> micromercadokoki@gmail.com</p>
        <p><i class="fa-solid fa-location-dot"></i> Ocaña, Norte de Santander</p>
      </div>

      <div class="footer-integrantes">
        <h4>Integrantes</h4>
        <p>Jorge Arciniegas (192673)</p>
        <p>Shairek Barbosa (192678)</p>
        <p>Juan Jaime (192609)</p>
      </div>

    </div>

    <p class="footer-copy">
      © 2026 Micromercado Koki. Todos los derechos reservados.
    </p>
  </footer>
</template>

<style scoped>
.footer {
  background: #071d49;
  color: white;
  padding: 30px 20px;
}

.footer-contenedor {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-logo img {
  width: 100px;
  margin-bottom: 10px;
}

.footer-logo h3 {
  margin: 0;
}

.footer-info p,
.footer-integrantes p {
  margin: 5px 0;
}

.footer-integrantes h4 {
  margin-bottom: 10px;
}

.footer-copy {
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 10px;
  font-size: 14px;
}
</style>