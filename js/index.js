function evt(e){
    e.preventDefault()
    let boardSize;
    let sessionStorage = window.sessionStorage;
    let btnGroup = document.getElementsByName('tamañoTablero');
    let playerNumber = document.getElementById('playerNumber').value;
    let tabsNumber = document.getElementById('tabsNumber').value;
    for(let i = 0; i<btnGroup.length;i++){
        if(btnGroup[i].checked){
            boardSize = btnGroup[i].getAttribute('value');
            break;
        }
    }
    sessionStorage.setItem('boardSize', boardSize);
    sessionStorage.setItem('playerNumber', playerNumber);
    sessionStorage.setItem('tabsNumber', tabsNumber);
    if(boardSize === '4'){
        window.open('../tablero4.html','_self');
    }else{
        window.open('../tablero6.html','_self');
    }
}

document.getElementById('btnSubmit').addEventListener('click', evt)