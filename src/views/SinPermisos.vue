<template>
  <div class="forbidden-page">
    <div class="forbidden-card">
      <div class="icon-section">
        <svg viewBox="0 0 24 24" class="svg-lock" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#EF4444"/>
          <path d="M12 8V12" stroke="#EF4444"/>
          <path d="M12 16H12.01" stroke="#EF4444"/>
        </svg>
      </div>

      <h1 class="forbidden-title">403</h1>
      
      <div class="message-section">
        <p class="forbidden-msg">No tenés permisos para acceder</p>
        <p class="forbidden-submsg">
          Parece que tu cuenta no tiene autorización para ver este contenido.<br/>
          
        </p>
      </div>


    </div>
  </div>
</template>

<style scoped>

.forbidden-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F9FAFB; /* Un gris muy clarito, moderno */
  font-family: system-ui, -apple-system, sans-serif;
  padding: 2rem;
}


.forbidden-card {
  background-color: #FFFFFF;
  padding: 3.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04); /* Sombra muy suave */
  text-align: center;
  max-width: 480px;
  width: 100%;
  border: 1px solid #F3F4F6;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.icon-section {
  margin-bottom: 1.5rem;
}
.svg-lock {
  width: 80px;
  height: 80px;
}

/* Título 403 */
.forbidden-title {
  font-size: 5rem;
  font-weight: 800;
  color: #111827; 
  margin: 0 0 1rem 0;
  line-height: 1;
}

.message-section {
  margin-bottom: 2.5rem;
}
.forbidden-msg {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151; 
  margin-bottom: 0.75rem;
}
.forbidden-submsg {
  font-size: 1rem;
  color: #6B7280; 
  line-height: 1.6;
}


.action-section {
  width: 100%;
}
.forbidden-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background-color: #EF4444; 
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.forbidden-btn:hover {
  background-color: #DC2626; /* Rojo un poco más oscuro al pasar el mouse */
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.forbidden-btn:active {
  transform: translateY(1px); /* Efecto de presionar */
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>