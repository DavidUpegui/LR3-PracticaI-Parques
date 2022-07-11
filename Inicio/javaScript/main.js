output("jugadores","jugadoresOutput")
output("fichas","fichasOutput")

function output(ident,clase){
    let price = document.querySelector('#'+ ident)
    let output = document.querySelector('.'+ clase)

    output.textContent = price.value

    price.addEventListener('input', function() {
    output.textContent = price.value
    });
}