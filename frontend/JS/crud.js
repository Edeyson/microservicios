var scoreG = 0;

xCirculo = 1100;

temp = xCirculo;

posCarx = 0;
posCary = 100;
velocidad = 10;

juego = true;

function cronometro() {

    while (juego) {
        document.getElementById("contscore").innerHTML = "Score: ";
        P = document.getElementById("contscore");
        texto = document.createTextNode(scoreG);
        P.appendChild(texto);
        scoreG++;
        Concurrent.Thread.sleep(1000);
    }

}

function moverDibujo() {
    while (juego) {
        xCirculo--;
        temp = xCirculo;
        drawCono();

        Concurrent.Thread.sleep(velocidad);
    }
}


yCirculo = Math.random() * (450 - 0) + 0;
yCirculo2 = Math.random() * (450 - 0) + 0;
yCirculo3 = Math.random() * (450 - 0) + 0;

function drawCono() {

    var canvas = document.getElementById("lienzoCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#6F7073";
    ctx.fill();
    ctx.beginPath();
    ctx.clearRect(temp++, yCirculo, 20, 20);
    ctx.arc(xCirculo, yCirculo, 40, 0, 2 * Math.PI);
    ctx.fillRect(xCirculo, yCirculo, 20, 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.clearRect(temp++, yCirculo2, 20, 20);
    ctx.arc(xCirculo, yCirculo2, 40, 0, 2 * Math.PI);
    ctx.fillRect(xCirculo, yCirculo2, 20, 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.clearRect(temp++, yCirculo3, 20, 20);
    ctx.arc(xCirculo, yCirculo3, 40, 0, 2 * Math.PI);
    ctx.fillRect(xCirculo, yCirculo3, 20, 20);
    ctx.stroke();

    if ((posCarx + 200) >= xCirculo && posCarx <= (xCirculo + 50) && (posCary + 100) >= yCirculo && posCary <= (yCirculo + 50)) {
        juego = false;
    }
    if ((posCarx + 200) >= xCirculo && posCarx <= (xCirculo + 50) && (posCary + 100) >= yCirculo2 && posCary <= (yCirculo2 + 50)) {
        juego = false;
    }
    if ((posCarx + 200) >= xCirculo && posCarx <= (xCirculo + 50) && (posCary + 100) >= yCirculo3 && posCary <= (yCirculo3 + 50)) {
        juego = false;
    }


    posx = 30;
    pos2x = 1170;
    pos3x = 1190;
    for (let i = 0; i < 50; i++) {
        ctx.lineWidth = "10";
        ctx.strokeStyle = "yellow";
        ctx.moveTo((pos2x - posx), 250);
        ctx.lineTo((pos3x - posx), 250);
        ctx.stroke();
        pos2x -= posx;
        pos3x -= posx;
    }



    ctx.closePath();
}

function drawCar() {
    var canvas = document.getElementById("lienzoCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = "./img/carro.png";
    ctx.clearRect(posCarx, posCary, 200, 100);
    ctx.fillStyle = "#6F7073";
    ctx.fill();
    ctx.fillRect(posCarx, posCary, 200, 100);
    ctx.drawImage(img, posCarx, posCary);
}

function recorrer() {
    while (juego) {
        drawCar();
        Concurrent.Thread.sleep(0.5);
    }
}




function StartGame() {
    if (juego) {
        Concurrent.Thread.create(recorrer);
        Concurrent.Thread.create(cronometro);
        Concurrent.Thread.create(moverDibujo);
        document.addEventListener('keydown', (event) => {
            var keyValue = event.key;
            switch (keyValue) {
                case "w":
                    posCary = 50;
                    console.log("arriba");
                    break;
                case "s":
                    posCary = 350;
                    console.log("abajo");
                    break;
                case "d":
                    posCarx += 20;
                    console.log("right");
                    break;
                case "a":
                    posCarx -= 20;
                    console.log("left");
                    break;

                default:
                    break;
            }

        }, false);
    } else {
        guardarJuego();
    }

}

//--------------------------------------------------

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
    var score = scoreG.toString();
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
            json1 = JSON.parse(data);

            console.log(json1);
            document.getElementById("gameList").innerHTML = "";

            section = document.getElementById("gameList");
            section.setAttribute("class", "container  tabla");
            tabla = document.createElement("table");
            tabla.setAttribute("class", "table");
            thead = document.createElement("thead");
            thead.setAttribute("class", "thead-light");
            tr = document.createElement("tr");
            th = document.createElement("th");
            th.setAttribute("scope", "col");
            texto = document.createTextNode("id");
            th.appendChild(texto);
            tr.appendChild(th);
            thead.appendChild(tr)
            tabla.appendChild(thead);
            section.appendChild(tabla);


            section = document.getElementById("gameList");
            th = document.createElement("th");
            th.setAttribute("scope", "col text-center");
            texto = document.createTextNode("score");
            th.appendChild(texto);
            tr.appendChild(th);
            thead.appendChild(tr)
            tabla.appendChild(thead);
            section.appendChild(tabla);

            section = document.getElementById("gameList");
            th = document.createElement("th");
            th.setAttribute("scope", "col text-center");
            texto = document.createTextNode("date");
            th.appendChild(texto);
            tr.appendChild(th);
            thead.appendChild(tr)
            tabla.appendChild(thead);
            section.appendChild(tabla);




            tbody = document.createElement("tbody");


            for (let i = 0; i < json1.length; i++) {

                tr = document.createElement("tr");
                td = document.createElement("td");
                texto = document.createTextNode(json1[i].id);
                td.appendChild(texto);
                tr.appendChild(td);


                td = document.createElement("td");

                texto = document.createTextNode(json1[i].score);
                td.appendChild(texto);
                tr.appendChild(td);



                td = document.createElement("td");

                texto = document.createTextNode(json1[i].date);
                td.appendChild(texto);
                tr.appendChild(td);




                tbody.appendChild(tr)
                tabla.appendChild(tbody);
                section.appendChild(tabla);

            }

        })
        .catch(function(err) {
            console.error(err);
        });
}