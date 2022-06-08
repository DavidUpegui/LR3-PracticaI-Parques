/*
class ui_tab{

    //Creo un div tab con id = tabPoo.className + tab.index... Posibilidad de eliminar el index attribute
    createHtmlTab(tab){
        let tabHtml = document.createElement('div');
        tabHtml.classList.add('tab');
        tabHtml.classList.add(tab.tabColor);
        tabHtml.setAttribute('id', tab.tabClass + tab.index);
        tabHtml.setAttribute('index', tab.index);
        tabHtml.setAttribute('hold', 'false');
        tabHtml.addEventListener('click', (evt)=>{
            let tab  = evt.currentTarget
            tabSelected(tab);
        });
        container.appendChild(tabHtml)
        return tabHtml;
    }
}
*/

// Clase Ficha
class Tab{
    _tabColor;
    _tabId;
    _tabIndex;
    _currentSquare; 
    
    
    constructor(tabColor, tabIndex){
        this._tabColor = tabColor;
        this._tabIndex = tabIndex;
        this._tabId = tabColor +'Tab'+ tabIndex;
    }

    get tabColor(){
        return this._tabColor;
    }

    get tabId(){
        return this._id;
    }

    get tabIndex(){
        return this._tabIndex;
    }

    get currentSquare(){
        return this._currentSquare;
    }

    set currentSquare(currentSquare){
        this._currentSquare = currentSquare;
    }
}

class TabController{

    generateTabs(player, recorrido){
        let tab;
        let recorridoController = new RecorridoController();
        let arr = []
        for(let i = 0; i< player.tabsQuantity; i++){
            tab = new Tab(player.color, i);
            tab.currentSquare = recorridoController.getHouse(recorrido, tab.tabColor);
            arr.push(tab);
        }
        player.tabsArray = arr;
        return arr;
    }
}
class Player{
    _tabsArray;
    _color;
    _name;
    _tabsQuantity;

    constructor(color, tabsQuantity){
        this._color =color;
        this,this._tabsQuantity = tabsQuantity;
    }
    get tabs(){
        return this._tabsArray;
    }
    set tabs(tabs){
        this._tabs = tabs;
    }
    get tabsQuantity(){
        return this._tabsQuantity;
    }
    set tabsQuantity(tabsQuantity){
        this._tabsQuantity = tabsQuantity;
    }
    get color(){
        return this._color;
    }
    set color(color){
        this._color = color;
    }
}
//Clase tablero
class BoardPOO{
    _colors = ['blue', 'yellow', 'red', 'green','orange','pink'];
    _boardSize;
    _nTabs;
    _recorrido;
    _tabsArray;
    _housesArray;

    constructor(boardSize,nTabs){
        this._boardSize = boardSize;
        this._nTabs = nTabs;
        this._recorrido = this.generateRecorrido(boardSize);
        this._tabsArray = this.generateTabs(nTabs, boardSize);
    }

    generateRecorrido(boardSize){
        let recorrido = new Recorrido();
        for( let i = 0; i < boardSize; i++){
            recorrido.agregarCasilla(new SeguroUno(this._colors[i]));
            recorrido.agregarCasilla(new Salida(this._colors[i]));
            recorrido.agregarCasilla(new SeguroDos(this._colors[i]));
            }
        this.addHouses(recorrido);
        return recorrido
    }

    addHouses(recorrido){
        let housesArray = [];
        let houseSquare;
        q = recorrido.primero.siguienteCasilla;
        while(!band){
            if (q.type === 'Salida'){
                houseSquare = new Casilla(q.color, 'House');
                houseSquare._siguienteCasilla = q;
                housesArray.push(houseSquare);
            } else{
                q = q.siguienteCasilla.siguienteCasilla;
            }
        }

    }

    getHouse(color){
        let houseArray = this._housesArray;
        houseArray.forEach(house =>{
            if (house.color === 'color'){
                return house
            }
        })
    }

    generateTabs(nTabs, boardSize){
        let tabsArray = [];
        for(var i = 0; i<boardSize;i++){
            let tabsColorArray = [];
            for(var j = 0;j < nTabs;j++){
                let tab = new Tab(this._colors[i], j);
                tabsColorArray.push(tab);
            }
            tabsArray.push(tabsColorArray);
        }
        return tabsArray;
    }

    get recorrido(){
        return this._recorrido;
    }

    get tabsArray(){
        return this._tabsArray;
    }
}

//Clases para las casillas ---------------------------------------------------------------------
class Casilla{
    _color;
    _type;
    _id;
    _fichasDentro;
    _siguienteCasilla = null;

    constructor(color, type){
        this._color=color;
        this._type = type;
        this._id = color + type;
    }

    get color(){
        return this._color;
    }
    set color(color){
        this._color = color;
    }
    get type(){
        return this._type;
    }

    get id(){
        return this._id;
    }

    get fichasDentro(){
        return this._fichasDentro;
    }

    get siguienteCasilla(){
        return this._siguienteCasilla
    }

    set type(type){
        this._type = type;
    }

    set siguienteCasilla(siguienteCasilla){
        this._siguienteCasilla = siguienteCasilla;
    }
}

class SeguroUno extends Casilla{

    constructor(color){
        super(color, 'SeguroUno');
    }

    casillasDisponibles(){
        if(clave === '5'){
            let casillaDisponible = this.siguienteCasilla;
        }
        else if(clave == '12'){
            let casillaDisponible = this.siguienteCasilla.siguienteCasilla;
        }
        else{
            console.log('Pasa turno.')
        }
    }
}

class SeguroDos extends Casilla{
    _type = 'seguroDos'

    constructor(color){
        super(color, 'SeguroDos');
    }

    casillasDisponibles(){
        if(clave === '5'){
            let casillaDisponible = this.siguienteCasilla;
        }
        else if(clave == '10'){
            let casillaDisponible = this.siguienteCasilla.siguienteCasilla;
        }
        else{
            console.log('Pasa turno.')
        }
    }
}

class Salida extends Casilla{

    constructor(color){
        super(color, 'Salida')
    }
    casillasDisponibles(){
        if(clave === '7'){
            let casillaDisponible = this.siguienteCasilla;
        }
        else if(clave == '12'){
            let casillaDisponible = this.siguienteCasilla.siguienteCasilla;
        }
        else{
            console.log('Pasa turno.')
        }
    }
}

class GameControl{

    allMovTabs(n,player){
        let totalTabs = player.tabs;
        let movableTabs = [];
        totalTabs.forEach( tab => {
            if(this.isMovable(tab,n)){
                movableTabs.push(tab);
            }
        });
        return movableTabs
    }

    isMovable(tab,n){
        let currentSquare = tab.currentSquare;
        switch(tab.currentSquare.type){
            case 'seguroUno':
                if(n === 5 || n == 12){
                    return true;
                }
                break;
            case 'salida':
                if(n === 7 || n == 12){
                    return true;
                }
                break;
            case 'seguroDos':
                if(n === 5 || n == 10){
                    return true;
                }
                break;
            default:
                return false;
        }
    }
}
//Clase Recorrido
class Recorrido{
    _primero = null;
    _ultimo = null;
    _houseArray;

    constructor(){
    }

    agregarCasilla(casilla){
        if(this.esVacia()){
            this.primero = casilla;
            this.ultimo = casilla;
            casilla.siguienteCasilla = casilla;
        }else{
            this.ultimo.siguienteCasilla = casilla;
            casilla.siguienteCasilla = this.primero;
            this.ultimo = casilla;
        }
    }

    esVacia(){
        return this._primero === null;
    }
    finDeRecorrido(casilla){
        return casilla === this.primero;
    }
    set primero(primero){
        this._primero = primero
    }
    set ultimo(ultimo){
        this._ultimo = ultimo;
    }
    get primero(){
        return this._primero;
    }
    get ultimo(){
        return this._ultimo;
    }
    get houseArray(){
        return this._houseArray;
    }
    set houseArray(houseArray){
        this._houseArray = houseArray;
    }
}

class RecorridoController{
    _colors = ['blue', 'yellow', 'red', 'green','orange','pink'];

    generateRecorrido(boardSize){
        let recorrido = new Recorrido();
        for( let i = 0; i < boardSize; i++){
            recorrido.agregarCasilla(new SeguroUno(this._colors[i]));
            recorrido.agregarCasilla(new Salida(this._colors[i]));
            recorrido.agregarCasilla(new SeguroDos(this._colors[i]));
            }
        this.addHouses(recorrido);
        return recorrido
    }

    addHouses(recorrido){
        let housesArray = [];
        let houseSquare;
        let q = recorrido.primero;
        while(!recorrido.finDeRecorrido(q)){
            let qType = q.type;
            if (qType === 'Salida'){
                houseSquare = new Casilla(q.color, 'House');
                houseSquare._siguienteCasilla = q;
                housesArray.push(houseSquare);
                q = q.siguienteCasilla;
            } else{
                q = q.siguienteCasilla;
            }
        }
        recorrido.houseArray = housesArray
    }

    getHouse(recorrido,color){
        let houseArray = recorrido.houseArray;
        console.log(houseArray)
        let comparedColor;
        for(let i = 0; i<= houseArray.length-1; i++){
            comparedColor = houseArray[i].color;
            if (comparedColor === color){
                return houseArray[i];
            }
        }
    }
}

class Turn{
    _player;
    _nextTurn = null;
    _par = 1;
    
    set par(par){
        this._par = par;
    }

    get par(){
        return this._par;
    }

    set player(player){
        this._player = player;
    }

    get player(){
        return this._player;
    }
}

class TurnController{
    _par;

    gameController = new GameControl();

    throwDados(){
        let arr = [];
        //Sacar los números random
        let a = 1;
        let b = 2;

        arr.push(a);
        arr.push(b);
        return arr;
    }

    searchTabById(id, player){
        let index = id[id.length-1]
        return player.tabs[parseInt(index)]
    }

    isPar(n){
        return n[0] === n[1];
    }

    threePar(turn){
        return turn.par === 3;
    }

    tabWon(tab){
        tab.state = 'win';
    }

    makeTurn(turn){
        let values = this.throwDados();
        if(this.isPar(values)){
            turn.par = turn.par + 1;
            if (this.threePar(turn)){
                //Se le activa un eventListener a las tabs que no esten en estado = "win" y que estén en el arreglo del player (Método UI)
                //Un método de UI que permita obtener el id de una ficha clickeada
                let id = 'blueTab0'
                let tab = this.searchTabById(id,player);
                this.tabWon(tab);
                turn.nextTurn();
            } 
            this.makeTurn(turn);
        } else{
            allMovTabs(values[0]+values[1],turn.player);
            //Agregar eventos a las casillas de HTML o retornar allMovaTabs para hacer el proceso en las clases UI
            //También se puede insertar el Método UI directamente acá, haciendo que las clases de Lógica de Negocio sean como **LAS CLASES CREADORAS** 
        }
    }
}

class Game{

    startGame(){
        /*
        EMPIEZA EL JUEGO:
        - Crea las estructuras de datos en el POO
            - Jugadores
            - Fichas
                - Todas las fichas empiezan en la casilla house de su color
                    - La casilla house de cada color está ligada a la casilla salida de cada color
            - Recorrido + casillas
            - Turnos
                - Empieza con un orden default de turnos
        - Crea las estructuras de datos en el DOM
            - Jugadores
            - Fichas
            - Casillas
            - Mapa selecto

            ¿Retorna los turnos en un arreglo?
        */
    }
}

var size = 4;
const recorridoControler = new RecorridoController();
const tabController = new TabController();
const player = new Player('Blue', 4);
var recorrido = recorridoControler.generateRecorrido(size);
console.log(recorridoControler.getHouse('blue'));

console.log(tabController.generateTabs(player,recorrido))








/*
function tabSelected(tab){
    if(tab.getAttribute('hold') === 'true'){
        deselect(tab);
    }else{
        deselectAll('blue-tab');
        select(tab);
    } 
}

function select(tab){
    tab.classList.toggle('blue-tab-hold');
    tab.setAttribute('hold', 'true');
}
function deselect(tab){
    tab.classList.toggle('blue-tab-hold');
    tab.setAttribute('hold', 'false');
}

function deselectAll(className){
    let elements = document.getElementsByClassName(className);
    for(var j = 0; j<elements.length; j++){
        if(elements[j].getAttribute('hold')  === 'true'){
            deselect(elements[j]);
        }
    }
}
*/


