const RegistrarBotton=document.getElementById("btn_Registrar");

RegistrarBotton.addEventListener("click",function(event){
    event.preventDefault();
    const nombre_Digitado = document.getElementById("input_Name").value;
    const correo_Digitado=document.getElementById("input_Email").value;
    const password_Digitado=document.getElementById("input_Password").value;
    const monto_Digitado=document.getElementById("input_Monto").value;
   // const usuarios=JSON.parse(localStorage.getItem('users'))
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [] 
    const usuarioRegistrado = usuarios.find(user => user.correo_Digitado === correo_Digitado)
    if(usuarioRegistrado){
        return alert('El usuario ya esta registrado!')
    }
    usuarios.push({nombre_Digitado:nombre_Digitado,correo_Digitado:correo_Digitado,password_Digitado:password_Digitado,monto_Digitado:monto_Digitado})
    localStorage.setItem('usuarios',JSON.stringify(usuarios))
    alert('Registro Creado Exitosamente');
    window.location.href = 'login.html'


    //const usuarioRegistrado=
})