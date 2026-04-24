function getNextPasswordFieldType(currentType) {
  return currentType === "password" ? "text" : "password";
}

function validateLoginFields(usuario, password) {
  const normalizedUser = String(usuario || "").trim();
  const normalizedPassword = String(password || "").trim();

  const errors = {
    usuario: "",
    password: "",
  };

  if (!normalizedUser) {
    errors.usuario = "El usuario es requerido";
  }

  if (!normalizedPassword) {
    errors.password = "La contrasena es requerida";
  }

  return {
    isValid: !errors.usuario && !errors.password,
    errors,
  };
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const togglePass = document.getElementById("togglePass");
    const eyeIcon = document.getElementById("eyeIcon");
    const passwordInput = document.getElementById("password");
    const alertError = document.getElementById("alertError");
    const btnSubmit = document.getElementById("btnSubmit");

    if (togglePass && passwordInput) {
      togglePass.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = getNextPasswordFieldType(passwordInput.type);
        eyeIcon.innerHTML = isPassword
          ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
          : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        const groupUsuario = document.getElementById("group-usuario");
        const groupPassword = document.getElementById("group-password");
        const errorUsuario = document.getElementById("error-usuario");
        const errorPassword = document.getElementById("error-password");

        const validationResult = validateLoginFields(usuario, password);

        groupUsuario.classList.remove("has-error");
        groupPassword.classList.remove("has-error");
        errorUsuario.textContent = "";
        errorPassword.textContent = "";
        alertError.classList.remove("visible");

        if (!validationResult.isValid) {
          if (validationResult.errors.usuario) {
            groupUsuario.classList.add("has-error");
            errorUsuario.textContent = validationResult.errors.usuario;
          }

          if (validationResult.errors.password) {
            groupPassword.classList.add("has-error");
            errorPassword.textContent = validationResult.errors.password;
          }
          return;
        }

        btnSubmit.classList.add("loading");
        btnSubmit.disabled = true;

        setTimeout(function () {
          btnSubmit.classList.remove("loading");
          btnSubmit.disabled = false;
          console.log("Login exitoso");
        }, 1500);
      });
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getNextPasswordFieldType,
    validateLoginFields,
  };
}
