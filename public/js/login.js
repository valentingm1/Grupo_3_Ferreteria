window.onload = () => {
  const form = document.getElementById("log-form");

  let register_email = document.getElementById("login-name");
  let register_password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    const errors = [];

    const register_emailValue = register_email.value.trim();
    const register_passwordValue = register_password.value.trim();

    if (register_passwordValue === "") {
      setErrorFor(register_password, "Este campo no puede estar vacío");
      errors.push("Error en password");
      console.log(errors);
      e.preventDefault();
    } else if (register_passwordValue.length < 8) {
      setErrorFor(
        register_password,
        "La contraseña debe tener al menos 8 caracteres y menos de 20"
      );
      errors.push("Error en password(length<8)");
      console.log(errors);
      e.preventDefault();
    } else if (register_passwordValue.length > 20) {
      setErrorFor(register_password, "La contraseña es demasiado larga");
      errors.push("Error en password(length>20)");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(register_password);
      errors.shift();
    }

    if (register_emailValue === "") {
      setErrorFor(register_email, "Este campo no puede estar vacío");
      errors.push("Error en email");
      console.log(errors);
      e.preventDefault();
    } else if (!isEmail(register_emailValue)) {
      setErrorFor(
        register_email,
        "Esto no es un mail! Tecnicamente si pero enrealidad no, para mas informacion: https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico"
      );
      errors.push("Error en email(no paso el test)");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(register_email);
      errors.shift();
    }

    if (errors.length > 0) {
      e.preventDefault();
    }
  });

  function setErrorFor(input, message) {
    const register_control = input.parentElement;
    const small = register_control.querySelector("small");

    small.innerText = message;
    register_control.className = "register_control error";
  }

  function setSuccessFor(input) {
    const register_control = input.parentElement;
    const small = register_control.querySelector("small");
    small.innerText = "";

    register_control.className = "register_control success";
  }

  function isEmail(register_email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      register_email
    );
  }

  register_password.addEventListener("keypress", () => {
    if (register_password.value.length < 7) {
      setErrorFor(
        register_password,
        "La contraseña debe tener al menos 8 caracteres"
      );
    } else if (register_password.value.length > 19) {
      setErrorFor(
        register_password,
        "La contraseña debe tener menos de 20 caracteres"
      );
    } else if (register_password.value.length >= 7 < 20) {
      setSuccessFor(register_password);
    }
  });

  register_email.addEventListener("keypress", () => {
    if (register_email.value === "") {
      setErrorFor(register_email, "Este campo no puede estar vacío");
    } else if (!isEmail(register_email.value)) {
      setErrorFor(register_email, "Introduzca un mail váilido");
    } else {
      setSuccessFor(register_email);
    }
  });

  register_email.addEventListener("change", () => {
    if (register_email.value === "") {
      setErrorFor(register_email, "Este campo no puede estar vacío");
    }
  });
};
