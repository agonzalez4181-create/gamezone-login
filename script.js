// ================== script.js ==================
/* Guardado simple en memoria (se pierde al recargar).
   En producción usarías backend + base de datos. */
const usuarios = [];          // array de {email, password, nombre ...}

/* ---------- NAVEGACIÓN ---------- */
const btnLoginTab = document.getElementById('btnLoginTab');
const btnRegTab   = document.getElementById('btnRegTab');
const loginBox    = document.getElementById('loginBox');
const regBox      = document.getElementById('regBox');

btnLoginTab.addEventListener('click',()=>switchTab('login'));
btnRegTab.addEventListener('click',  ()=>switchTab('reg'));

function switchTab(mode){
  btnLoginTab.classList.toggle('active', mode==='login');
  btnRegTab.classList.toggle('active',   mode==='reg');
  loginBox.classList.toggle('hidden', mode!=='login');
  regBox.classList.toggle('hidden',   mode!=='reg');
}

/* ---------- LOGIN ---------- */
document.getElementById('formLogin').addEventListener('submit', e=>{
  e.preventDefault();
  const email    = document.getElementById('logEmail').value.trim().toLowerCase();
  const password = document.getElementById('logPassword').value;
  const errorBox = document.getElementById('logError');

  const user = usuarios.find(u=>u.email===email);
  if(!user){
    errorBox.textContent='Correo no registrado.';
    return;
  }
  if(user.password!==password){
    errorBox.textContent='Contraseña incorrecta.';
    return;
  }
  errorBox.textContent='';
  alert(`Bienvenido ${user.nombre}`);
});

/* ---------- REGISTRO ---------- */
document.getElementById('formReg').addEventListener('submit', e=>{
  e.preventDefault();
  const nombre   = document.getElementById('regNombre').value.trim();
  const email    = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass     = document.getElementById('regPass').value;
  const pass2    = document.getElementById('regPass2').value;
  const fono     = document.getElementById('regFono').value.trim();
  const genero   = document.getElementById('regGenero').value;
  const errorBox = document.getElementById('regError');

  /* Validaciones */
  if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(nombre) || nombre.length>100){
    errorBox.textContent='Nombre inválido (solo letras y espacios, máx 100).';
    return;
  }
  if(!/^[\w._%+-]+@duoc\.cl$/.test(email)){
    errorBox.textContent='Debes usar un correo @duoc.cl';
    return;
  }
  if(usuarios.some(u=>u.email===email)){
    errorBox.textContent='Este correo ya está registrado.';
    return;
  }
  if(pass.length<10){
    errorBox.textContent='La contraseña debe tener al menos 10 caracteres.';
    return;
  }
  if(!/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass) || !/[^A-Za-z0-9]/.test(pass)){
    errorBox.textContent='La contraseña debe incluir mayúscula, minúscula, número y carácter especial.';
    return;
  }
  if(pass!==pass2){
    errorBox.textContent='Las contraseñas no coinciden.';
    return;
  }
  if(fono && !/^[0-9]{8,15}$/.test(fono)){
    errorBox.textContent='Teléfono inválido (8-15 dígitos).';
    return;
  }
  if(!genero){
    errorBox.textContent='Selecciona un género favorito.';
    return;
  }

  /* Todo OK → guardar */
  usuarios.push({nombre, email, password:pass, fono, genero});
  errorBox.textContent='';
  alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
  switchTab('login');
});