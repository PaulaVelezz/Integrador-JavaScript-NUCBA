// lógica para el toggle //
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});


// validando formulario para registrarse //

const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//chequeo el nombre de usuario ingresado para registrarse
const checkUsername = () => {
  let valid = false;
  const minlength = 3;
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

//chequeo la contraseña ingresada para registrarse
const checkPassword = () => {
  let valid = false;

  const password = passwordInput.value.trim();
  if (msgEmpty(password)) {
    mostrarError(passwordInput, "Es necesario que ingrese una contraseña");
  } else if (!passwordValid(password)) {
    mostrarError(passwordInput, "Debe contener como mínimo 8 caracteres, un símbolo, un número y una mayúscula");
  } else {
    mostrarCorrecto(passwordInput);
    valid = true;
  }
  return valid;
};

//chequeo el mail ingresado para registrarse
const checkEmail = () => {
  let valid = false;

  const valueEmail = emailInput.value.trim();

  if (msgEmpty(emailInput)) {
    mostrarError(emailInput, "Es necesario completar con un Email");
  } else if (!emailValid(valueEmail)) {
    mostrarError(emailInput, "El mail ingresado no es válido");
  } else {
    mostrarCorrecto(emailInput);
    valid = true;
  }
  return valid;
};

//para testear que lo ingresado sea lo correcto
const msgEmpty = (value) => value === "";

const msgMissingElements = (length, minlength, maxlength) => {
 return length < minlength || length > maxlength ? 
 false : true;
};

const emailValid = (email) => {
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

 return re.test(email);
};

const passwordValid = (password) => {
  const re =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	
  return re.test(password);
};

const mostrarError = (input, message) => {
  const input__wrap = input.parentElement ;
  input__wrap.classList.remove("exito");
  input__wrap.classList.add("error");
  const error = input__wrap.querySelector("small");
  error.textContent = message;
};

const mostrarCorrecto = (input) => {
  const input__wrap = input.parentElement;
  input__wrap.classList.remove("error");
  input__wrap.classList.add("exito");
  const error = input__wrap.querySelector("small");
  error.textContent = "";
};

//para devolverle al usuario en tiempo real feedback
const debounce = (fn, deley = 800) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout (() => {
      fn.apply(null, args);
    }, deley);
  };
};

//la validacion en sí

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let userValid = checkUsername();
  let emailValid = checkEmail();
  let passwordValid = checkPassword();

  let validForm = userValid && emailValid && passwordValid;

  if(validForm) {
    form.submit();
    alert("Creación de cuenta exitosa");
  }
});

form.addEventListener("input", debounce( (e) => {
  switch (e.target.id) {
      case "username":
      checkUsername();
      break;
      case "email":
      checkEmail();
      break;
      case "password":
      checkPassword();
      break;
    }
  })
);


// validando formulario para iniciar sesión //
const formII = document.getElementById("formII");
const nameInputII = document.getElementById("usernameII");
const passwordInputII = document.getElementById("passwordII");

//chequeo el nombre de usuario ingresado para iniciar sesión
const checkUsernameII = () => {
  let valid = false;
  const minlength = 3;
  const maxlength = 12;

  const usernameII = nameInputII.value.trim();

  if (msgEmpty(usernameII)) {
    mostrarError(nameInputII, "Es necesario completar con un nombre")
  } else if (!msgMissingElements(usernameII.length, minlength, maxlength)) {
    mostrarError(nameInputII, `Debe tener entre ${minlength} y ${maxlength} caracteres`);
  } else {
    mostrarCorrecto(nameInputII);
    valid = true;
  }
  return valid;
};

//chequeo la contraseña ingresada para iniciar sesión
const checkPasswordII = () => {
  let valid = false;

  const passwordII = passwordInputII.value.trim();
  if (msgEmpty(passwordII)) {
    mostrarError(passwordInputII, "Es necesario que ingrese una contraseña");
  } else if (!passwordValid(passwordII)) {
    mostrarError(passwordInputII, "Debe contener como mínimo 8 caracteres, un símbolo, un número y una mayúscula");
  } else {
    mostrarCorrecto(passwordInputII);
    valid = true;
  }
  return valid;
};


formII.addEventListener("submit", (e) => {
  e.preventDefault();

  let userValidII = checkUsernameII();
  let passwordValidII = checkPasswordII();

  let validFormII = userValidII && passwordValidII;

  if(validFormII) {
    formII.submit();
    alert("inicio de sesión exitoso");
  }
});

formII.addEventListener("input", debounce( (e) => {
  switch (e.target.id) {
      case "usernameII":
      checkUsernameII();
      break;
      case "passwordII":
      checkPasswordII();
      break;
    }
  })
);


// lógica para el preloader //
const $pre__loader__container = document.getElementById("pre-loader__container");

setTimeout (() => {
  $pre__loader__container.classList.add("close__pre__loader");
  $pre__loader__container.style.display = "none";
}, 3000);