const cuentas = [
  {
    nombre: "11",
    saldo: 100,
    password: "11",
  },
  {
    nombre: "Sensei Xavier",
    saldo: 200,
    password: "helloword",
  },
  {
    nombre: "Sensei Vega",
    saldo: 290,
    password: "l33t",
  },
  {
    nombre: "Emilio",
    saldo: 67,
    password: "123",
  }
];

//-------Variables
var formulario = document.getElementById("formulario");
var inputs = document.querySelectorAll("#formulario input");
//--------
var usuario = document.getElementById("nombre");
var password = document.getElementById("password");
//---------
var info = document.getElementById("info");
//---------
var error = document.getElementById("error");
error.style.color = "red";
//---------Variables de Informacion de usuario
const inputCuenta = [];
const saldoInputCuenta = [];
const nuevoSaldo = [];
//-----
//_______________________________________________________________________

//--------------------Acción de formulario
function enviarFormulario() {

  //Filtrado de cuenta
  const cuenta = cuentas.filter(function (el) {
    return el.password == password.value && el.nombre == usuario.value;
  });
  inputCuenta.push(cuenta);
  saldoInputCuenta.push(inputCuenta[0][0].saldo);

  //Proceso cajero ingreso
  if (cuenta.length == 1) {
    let eyy = document.getElementById("box-content");
      eyy.style.display = "inline";
      //---
    let saludo = document.createTextNode(`Hola ${cuenta[0].nombre}.!, tu saldo es de $ ${cuenta[0].saldo}.¿Que quieres hacer?`);
      document.getElementById("text-box").appendChild(saludo);

    //--Boton ingresar saldo
    let inputIngreso = document.createElement("input");
    inputIngreso.setAttribute("type", "button");
    inputIngreso.setAttribute("value", "Ingresar saldo.");
    inputIngreso.setAttribute("onclick", "inputIngresoFunction()");
    inputIngreso.id = "inputIngresarSaldo";
    inputIngreso.className = "inputIngresarSaldo";
    document.getElementById("divTextContainer").appendChild(inputIngreso);

    //--Boton retirar saldo
    let inputRetiro = document.createElement("input");
    inputRetiro.setAttribute("type", "button");
    inputRetiro.setAttribute("value", "Retirar saldo.");
    inputRetiro.setAttribute("onclick", "inputRetiroFunction()");
    inputRetiro.id = "inputRetirar";
    inputRetiro.className = "inputRetirar";
    document.getElementById("divTextContainer").appendChild(inputRetiro);

    //-------------------
    //Cambio de imagen
    let blockImage = document.getElementById("image");
    blockImage.setAttribute("src", "./images/welcome.png");

    
    //cambio botón entrar
    let enter = document.getElementById('btn');
    enter.setAttribute('onclick', 'location.reload()');
    

  }

  /* //---
  var mensajesError = [];

  if (nombre.value === null || nombre.value === "") {
    mensajesError.push("Ingresa el usuario");
  }
  if (password.value === null || password.value === "") {
    mensajesError.push("Ingresa la contraseña");
  }

  error.innerHTML = mensajesError.join(" e ");   */
  //---
  return false;
}
//-----------------------------------------------------



//-----------------------Acciones usuario-------------------

//------------------función de ingreso de saldo
function inputIngresoFunction() {
  //Quitar div de texto.
  let d = document.getElementById("box-content");
  let container = document.getElementById("divTextContainer");
  d.removeChild(container);

  //Agregar elementos de proceso.
  let accessIcon = document.getElementById("accessIcon");
  let f = document.createElement("form");
  f.id = "f";
  f.className = "f";
  accessIcon.appendChild(f);

  let y = document.createElement("label");
  y.setAttribute("for", "ingreso");
  y.id = "textInputIngreso";
  y.className = "textInputIngreso";
  let t = document.createTextNode("Coloca la cantidad que deseas ingresar:");
  y.appendChild(t);
  f.appendChild(y);

  let h = document.createElement("input");
  h.setAttribute("type", "number");
  h.setAttribute("name", "ingreso");
  h.id = "inputIngreso";
  h.className = "inputIngreso";
  f.appendChild(h);

  let x = document.createElement("input");
  x.setAttribute("type", "button");
  x.setAttribute("value", "Ingresar.");
  x.setAttribute("onclick", "saldoIngresado()");
  x.id = "inputIngresoSubmit";
  x.className = "inputIngresoSubmit";
  f.appendChild(x);

}
//-------

//---------------------Función de retiro de saldo
function inputRetiroFunction() {
  //Quitar div de texto.
  let d = document.getElementById("box-content");
  let container = document.getElementById("divTextContainer");
  d.removeChild(container);

  //Agregar elementos de proceso.
  let accessIcon = document.getElementById("accessIcon");
  let f = document.createElement("form");
  f.id = "f";
  f.className = "f";
  accessIcon.appendChild(f);

  let y = document.createElement("label");
  y.setAttribute("for", "ingreso");
  y.id = "textInputIngreso";
  y.className = "textInputIngreso";
  let t = document.createTextNode("Pon la cantidad que deseas Retirar:");
  y.appendChild(t);
  f.appendChild(y);

  let h = document.createElement("input");
  h.setAttribute("type", "number");
  h.setAttribute("name", "ingreso");
  h.id = "inputIngreso";
  h.className = "inputIngreso";
  f.appendChild(h);

  let x = document.createElement("input");
  x.setAttribute("type", "button");
  x.setAttribute("value", "Ingresar.");
  x.setAttribute("onclick", "saldoIngresadoRetiro()");
  x.id = "inputIngresoSubmit";
  x.className = "inputIngresoSubmit";
  f.appendChild(x);

}


//_________________________________________________________________________//




//--Función de operacion de saldo ingresado
function saldoIngresado() {
  //Suma nuevo saldo;
  let s = saldoInputCuenta.length -1;
  let saldo = saldoInputCuenta[s];
  let newSaldo = parseFloat(saldo) + parseFloat(inputIngreso.value);
  let saldoI = document.getElementById("saldoI");
  saldoI.style.color = "blue";

  //Letrero nuevo saldo
  saldoInputCuenta.push(newSaldo);
  nuevoSaldo.push(newSaldo);
  let letreroSaldo = [];

  //Variables ajuste de saldo
  let gg = nuevoSaldo.length - 1;


  if (nuevoSaldo[gg] > 990) {
    saldoI.style.color = "red";
    letreroSaldo.push("El saldo maximo es de $990.00");
    saldoI.innerHTML = letreroSaldo.join();
  } else {
    letreroSaldo.push(`El nuevo saldo es de $${nuevoSaldo[gg]}`);
    saldoI.innerHTML = letreroSaldo.join();
  };

  return false;
};

//--Funcion de operacion de saldo retirado
function saldoIngresadoRetiro() {
  //Resta nuevo saldo;
  let s = saldoInputCuenta.length - 1;
  let saldo = saldoInputCuenta[s];
  let newSaldo = parseFloat(saldo) - parseFloat(inputIngreso.value);
  let saldoI = document.getElementById("saldoI");
  saldoI.style.color = "blue";

  //Letrero nuevo saldo
  saldoInputCuenta.push(newSaldo);
  nuevoSaldo.push(newSaldo);
  let letreroSaldo = [];

  //Variables ajuste de saldo
  let gg = nuevoSaldo.length - 1;


  if (nuevoSaldo[gg] < 10) {
    saldoI.style.color = "red";
    letreroSaldo.push("No tienes saldo suficiente.");
    saldoI.innerHTML = letreroSaldo.join();
  } else {
    letreroSaldo.push(`El nuevo saldo es de $${nuevoSaldo[gg]}`);
    saldoI.innerHTML = letreroSaldo.join();
  };

  return false;
};


