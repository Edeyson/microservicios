cont=0;
xCirculo = 20;

temp=xCirculo;
function moverDibujo()
{
    while(true)
    {
        xCirculo++;
        temp=xCirculo;
        draw();
        Concurrent.Thread.sleep(1000);
        

    }
}
function draw(){
    var canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.clearRect(temp--,20,20,20);
    ctx.arc(xCirculo, 50, 40, 0, 2 * Math.PI);
    ctx.fillRect(xCirculo,20,20,20);
    
    ctx.stroke();
    ctx.closePath();
    
}
function cronometro()
{   
    
     for(;;)
    {
        P = document.getElementById("Proceso1");
        texto = document.createTextNode(cont);
        div=document.createElement('div');
        div.setAttribute('class', 'celda');
        div.appendChild(texto);
        P.appendChild(div);
        cont++;
        Concurrent.Thread.sleep(1000);
    }
    
}
function saludar()
{
     for(;;)
    {
        P = document.getElementById("Proceso2");
        texto = document.createTextNode("hola");
        div=document.createElement('div');
        div.setAttribute('class', 'celda');
        div.appendChild(texto);
        P.appendChild(div);
        Concurrent.Thread.sleep(1000);
    }

        
    
}
function Main()
{
    //Concurrent.Thread.create(cronometro);
   // Concurrent.Thread.create(saludar);
    Concurrent.Thread.create(moverDibujo);
    //setInterval(cronometro,1000);
    //setInterval(saludar, 1000);
}