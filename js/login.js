const emailDigitado=document.getElementById("input_Email");
const passwordDigitado=document.getElementById("input_Password");
const ingresarBoton = document.getElementById("btn_Ingresar");

ingresarBoton.addEventListener("click", function (event) {
  event.preventDefault();
let emailDigValue=emailDigitado.value;
let passwordDigValue= passwordDigitado.value;
const usuario = JSON.parse(localStorage.getItem('usuarios')) || []
let logueoUsuario = usuario.find(user => user.correo_Digitado === emailDigValue && user.password_Digitado === passwordDigValue)

if(!logueoUsuario){
  return alert('Usuario y/o Contraseña Incorrecta!');
  //localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  //window.location.href = "./index.html";

} else {
  alert(`Bienvenido!!`);
      window.location.href = "./index.html"; 
}
})
