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

function tabSelected(tab){
    if(tab.getAttribute('hold') === 'true'){
        deselect(tab);
    }else{
        deselec
        
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

class LSLCNC{
    _first;
    _last;

    isVoid(){
        return this.priero === null;
    }
    endRoute(node){
        return node.nextNode === this.first;
    }
    addNode(node){
        if(this.isVoid()){
            this.first = node;
            this.last = node;
            node.nextNode = node;
        }else{
            this.last.next = node;
            node.nextNode = this.first;
            this.last = node;
        } 
    }

    get first(){
        return this._first;
    }
    set first(first){
        this._first ) first;
    }
    get last(){
        return this._last;
    }
    set last(last){
        this._last = last;
    }
}

class Node{
    _nextNode;
    _value

    get nextNode(){
        return this._nextNode;
    }
    set nextNode(nextNode){
        this._nextNode ) nextNode;
    }
    get value(){
        return this._value;
    }
    set value(value){
        this._value = value;
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
     * @param {Route} r;
     */
    generatePlayerTabs(p, r){
        let tab;
        let recorridoController = new RouteController();
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
     * @param {Route} r;
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
            if (player.tabsArray[index].id === id){
                return player.tabsArray[index];
            }  
        }
    }

    static getTabMovements(tab,diceValues){
        let n1 = diceValues[0];
        let n2 = diceValues[1];
        let currentSquareType = tab.currentSquare.type;
        let possibleSquare;
        switch (currentSquareType){
            case 'SeguroUno':
                if((n1+n2 === 5) || (n1 === 5) || (n2 === 5)){
                    possibleSquare =  tab.currentSquare.siguienteCasilla;
                } else if (n1+n2 === 12){
                    possibleSquare = tab.currentSquare.siguienteCasilla.siguienteCasilla;
                }
            case 'Salida':
                if(n1+n2 === 7){
                    possibleSquare = tab.currentSquare.siguienteCasilla;
                } else if(n1+n2 === 12){
                    possibleSquare = tab.currentSquare,siguienteCasilla.siguienteCasilla;
                }
            case 'SeguroDos':
            if((n1+n2 === 5) || (n1 === 5) || (n2 === 5)){
                possibleSquare = tab.currentSquare.siguienteCasilla;
            } else if(nT === 10){
                possibleSquare = tab.currentSquare.siguienteCasilla.siguienteCasilla;
            }
            preSelectedSquare(possibleSquare); //this is a UI method
            return possibleSquare
        }
    }
}
class TabUI{

    uncklickAllTabs(turn){
        let allTabs = turn.player.allTabs;
        let tab;
        let tabUI;
        for(let i = 0; i< allTabs.length; i++){
            tab = allTabs[i];
            tabUI = document.getElementById(tab.id);
            if(tabUI.getAttribute('pressed')==='false'){
                deslectThisTab(tab);
            } 
        }
    }
    
    static createTabsUI(game){
        let container = document.getElementById('parent');
        console.log(container);
        let tabHtml;
        let tab;
        let allTabs = game.allTabs;
        for(let i = 0; i<allTabs.length ; i++ ){
            for(let j = 0; j<allTabs[0].length;j++){
                tab = allTabs[i][j];
                tabHtml = document.createElement('div');
                tabHtml.classList.add('tab');
                tabHtml.classList.add(tab.color);
                tabHtml.setAttribute('id', tab.tabClass + tab.index);
                tabHtml.setAttribute('pressed', 'false');
                container.appendChild(tabHtml);
            }
        }
    }

    static tabClicked(tabUI,turn){
        this.uncklickAllTabs(turn);
        let tab = searchTabById(tabUI.getAttribute('id'))
        tabUI.classList.toggle('tab-clicked');
        tabUI.setAttribute('pressed', 'true');
        let possibleSquare = TabController.getTabMovements(tab, turn.diceValues);
        possibleSquareUI = document.getElementById(possibleSquare.id);
        squareUI.showPossibleSquare(possibleSquareUI);
    }
}

class Player{
    _tabsArray;
    _color;
    _name;
    _tabsQuantity;
    _order;

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
    get order(){
        return this._order;
    }
    /**
     * @param {Int} order;
     */
    set order(order){
        this._order = order;
    }
}
class PlayerController{

    /**
     * @param {Int} nPlayers;
     * @param {Int} nTabs;
     */
    generatePlayers(nPlayers, nTabs){
        let player;
        
        let playersArray = [];
        for(let i = 0; i<= nPlayers-1; i++){
            player = new Player(GameController.colorsArray()[i], nTabs);
            player.order = i;
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

class Route{
    _primero = null;
    _ultimo = null;
    _houseArray;

    constructor(){
    }

    /**
     * @param {Casilla} casilla;
     */
    addSquare(casilla){
        if(this.isVoid()){
            this.primero = casilla;
            this.ultimo = casilla;
            casilla.siguienteCasilla = casilla;
        }else{
            this.ultimo.siguienteCasilla = casilla;
            casilla.siguienteCasilla = this.primero;
            this.ultimo = casilla;
        }
    }

    isVoid(){
        return this._primero === null;
    }
    /**
     * @param {Casilla} casilla;
     */
    endRoute(casilla){
        return casilla.siguienteCasilla === this.primero;
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
class RouteController{

    /**
     * 
     * @param {Int} boardSize 
     * @returns Route
     */
    generateRoute(boardSize){
        let recorrido = new Route();
        for( let i = 0; i < boardSize; i++){
            recorrido.addSquare(new SeguroUno(GameController.colorsArray()[i]));
            recorrido.addSquare(new Salida(GameController.colorsArray()[i]));
            recorrido.addSquare(new SeguroDos(GameController.colorsArray()[i]));
            }
        this.addHouses(recorrido);
        return recorrido
    }

    /**
     * 
     * @param {Route} recorrido 
     */
    addHouses(recorrido){
        let housesArray = [];
        let houseSquare;
        let q = recorrido.primero;
        while(!recorrido.endRoute(q)){
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
    _diceValues;
    
    constructor(player){
        this._player = player;
    }
    set nextTurn(nextTurn){
        this._nextTurn = nextTurn;
    }
    get nextTurn(){
        return this._nextTurn;
    }
    set player(player){
        this._player = player;
    }
    get player(){
        return this._player;
    }
    set diceValues(diceValues){
        this._diceValues = diceValues;
    }
    get diceValues(){
        return this._diceValues;
    }
}
class TurnController{
    
    startTurn(turn){
        /*
        - Alumbra el jugador (demora un opoquito incluso);
        */
       GameActionsUI.activateBtnDice();
       /*
        - Agrega evento a las tabs que se decidan
        - Al clickear las tabs se llama a getTabMovement
        - 
        */
        
        while(!endTurn()){

        }



    }

}

class Round{
    _turns;
    _firstTurn = null;
    _lastTurn = null;

    addTurn(turn){
        if(this.isVoid()){
            this.firstTurn = turn;
            this.lastTurn = turn;
            turn.nextTurn = turn;
        }else{
            this.lastTurn.nextTurn = turn;
            turn.nextTurn = this.firstTurn;
            this.lastTurn = turn;
        } 
    }
    isVoid(){
        return this.firstTurn === null;
    }
    endRoute(turn){
        return turn.nextTurn === this.primero;
    }

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
class RoundController{

    generateRound(players){
        let round = new Round();
        let turn;
        let turnsArr = []
        for(let i = 0; i< players.length; i++){
            turn = new Turn(players[i]);
            turnsArr.push(turn);
            round.addTurn(turn);
        }
        round._turns = turnsArr;
        return round;
    }

    chooseTurnOrder(round){
        turn = round.firstTurn
        startTurn(turn);
        let total  =numbers[0] + numbers[1];

        //Debe hacer un turno
    }
}

class Game{
    _players;
    _route;
    _round;
    _allTabs;

    constructor(players, route,round, allTabs){
        this._players = players;
        this._route = route;
        this._round = round;
        this._allTabs = allTabs;
    }
    get players(){
        return this._players;
    }
    set players(players){
        this._players = players;
    }
    get route(){
        return this._route;
    }
    set route(route){
        this._route = route;
    }
    get round(){
        return this._round;
    }
    set round(round){
        this._round = round;
    }
    get allTabs(){
        return this._allTabs;
    }
    set allTabs(allTabs){
        this._allTabs = allTabs;
    }
}
class GameController{
    _routController = new RouteController();
    _tabController = new TabController();
    _playerController = new PlayerController();
    _roundController = new RoundController();
    _turnController = new TurnController();

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
    initalizeGame(pN, tN, bS){
        let route = this.routController.generateRoute(bS);
        let players = this.playerController.generatePlayers(pN,tN);
        let allTabs = this.tabController.generateAllTabs(players, route);
        let round = this.roundController.generateRound(players);
        let game = new Game(players,route, round, allTabs);
        return game;
        //Métodos UI
    }

    starGame(game){
        let turn = game.round.primero;
        this.roundController.chooseTurnOrder();
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
    get roundController(){
        return this._roundController;
    }
    set roundController(roundController){
        this._roundController = roundController;
    }
}

class GameActions{

    static throwDados(turn){
        let n1 = Math.floor(Math.random() * (7 - 1)) + 1;
        let n2 = Math.floor(Math.random() * (7 - 1)) + 1;
        turn.diceValues = [n1,n2];
    }

    static makeTurn(turn){
        let numbers = this.throwDados()
        /*
        - Add event listener to the tabs of the player of turn.player.tabsArray
        - When clicked a tab, star the selectedTab() function, it shows the possible
        movements with getPossibleMovements()
        - getPossibleMovements must activate the eventListener in the square
        */
        moveTab(tab)
    }

    static selectTab(tab){
        this.getPossibleMovements(tab)

    }

    static makeFirstTurn(turn){
        let numbers = this.throwDados();
        let total = numbers[0] + numbers[1];
    }
}

class GameActionsUI{
    static _btnDices = document.getElementById('btnDices');

    static activateBtnDice(turn){
        this._btnDices.addEventListener('click', GameActions.throwDados(turn));
    }

    static desactivateBtnDice(turn){
        this._btnDices.removeEventListener('click', GameActions.throwDados(turn));
    }

    static activateTabs(turn){
        let tabs = turn.player.tabsArray;
        let tabUI;
        let tab;
        for(i = 0; i<tabs.length;i++){
            tab = tabs[i];
            tabUI = document.getElementById(tab.id);
            tabUI.addEventListener('click', (e)=>{
                let t = e.currentTarget;
                TabUI.tabClicked(t,turn);
            })
        }
    }
}

let gameCon = new GameController();
let game = gameCon.initalizeGame(4,4,4);
TabUI.createTabsUI(game);

