function login(usuario, password, resultado) {
  fetch("http://192.168.1.88:1330/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: usuario,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultado(data);
    })
    .catch((err) => {});
}

function registro(usuario, password, resultado) {
  fetch("http://192.168.1.88:1330/api/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: usuario,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultado(data);
    })
    .catch((err) => {});
}

function hacerRegistro(C1, C2, C3, C4, C5, token, resultado) {
  fetch("http://192.168.1.88:1330/api/altaregistro", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + token,
    },
    body: JSON.stringify({
      c1: C1,
      c2: C2,
      c3: C3,
      c4: C4,
      c5: C5,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultado(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
}

function obtenerUltimoRegistro() {
  fetch("http://192.168.1.88:1330/api/ultimoregistro", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultado(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
}

module.exports.login = login;
module.exports.registro = registro;
module.exports.hacerRegistro = hacerRegistro;
module.exports.obtenerUltimoRegistro = obtenerUltimoRegistro;
