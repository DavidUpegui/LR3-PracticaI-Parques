output("jugadores","jugadoresOutput")
output("fichas","fichasOutput")
var boton = document.getElementById('button')
var t4 = document.getElementById('tablero4')
var t6 = document.getElementById('tablero6')
var tablero
t4.addEventListener('click',cambioTablero4)
t6.addEventListener('click',cambioTablero6)
boton.addEventListener('click',function(){
    if (tablero = 4){
        window.location.href = './tablero4.html'
    }else if(tablero = 6){
        window.location.href = './tablero6.html'
    }
    else{
        console.error();
    }
})


function output(ident,clase){
    let price = document.querySelector('#'+ ident)
    let output = document.querySelector('.'+ clase)

    output.textContent = price.value

    price.addEventListener('input', function() {
     output.textContent = price.value
    });
}

//function cargarTablero(pl){
    //switch(pl){
       // case 4:
           //window.location.href = './tablero4.html'; 
           //break;
        //case 6:
           // window.location.href = './tablero6.html'; 
           //break;
   // } 
//}

function cambioTablero4(){
    tablero = 4
}

function cambioTablero6(){
    tablero = 6
}
