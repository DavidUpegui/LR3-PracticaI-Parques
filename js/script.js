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
    _state = 'house'; 
    
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
    get state(){
        return this._state;
    }
    set state(state){
        this._state  = state;
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

    freeTab(tab){
        Game._currentTurn.player.inHouse = false;
        let salida = tab.currentSquare;
        TabController.moveTab(tab, salida);
    }

    moveTab(tab, square){
        tab.currentSquare = square;
        let tabUI = document.getElementById(tab.id);
        let squareUI = document.getElementById(square.id);
        TabUI.moveTabUI(tabUI,squareUI);
        GameActionsUI.desactivateSquareUI(tab,squareUI);
    }

    static getTabMovements(tab,turn){
        let n1 = turn.diceValues[0];
        let n2 = turn.diceValues[1];
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
        }
    return possibleSquare
    }
}

class TabUI{

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

    static uncklickAllTabs(turn){
        let allTabs = turn.player.allTabs;
        let tab;
        let tabUI;
        for(let i = 0; i< allTabs.length; i++){
            tab = allTabs[i];
            tabUI = document.getElementById(tab.id);
            if(tabUI.getAttribute('pressed')==='true'){
                deslectThisTab(tab,turn);
            } 
        }
    }

    static uncklickTab(tab,turn){
        let tabUI = document.getElementById(tab.id);
        tabUI.classList.remove('tab-clicked');
        tabUI.setAttribute('pressed', 'false');
        let possibleSquare = TabController.getTabMovements(tab, turn);
        let possibleSquareUI = document.getElementById(possibleSquare.id);
        SquareUI.hideSquare(possibleSquareUI);
        GameActionsUI.desactivateSquareUI(tab,possibleSquare);
    }

    static tabClicked(tabUI,turn){
        TabUI.uncklickAllTabs(turn);
        let tab = searchTabById(tabUI.getAttribute('id'))
        tabUI.classList.add('tab-clicked');
        tabUI.setAttribute('pressed', 'true');
        let possibleSquare = TabController.getTabMovements(tab, turn);
        let possibleSquareUI = document.getElementById(possibleSquare.id);
        SquareUI.showSquare(possibleSquareUI);
        GameActionsUI.activateSquareUI(tab,possibleSquare);
    }

    static moveTabUI(tabUI, squareUI){
        squareUI.appendChild(tabUI);
    }
}

class Player{
    _tabsArray;
    _color;
    _name;
    _tabsQuantity;
    _order = null;
    _inHouse = true;

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
    get inHouse(){
        return this._inHouse;
    }
    set inHouse(inHouse){
        this._inHouse = inHouse;
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

class SquareUI{
    static showSquare(SquareUI){
        SquareUI.classList.add('movable-square');
    }

    static hideSquare(squareUI){
        squareUI.classList.remove('movable-square');
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
    totalDiceValue(){
        return this.diceValues[0] + this.diceValues[1];
    }
    isPar(){
        return this.diceValues[0] === this.diceValues[1];
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
    
    static startTurn(turn){
        Game._currentTurn = turn;
        setTimeout(function(){TurnController.endTurn(turn)}, 20*1000);
        if(turn.player.inHouse){
            let tabArray = turn.player.tabsArray;
            for(let i = 0; i<3; i++){
                GameActionsUI.activateBtnDice();
                if(turn.isPar()){
                    for(let j = 0;j<tabArray.length;j++){
                        freeTab(tabArray[j]);
                    }
                }
            }
        }else{
            GameActionsUI.activateBtnDice(turn);
            GameActionsUI.activateTabsUI(turn); // *Podría gestionar el activateTabsUI para que se ejecute después de tirar los dados, es decir, en el      método throwDices()

        }
    }

    static endTurn(turn){
        TabUI.unclickAllTabs(turn);
        GameActionsUI.desactivateTabsUI(turn);
        turn = turn.nextTurn;
        this.startTurn(turn);

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
    endRound(turn){
        return turn === this.firstTurn;
    }
    clear(){
        this.firstTurn = null;
        this.lastTurn = null
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
        let turnsArr = [];
        for(let i = 0; i< players.length; i++){
            turn = new Turn(players[i]);
            turnsArr.push(turn);
            round.addTurn(turn);
        }
        round._turns = turnsArr;
        return round;
    }
}

class UtilFunctions{

}

class Game{
    static _game;
    static _currentTurn;
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
        game._game = game;
        return game;
        //Métodos UI
    }

    starGame(game){
        GameActions.chooseOrder(game); //ronda para elegir el orden.
        let turn = game.round.firstTurn;
        while(!game.isFinished){  //Mientras el juego no esté terminado
            TurnController.startTurn(turn);
            TurnController.endTurn(turn);
            //TODO Actualizar condición de victoria.
        }
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

    static throwDados(){
        let n1 = Math.floor(Math.random() * (7 - 1)) + 1;
        let n2 = Math.floor(Math.random() * (7 - 1)) + 1;
        Game.currentTurn.diceValues = [n1,n2];
        GameActionsUI.activateTabsUI;
        GameActionsUI.desactivateBtnDice();
    }

    static sortTurns(turnsArray){
        if(turnsArray.length === 0){
            return [];
        }
        let medium  = Math.floor(turnsArray.length/2);
        let pivot = turnsArray[medium];
        let left = [];
        let right = [];
        for(let i = 0; i< turnsArray.length; i++){
            if(i !== medium){
                if(turnsArray[i].totalDiceValue() > pivot.totalDiceValue()){
                    right.push(turnsArray[i]);
                }
                else{
                    left.push(turnsArray[i]);
                }
            }
        }
        left = this.sortTurns(left);
        right = this.sortTurns(right);
        return left.concat(pivot).concat(right);
    }
    
    static chooseOrder(game){
        let unorderedRound = game.round;
        let turn = unorderedRound.firstTurn;
        let turnsArray = [];
        do{
            GameActionsUI.activateBtnDice(turn);
            turnsArray.push(turn);
            turn = turn.nextTurn;
        }while(unorderedRound.endRound(turn) !== true);
        let orderedArray = this.sortTurns(turnsArray);
        let round = new Round();
        for(let i =  orderedArray.length-1; i>=0;i--){
            round.addTurn(orderedArray[i]);
        }
        game.round = round;
    }

}

class GameActionsUI{
    static _btnDices = document.getElementById('btnDices');

    static activateBtnDice(){
        this._btnDices.addEventListener('click', GameActions.throwDados());
    }

    static desactivateBtnDice(){
        this._btnDices.removeEventListener('click', GameActions.throwDados());
    }

    static activateTabsUI(turn){
        let tabs = turn.player.tabsArray;
        if(!turn.player.inHouse){
            for(i = 0; i<tabs.length;i++){
                document.getElementById(tabs[i].id).addEventListener('click', (e)=>{
                    TabUI.tabClicked(e.currentTarget,turn);
                })
            }
        }
    }

    static desactivateTabsUI(turn){
        let tabs = turn.player.tabsArray;
        let tabUI;
        let tab;
        for(i = 0; i<tabs.length;i++){
            tab = tabs[i];
            tabUI = document.getElementById(tab.id);
            tabUI.removeEventListener('click', (e)=>{
                let t = e.currentTarget;
                TabUI.tabClicked(t,turn);
            })
        }
    }

    static activateSquareUI(tab, squareUI){
        squareUI.addEventListener('click', ()=>{
            TabController.moveTab(tab, squareUI)
        })
    }

    static desactivateSquareUI(tab,squareUI){
        squareUI.removeEventListener('click', ()=>{
            TabController.moveTab(tab, squareUI)
        })
    }
}

console.log('Pasó por acá')
setTimeout(function(){
    console.log('se Hizo el timeout')
},5000);
console.log('Terminó');
//console.log(game.round)

/*
    Hay 3 tipos de turno:
        - Turno para escoger el orden
            - Lanzar dado - Recoger valores - pasar turno.... Luego comparar y terminar ronda. Empieza la otra en orden.
        - Turno para salir de la casa
            - Lanzar dado*3 ---- verificar paridad ----------luego pasar turno 
                                    -if par: sacar fichas(moverlas) - pasar turno
        - Turno para jugar normal
            - Lanzar dado - activar fichas - chance para mover las fichas a donde se quiera
                                                -Si se mueven = pasar turno

    siempre que se mueven las fichaas, se pasa el turno
*/

/*
Activo el evento de los dados.
Espero a que se clickeen los dados para volver a tirar los dados
*/