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
    var persona2 = JSON.stringify({
        id: document.getElementById("loginCedula").value,
        password: document.getElementById("loginPassword").value,
    });

    var valid = JSON.parse(localStorage.getItem("persona"));

    if (persona2.id == valid.id) {
        console.log("si es!!");
    } else {
        console.log("no es!!");
    }
}