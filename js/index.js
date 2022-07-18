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

function evtRadioButton(e){
    if(e.target && e.target.tagName === 'INPUT'){
        let childNodes = playerNumber.childNodes
        if(e.target.value === '4' && childNodes.length > 10){
            playerNumber.removeChild(option5)
            playerNumber.removeChild(option6);
        }
        if(e.target.value === '6' && childNodes.length < 10){
            playerNumber.appendChild(option5);
            playerNumber.appendChild(option6);
        } 
    }
}
const playerNumber = document.getElementById('playerNumber');
document.getElementById('options').addEventListener('click', evtRadioButton);
document.getElementById('btnSubmit').addEventListener('click', evt);
const option6=document.getElementById('option6');
const option5 = document.getElementById('option5');
playerNumber.removeChild(option6);
playerNumber.removeChild(option5);