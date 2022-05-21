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

            if (json1) {
                console.log(json1);
                persona = {
                    "id": idLogin,
                    "pass": passwordLogin
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


function registrar2() {
    var persona = JSON.stringify({
        id: parseInt(document.getElementById("id").value),
        name: document.getElementById("name").value,
        password: document.getElementById("password").value,
    });
    localStorage.setItem("persona", persona);

    console.log(persona);
}

function login() {

}