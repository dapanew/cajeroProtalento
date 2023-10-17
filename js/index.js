const usuarioStore = JSON.parse(localStorage.getItem("usuarios")) || false;
if (!usuarioStore) {
  window.location.href = "login.html";
}
/* funcion que coloca la mano sobre las opciones*/
function mano() {
  document.getElementById("consulta-saldo").style.cursor = "pointer"
  document.getElementById("ingresar-saldo").style.cursor = "pointer"
  document.getElementById("retirar-saldo").style.cursor = "pointer"
}
mano();
/* funcion que muestra el nombre y saldo del usuario que se encuentra logueado */
function mostrarAlertNombreUsuario() {
  const usuarioStore1 = localStorage.getItem("usuarios");
  const nombreObjeto1 = JSON.parse(usuarioStore1);
  let saldoUsuario="";
  let saludodiv="";
  let saldoActual="";
  let nombreUsuario="";
  for(let i = 0; i < nombreObjeto1.length; i++) {
     nombreUsuario=nombreObjeto1[i].nombre_Digitado;
     saldoUsuario=nombreObjeto1[i].monto_Digitado;
  }
  saludodiv = document.getElementById("saludo");
  saludodiv.textContent = `Bienvenido al Banco, ${nombreUsuario}`; 
  saldoActual = document.getElementById("saldo-Actual");
  saldoActual.textContent=saldoUsuario;
}
mostrarAlertNombreUsuario();

function retirarSaldo() {
  let nuevoDiv2 = document.getElementById("resta");
  nuevoDiv2.style.display = "block";
}

function ingesarSaldo() {
  var nuevoDiv = document.getElementById("suma");
  nuevoDiv.style.display = "block";
}
/* funcion que muestra  el saldo en pantalla para la primera opcion del menu */
function mostrarSaldoPantalla() {
  let nuevoDiv3 = document.getElementById("consulta");
    const saldo = localStorage.getItem("usuarios");
    const saldoObjeto = JSON.parse(saldo);
    let saldoUsuario="";
    saldoObjeto.forEach(saldosObjeto => {
       saldoUsuario =saldosObjeto.monto_Digitado;    
    });
    nuevoDiv3.style.display = "block";
    const cajaSaldo = document.getElementById("mensajeResta");
    cajaSaldo.textContent = `Tu saldo en la cuenta es de ${saldoUsuario}`;
  }


  function salir() {
    let divConsulta = document.getElementById("consulta");
    divConsulta.style.display = "none";
    let divResta = document.getElementById("resta");
    divResta.style.display = "none";
    let divSuma = document.getElementById("suma");
    divSuma.style.display = "none";
  }
  /* funcion que realiza la deducion del valor capturado vs el que se encuentra guardado */
function debitarSaldo() {
  let usuarioStore2 = JSON.parse(localStorage.getItem("usuarios"));
  let montRetInput = parseInt(document.getElementById("mont-Ret-Input").value);

  if (montRetInput === "") {
    alert("este numero no es valido");
    montRetInput.value = 0;
    salir();
    return;
  }
  let saldoNuevo = document.getElementById("saldo-Actual").innerText;
  let saldoFinal = (montRetInput - saldoNuevo)* -1;;
  if (saldoFinal < 0) {
    alert("Sin fondos suficientes");
    montRetInput = 0;
    salir();
    return;
  } else if (saldoFinal < 10000) {
    alert(
      "No podemos realizar esta transaccion la cuenta debe tener un minimo de $10.000"
    );
    montRetInput= 0;
    salir();
    return;
  }
  let saldoGuardado = JSON.parse(localStorage.getItem("saldoFinal2")) || [];
  saldoGuardado.push("RETIRO2", saldoFinal);
  localStorage.setItem("saldoFinal2", JSON.stringify(saldoGuardado));
  sessionStorage.setItem("monto", saldoFinal);

  usuarioStore2.forEach((usuario) => {
    if (usuario.correo_Digitado === sessionStorage.getItem("email")) {
      usuario.monto_Digitado = sessionStorage.getItem("monto");
    }
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarioStore2));

  const datoAlmacenado = JSON.parse(localStorage.getItem("saldoFinal2"));
  const ultimoDato = datoAlmacenado[datoAlmacenado.length - 1];
  /* funcion que actualiza el saldo */
  function actualizarSaldo() { 
    const saldo = localStorage.getItem("usuarios");
    const saldoObjeto = JSON.parse(saldo);

    const saldoFinal = localStorage.getItem("saldoFinal2");
    let saldoFinalObjeto = JSON.parse(saldoFinal);
    saldoFinalObjeto = saldoFinalObjeto[saldoFinalObjeto.length - 1];
    saldoObjeto.monto = saldoFinalObjeto;
    sessionStorage.setItem("usuarios", saldoObjeto);
    let saldoUsuario = saldo.monto_Digitado;
    saldoUsuario = saldoFinalObjeto;
    
    const cajaSaldo = document.getElementById("saldo-Actual");
    cajaSaldo.textContent = saldoFinalObjeto;

    const usuario = localStorage.getItem("usuarios");
    const emailObjeto = JSON.parse(usuario);
    const emailUsuario = emailObjeto.correo_Digitado; 

    const sesionData = sessionStorage.getItem(`historial_${emailUsuario}`); 
    const cadena = sesionData ? JSON.parse(sesionData) : [];
    cadena.push("RETIRO2", montRetInput, "MONTO2", saldoFinalObjeto);
    sessionStorage.setItem(`historial_${emailUsuario}`, JSON.stringify(cadena));

    /* funcion que envia mensaje de salida */
    function mensaje2() {
      document.getElementById("resultado").style.display = "block";

      const mensaje = document.getElementById("resultado");

      mensaje.textContent = "RETIRO EXITOSO";
      setTimeout(() => {
        document.getElementById("resultado").style.display = "none";
        document.getElementById("resta").style.display = "none";
      }, 1000);
    }
    mensaje2();
    //------------------------------------------------------------------------------------salida y reseteo
    montRetInput = "";
  }
  actualizarSaldo();
}

function sumarValorIngresado() {
  let usuarioStore3 = JSON.parse(localStorage.getItem("usuarios"));
  let montoDeposito = parseInt(document.getElementById("mont-Ingre-Input").value);

  if (montoDeposito === "") {
    alert("este numero no es valido");
    montoDeposito.value = 0;
    salir();
    return;
  }
  let saldo = document.getElementById("saldo-Actual").innerText;
  let saldoParcial = parseInt(saldo);
  let saldoFinal = montoDeposito + saldoParcial;

  let saldoGuardado = JSON.parse(localStorage.getItem("saldoFinal2")) || [];
  saldoGuardado.push("DEPOSITO2", saldoFinal);
  localStorage.setItem("saldoFinal2", JSON.stringify(saldoGuardado));
  sessionStorage.setItem("monto", saldoFinal);
  usuarioStore3.forEach((usuario) => {
    if (usuario.correo_Digitado === sessionStorage.getItem("email")) {
      usuario.monto_Digitado = sessionStorage.getItem("monto");
    }
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarioStore3));
  const datoAlmacenado = JSON.parse(localStorage.getItem("saldoFinal2"));
  const ultimoDato = datoAlmacenado[datoAlmacenado.length - 1];

/* funcion que actualiza el saldo */
  function actualizarSaldo() {
    const saldo = localStorage.getItem("usuarios");
    const saldoObjeto = JSON.parse(saldo);
    const saldoFinal = localStorage.getItem("saldoFinal2");
    let saldoFinalObjeto = JSON.parse(saldoFinal);
    saldoFinalObjeto = saldoFinalObjeto[saldoFinalObjeto.length - 1];
    saldoObjeto.monto = saldoFinalObjeto;
    let saldoUsuario = saldo.monto;
    saldoUsuario = saldoFinalObjeto;
    const usuario = localStorage.getItem("usuarios");
    const emailObjeto = JSON.parse(usuario);
    const emailUsuario = emailObjeto.correo_Digitado;

    const sesionData = sessionStorage.getItem(`historial_${emailUsuario}`); 
    const cadena = sesionData ? JSON.parse(sesionData) : [];
    cadena.push("DEPOSITO", montoDeposito, "MONTO", saldoFinalObjeto);
    sessionStorage.setItem(`historial_${emailUsuario}`, JSON.stringify(cadena));
/* funcion mensaje de finalizacion */
    function mensaje() {
      document.getElementById("resultado").style.display = "block";
      const mensaje = document.getElementById("resultado");
      mensaje.textContent = "DEPOSITO EXITOSO";
      setTimeout(() => {
        document.getElementById("resultado").style.display = "none";
        document.getElementById("suma").style.display = "none";
      }, 1000);
    }
    mensaje();
    // ----------------------------------------------------------------------------------mostrar en saldo

    const cajaSaldo = document.getElementById("saldo-Actual");
    cajaSaldo.textContent = saldoFinalObjeto;
    montoDeposito = "";
  }
  actualizarSaldo();
}