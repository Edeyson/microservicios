function stateUser() {
  var flag = localStorage.getItem("login") ? true : false; //If Ternario ...

  if (flag) document.getElementById("play").href = "game.html";
  else {
    alert("Para jugar debes Iniciar Sesión");
    document.getElementById("play").href = "login.html";
  }
}

function isLogin() {
  var flag = localStorage.getItem("login") ? true : false; //If Ternario ...

  if (flag) {
    document.getElementById("login").setAttribute("hidden", "hidden");
    document.getElementById("register").setAttribute("hidden", "hidden");
    document.getElementById("quit").removeAttribute("hidden");
  } else {
    document.getElementById("login").removeAttribute("hidden");
    document.getElementById("register").removeAttribute("hidden");
    document.getElementById("quit").setAttribute("hidden", "hidden");
  }
}
