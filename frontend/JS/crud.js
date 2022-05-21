function registrar() {
    console.log(document.getElementById("id").value, document.getElementById("name").value, document.getElementById("password").value);
    var request = new Request('https://localhost:44339/api/Values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(document.getElementById("id").value),
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
            age: parseInt(document.getElementById("age").value)
        })

    });
    fetch(request)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            alert(data);

        })
        .catch(function(err) {
            console.error(err);
        });
}


function loggin() {
    var idLogin = document.getElementById("loginCedula").value;
    var passwordLogin = document.getElementById("loginPassword").value;
    var request = new Request('https://localhost:44339/api/Values/' + idLogin + "/" + passwordLogin, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    });
    fetch(request)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            alert(data);
            json1 = JSON.parse(data);

            console.log(json1);

            if (json1) {
                console.log(json1);
                persona = {
                    "id": idLogin,
                    "pass": passwordLogin,
                    "rol": json1[0].rol
                }
                personaSave = JSON.stringify(persona);

                localStorage.setItem("login", personaSave);
            }

        })
        .catch(function(err) {
            console.error(err);
        });
}


function logout() {
    localStorage.removeItem("login");
}



function guardarJuego() {
    /*Falta el hilo del tiempo*/
    var score = '12:30';
    console.log(JSON.parse(localStorage.getItem("login")).id);
    var request = new Request('https://localhost:44339/api/ValuesController_game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            date: new Date().toDateString(),
            id_player: parseInt(JSON.parse(localStorage.getItem("login")).id)
        })

    });
    fetch(request)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            alert(data);

        })
        .catch(function(err) {
            console.error(err);
        });
}


function listarJuegos() {
    var route = 'https://localhost:44339/api/ValuesController_game/' + parseInt(JSON.parse(localStorage.getItem("login")).id);
    console.log(route);
    var request = new Request(route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    });
    fetch(request)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            alert(data);
            json1 = JSON.parse(data);

            console.log(json1);

        })
        .catch(function(err) {
            console.error(err);
        });
}