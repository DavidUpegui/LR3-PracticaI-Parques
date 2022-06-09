/*
class ui_tab{

    //Creo un div tab con id = tabPoo.className + tab.index... Posibilidad de eliminar el index attribute
    createHtmlTab(tab){
        let tabHtml = document.createElement('div');
        tabHtml.classList.add('tab');
        tabHtml.classList.add(tab.color);
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



class Tab{
    _color;
    _id;
    _currentSquare; 
    
    constructor(color){
        this._color = color;
    }

    get color(){
        return this._color;
    }
    get id(){
        return this._id;
    }
    get currentSquare(){
        return this._currentSquare;
    }
    /**
     * @param {string} color;
     */
    set color(color){
        this._color = color;
    }
        /**
     * @param {string} id;
     */
    set id(id){
        this._id = id;
    }
        /**
     * @param {Casilla} currentSquare;
     */
    set currentSquare(currentSquare){
        this._currentSquare = currentSquare;
    }
}

class TabController{

        /**
     * @param {Player} p;
     * @param {Recorrido} r;
     */
    generatePlayerTabs(p, r){
        let tab;
        let recorridoController = new RecorridoController();
        let arr = []
        for(let i = 0; i< p.tabsQuantity; i++){
            tab = new Tab(p.color);
            tab.currentSquare = recorridoController.getHouse(r, tab.color);
            tab.id = tab.color+ 'Tab' + i;
            arr.push(tab);
        }
        p.tabsArray = arr;
        return arr;
    }

    /**
     * @param {Player[]} pA;
     * @param {Recorrido} r;
     */
    generateAllTabs(pA, r){
        let arr = [];
        let playerTabs;
        for(let i = 0; i < pA.length ;i++){
            playerTabs = this.generatePlayerTabs(pA[i], r);
            arr.push(playerTabs);
        }
        return arr;
    }

    isInHouse(tab){
        return tab.currentSquare.type === 'House';
    }

    searchTabById(id,game){
        let playersArray = game.players;
        let player;
        let index = parseInt(id[id.length-1]);
        for (let i = 0; i < playersArray.length ; i++){
            player = playersArray[i];
            player.tabsArray[index]  if (player.tabsArray[index].id === id){
                return player.tabsArray[index];
            }  
        }
    }
}
class Player{
    _tabsArray;
    _color;
    _name;
    _tabsQuantity;

    constructor(color, tabsQuantity){
        this._color = color;
        this,this._tabsQuantity = tabsQuantity;
    }
    get tabsArray(){
        return this._tabsArray;
    }
    /**
     * @param {Tab[]} tabs;
     */
    set tabsArray(tabs){
        this._tabsArray = tabs;
    }
    get tabsQuantity(){
        return this._tabsQuantity;
    }
    /**
     * @param {Int} tabsQuantity;
     */
    set tabsQuantity(tabsQuantity){
        this._tabsQuantity = tabsQuantity;
    }
    get color(){
        return this._color;
    }
    /**
     * @param {string} color;
     */
    set color(color){
        this._color = color;
    }
    get name(){
        return this._name;
    }
    /**
     * @param {string} name;
     */
    set name(name){
        this._name = name;
    }
}

class PlayerController{

    /**
     * @param {Int} nPlayers;
     * @param {Int} nTabs;
     */
    generatePlayers(nPlayers, nTabs){
        let player;
        
        let playersArray = []
        for(let i = 0; i<= nPlayers-1; i++){
            player = new Player(GameController.colorsArray()[i], nTabs);
            playersArray.push(player);
        }
        return playersArray;
    }
}

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
        /**
     * @param {string} color;
     */
    set color(color){
        this._color = color;
    }
    get type(){
        return this._type;
    }
    /**
     * @param {string} type;
     */
    set type(type){
        this._type = type;
    }
    get id(){
        return this._id;
    }
    /**
     * @param {string} id;
     */
    set id(id){
        this._id = id;
    }
    get fichasDentro(){
        return this._fichasDentro;
    }
    /**
     * @param {Tab[]} fichasDentro;
     */
    set fichasDentro(fichasDentro){
        this._fichasDentro = fichasDentro;
    }
    get siguienteCasilla(){
        return this._siguienteCasilla
    }
    /**
     * @param {Casilla} siguienteCasilla;
     */
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

class Recorrido{
    _primero = null;
    _ultimo = null;
    _houseArray;

    constructor(){
    }

    /**
     * @param {Casilla} casilla;
     */
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
    /**
     * @param {Casilla} casilla;
     */
    finDeRecorrido(casilla){
        return casilla === this.primero;
    }
    /**
     * @param {Casilla} primero;
     */
    set primero(primero){
        this._primero = primero
    }
    /**
     * @param {Casilla} ultimo;
     */
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
    /**
     * @param {Casilla[]} houseArray;
     */
    set houseArray(houseArray){
        this._houseArray = houseArray;
    }
}

class RecorridoController{

    /**
     * 
     * @param {Int} boardSize 
     * @returns Recorrido
     */
    generateRecorrido(boardSize){
        let recorrido = new Recorrido();
        for( let i = 0; i < boardSize; i++){
            recorrido.agregarCasilla(new SeguroUno(GameController.colorsArray()[i]));
            recorrido.agregarCasilla(new Salida(GameController.colorsArray()[i]));
            recorrido.agregarCasilla(new SeguroDos(GameController.colorsArray()[i]));
            }
        this.addHouses(recorrido);
        return recorrido
    }

    /**
     * 
     * @param {Recorrido} recorrido 
     */
    addHouses(recorrido){
        let housesArray = [];
        let houseSquare;
        let q = recorrido.primero.siguienteCasilla;
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
        for(let i = 0; i<= houseArray.length-1; i++){
            if (houseArray[i].color === color){
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

class Round{
    _turns;
    _firstTurn;
    _lastTurn;

    get firstTurn(){
        return this._firstTurn
    }
    set firstTurn(firstTurn){
        this._firstTurn = firstTurn;
    }
    get lastTurn(){
        return this._lastTurn
    }
    set lastTurn(lastTurn){
        this._lastTurn = lastTurn;
    }
    get turns(){
        return this._turns
    }
    set turns(turns){
        this._turns = turns;
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

    //Turnos especiales:


}

class Game{
    _players;
    _route;

    constructor(players, route){
        this._players = players;
        this._route = route;
    }
    get players(){
        return this._players;
    }
    set players(players){
        this._players = this.players;
    }
    get route(){
        return this._route;
    }
    set route(route){
        this._route = this.route;
    }
}
class GameController{
    _routController = new RecorridoController();
    _tabController = new TabController();
    _playerController = new PlayerController();

    constructor(){}
    /**
     * 
     * @returns 
     */
    static colorsArray(){
        return ['blue', 'yellow', 'red', 'green','orange','pink'];
    }
    /**
     * 
     * @param {Int} pN 
     * @param {Int} tN 
     * @param {Int} bS 
     */
    startGame(pN, tN, bS){
        let route = this.routController.generateRecorrido(bS);
        let players = this.playerController.generatePlayers(pN,tN);
        let allTabs = this.tabController.generateAllTabs(players, route);
        let game = new Game(players,route)
        return game;
        //Métodos UI
    }

    get routController(){
        return this._routController;
    }
    set routController(routController){
        this._routController = routController;
    }
    get tabController(){
        return this._tabController;
    }get players(){
        return this._players;
    }
    set players(players){
        this._players = this.players;
    }
    get playerController(){
        return this._playerController;
    }
    set playerController(playerController){
        this._playerController = playerController;
    }
}
let tabController = new TabController();
let gameController = new GameController();
let game = gameController.startGame(4,4,4);
console.log(tabController.searchTabById('blueTab0', game));
/* 
var arrayTabs = tabController.generateTabs(player, recorrido); 
console.log(arrayTabs);
console.log(recorridoControler.getHouse(recorrido,'blue'));
*/







/*
function tabSelected(tab){
    if(tab.getAttribute('hold') === 'true'){
        deselect(tab);
    }else{
        deselecswitch (currentSquareType){
                case 'SeguroUno':
                    if((nT === 5) || (n1 === 5) || (n2 === 5)){
                        return tab.currentSquare.siguienteCasilla
                    } else if (nT === 12){
                        return tab.currentSquare.siguienteCasilla.siguienteCasilla
                    }
                case 'Salida':
                    if(n1+n2 === 7){
                        return tab.currentSquare.siguienteCasilla;
                    } else if(n1+n2 === 12){
                        return tab.currentSquare,siguienteCasilla.siguienteCasilla;
                    }
                case 'SeguroDos':
                if((nT === 5) || (n1 === 5) || (n2 === 5)){
                    return tab.currentSquare.siguienteCasilla;
                } else if(nT === 10){
                    return tab.currentSquare.siguienteCasilla.siguienteCasilla;
                }
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




//Qué hay qué hacer

//Empieza el juego

//PENDIENTE: ASIGNAR TURNOS