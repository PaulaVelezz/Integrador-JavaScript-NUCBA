const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});


// validando los formularios 

const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//chequeo el nombre de usuario ingresado
const checkUsername = () => {
  let valid = false;
  const minlength = 6;
  const maxlength = 12;

  const username = nameInput.value.trim();

  if (msgEmpty(username)) {
    mostrarError(nameInput, "Es necesario completar con un nombre")
  } else if (!msgMissingElements(username.length, minlength, maxlength)) {
    mostrarError(nameInput, `Debe tener entre ${minlength} y ${maxlength} caracteres`);
  } else {
    mostrarCorrecto(nameInput);
    valid = true;
  }
  return valid;
};

//chequeo la contraseña ingresada
const checkPassword = () => {
  let valid = false;

  const password = passwordInput.value.trim();
  if (msgEmpty(password)) {
    mostrarError(passwordInput, "Es necesario que ingrese una contraseña");
  } else if (!passwordValid(password)) {
    mostrarError(passwordInput, "Debe contener al menos 6 caracteres, mayusculas y minusculas");
  } else {
    mostrarCorrecto(passwordInput);
    valid = true;
  }
  return valid;
};

//chequeo el mail ingresado
const checkEmail = () => {
  let valid = false;

  const valueEmail = emailInput.value.trim();

  if (msgEmpty(emailInput)) {
    mostrarError(emailInput, "Es necesario completar con un Email");
  } else if (!emailValid(valueEmail)) {
    mostrarError(emailInput, "El mail ingresado no es valido");
  } else {
    mostrarCorrecto(emailInput);
    valid = true;
  }
  return valid;
};

const msgEmpty = (value) => value === "";

const msgMissingElements = (length, minlength, maxlength) => {
 return length < minlength || length > maxlength ? 
 false : true;
};

const emailValid = (email) => {
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

 return re.test(email);
};

const passwordValid = (password)  =>  {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-6]).{6,}$/;
	
  return re.test(password);
};

const mostrarError = (input, message) => {
  const input__wrap = input.parentElement ;
  const error = input__wrap.querySelector("small");
  error.textContent = message;
};

const mostrarCorrecto = (input) => {
  const input__wrap = input.parentElement ;
  const error = input__wrap.querySelector("small");
  error.textContent = "";
};


form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkUsername();
  checkPassword();
  checkEmail();
});