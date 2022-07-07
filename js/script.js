
// class ui_tab{

//     //Creo un div tab con id = tabPoo.className + tab.index... Posibilidad de eliminar el index attribute
//     createHtmlTab(tab){
//         let tabHtml = document.createElement('div');
//         tabHtml.classList.add('tab');
//         tabHtml.classList.add(tab.color);
//         tabHtml.setAttribute('id', tab.tabClass + tab.index);
//         tabHtml.setAttribute('index', tab.index);
//         tabHtml.setAttribute('hold', 'false');
//         tabHtml.addEventListener('click', (evt)=>{
//             let tab  = evt.currentTarget
//             tabSelected(tab);
//         });
//         container.appendChild(tabHtml)
//         return tabHtml;
//     }
// }

// function tabSelected(tab){
//     if(tab.getAttribute('hold') === 'true'){
//         deselect(tab);
//     }else{
//         deselec
        
// function deselect(tab){
//     tab.classList.toggle('blue-tab-hold');
//     tab.setAttribute('hold', 'false');
// }

// function deselectAll(className){
//     let elements = document.getElementsByClassName(className);
//     for(var j = 0; j<elements.length; j++){
//         if(elements[j].getAttribute('hold')  === 'true'){
//             deselect(elements[j]);
//         }
//     }
// }



// Clases para nodos ##################################################################################################################

class Timer{
    static sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class SimpleNode{
    _next;
    
    constructor(){
    }
    set next(nextNode){
        this._next = nextNode;
    } 
    get next(){
        return this._next;
    }
}

class CircularNodeList{
    _first = null;
    _last = null;
    
    constructor(){
    }

    addElement(node){
        if(this.isVoid()){
            this.first = node;
            this.last = node;
            node.next = node;
        }else{
            this.last.next = node;
            node.next = this.first;
            this.last = node;
        }
    }

    isVoid(){
        return this.first === null;
    }

    isEnd(node){
        return node === this.first
    }

    set first(node){
        this._first = node;
    } 
    get first(){
        return this._first;
    }
    set last(node){
        this._last = node;
    } 
    get last(){
        return this._last;
    }
}
// ####################################################################################################################################

class Tab{
    _color;
    _id;
    _currentSquare;
    _state = 'house'; 
    
    constructor(color, i ){
        this._color = color;
        this._id = color + 'Tab' + i
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

class Player{
    _tabsArray;
    _color;
    _name;
    _tabsQuantity;
    _order = null;
    _inHouse = true;

    constructor(color, tabsQuantity){
        this._color = color;
        this._tabsQuantity = tabsQuantity;
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

// CLASES DE CASILLAS #################################################################################################################

class Square extends SimpleNode{
    _color;
    _type;
    _id;
    _tabsInside;


    constructor(color,type){
        super();
        this._color = color;
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
    set id(id){
        this._id = id;
    }
    get id(){
        return this._id;
    }
    set tabsInside(tabsInside){
        this._tabsInside = tabsInside;
    }
    get tabsInside(){
        return this._tabsInside;
    }
}

class SafeOne extends Square{
    constructor(squareColor){
        super(squareColor, 'SeguroUno')
    }

    avalaibleSquares(diceValue){
        let availableSquare = null
        if(diceValue === '5'){                                  // TODO Clave es un valor estatico de los dados
            availableSquare = this.next
        }
        else if(diceValue == '12'){
            availableSquare =  this.next.next;
        }
        return availableSquare;
    }
}

class SafeTwo extends Square{
    constructor(squareColor){
        super(squareColor, 'SeguroDos')
    }

    avalaibleSquares(diceValue){
        let availableSquare = null
        if(diceValue === '5'){                                  // TODO Clave es un valor estatico de los dados
            availableSquare = this.next
        }
        else if(diceValue == '10'){
            availableSquare =  this.next.next;
        }
        return availableSquare;
    }
}

class Exit extends Square{
    constructor(squareColor){
        super(squareColor, 'Salida')
    }

    avalaibleSquares(diceValue){
        let availableSquare = null
        if(diceValue === '7'){                                  // TODO Clave es un valor estatico de los dados
            availableSquare = this.next
        }
        else if(diceValue == '12'){
            availableSquare =  this.next.next;
        }
        return availableSquare;
    }
}
//########################################################################################################################################

class BoardRoad extends CircularNodeList{
    _houseArray;
    
    set houseArray(houseArray){
        this._houseArray = houseArray;
    }
    get houseArray(){
        return this._houseArray;
    }
}

class Turn extends SimpleNode{
    _player;
    _timesThrowed = 0;

    constructor(player){
        super();
        this._player = player;
        
    }

    get player(){
        return this._player;
    }
    set player(player){
        this._player = player;
    }
    get timesThrowed(){
        return this._timesThrowed;
    }
    set timesThrowed(timesThrowed){
        this._player = timesThrowed;
    }
}

class Round extends CircularNodeList{

}

class Game{
    _players;
    _round;
    _boardRoad;
    static _currentTurn;
    static _currentDiceValues;

    constructor(boardSize, playerNumber,tabsNumber){
        this._boardRoad = GameControl.generateBoardRoad(boardSize);  
        this._players = GameControl.generatePlayers(playerNumber, tabsNumber); 
        this._round = GameControl.generateRound(this._players); 
        GameControl.generateTabs(this._players, tabsNumber,this._boardRoad);
    }

    get players(){
        return this._players;
    }
    set players(players){
        this._players = players;
    }get round(){
        return this._round;
    }
    set round(round){
        this._round = round;
    }
    get boardRoad(){
        return this._boardRoad;
    }
    set boardRoad(boardRoad){
        this._boardRoad = boardRoad;
    }
    get currentTurn(){
        return this._currentTurn;
    }
    set currentTurn(currentTurn){
        this._currentTurn = currentTurn;
    }
    get currentDice(){
        return this._currentDice;
    }
    set currentDice(currentDice){
        this._currentDice = currentDice;
    }
}

class GameControl{
    static _colorsArray = ['blue', 'yellow', 'red', 'green','orange','pink'];
    static _currentGame;
    static _tabSelected;
    static _squareSelected; 

    static generateBoardRoad(boardSize){
        let boardRoad = new BoardRoad();
        for( let i = 0; i < boardSize; i++){
            boardRoad.addElement(new SafeOne(GameControl._colorsArray[i]));
            boardRoad.addElement(new Exit(GameControl._colorsArray[i]));
            boardRoad.addElement(new SafeTwo(GameControl._colorsArray[i]));
            }
        GameControl.addHouses(boardRoad);
        return boardRoad
    }

    static addHouses(boardRoad){
        let housesArray = [];
        let houseSquare;
        let q = boardRoad.first;
        let sw = 0;
        while(!boardRoad.isEnd(q) || sw===0){
            sw = 1;
            if (q.type === 'Salida'){
                houseSquare = new Square(q.color, 'House');
                houseSquare.next = q;   
                housesArray.push(houseSquare);   
                q = q.next;
            } else{
                q = q.next;
            }
        }
        boardRoad.houseArray = housesArray;
    }

    static generatePlayers(playerNumber, tabsNumber){
        let player;
        let playersArray = [];
        for(let i = 0; i< playerNumber; i++){
            player = new Player(GameControl._colorsArray[i], tabsNumber);
            playersArray.push(player);
        }
        return playersArray;
    }

    static generateTabs(players, tabsNumber, boardRoad){
        let tab;
        let houseArray = boardRoad.houseArray;
        let arr = [];
        players.forEach(player =>{
            arr = []
            for(let i = 0; i<tabsNumber;i++){
                tab = new Tab(player.color, i);
                tab.currentSquare = tab.color + 'House';
                arr.push(tab);
            }
            player.tabsArray = arr;
            for(let j = 0; j < houseArray.length;j++){
                if (houseArray[j].color === player.color){
                    houseArray[j].tabsInside = arr;
                }
            }
        });
        UiControl.generateTabs(players);
    }

    static generateRound(players){
        let round = new Round();
        let turn;
        players.forEach(player => {
            turn = new Turn(player);
            round.addElement(turn);
        });
        return round;
    }

    static searchTabById(id){
        let playersArr = GameControl._currentGame.players;
        let index = parseInt(id[id.length-1]);
        playersArr.forEach(player =>{
            if (player.tabsArray[index].id === id){
                return player.tabsArray[index];
            }  
        });
    }

    static availableSquares(tab){
        let n1 = Game._currentDiceValues[0];
        let n2 = Game._currentDiceValues[1];
        let squareType = tab.currentSquare.type;
        let availablesSquares = [];
            switch (currentSquareType){
                case 'SeguroUno':
                    if((n1+n2 === 5) || (n1 === 5) || (n2 === 5)){
                        availablesSquares.push(tab.currentSquare.next);
                    }
                    if (n1+n2 === 12){
                        availablesSquares.push(tab.currentSquare.next.next);
                    }
                case 'Salida':
                    if(n1+n2 === 7){
                        availablesSquares.push(tab.currentSquare.next);
                    }
                    if(n1+n2 === 12){
                        availablesSquares.push(tab.currentSquare.next.next);
                    }
                case 'SeguroDos':
                if((n1+n2 === 5) || (n1 === 5) || (n2 === 5)){
                    availablesSquares.push(tab.currentSquare.next);
                }
                if(nT === 10){
                    availablesSquares.push(tab.currentSquare.next.next);
                }
        }
    return availablesSquares;
    }

    static throwDices(){
        let n1 = Math.floor(Math.random() * (7 - 1)) + 1;
        let n2 = Math.floor(Math.random() * (7 - 1)) + 1;
        Game._currentDiceValues = [n1,n2];
    }

    static orderingRound(game){
        let round = game.round;    //! --------Pilas con esto ¿Cuándo es necesario tener variables estáticas?---------
        let turn = game.round.first;
        let sw = 0;
        let turnsOrderedArray = [];
        while(!round.isEnd(turn) || sw == 0){
            sw = 1;
            //*Empieza el turno ----------------------------------------------------------
            Timer.temporizador(20*1000) //TODO hacer esta función
            UiControl.activateBtnDices();
            do{
                await Timer.sleep(1000);
            }while(game._currentDiceValues === 0);
            UiControl.desactivateBtnDices();
            //*Obtener arreglo ordenado: -------------------------------------------------
            if(turnsOrderedArray.length === 0){
                turnsOrderedArray.push([turn, game._currentDiceValues]);
            }
            else{
                let sw2 = 0;
                let i = 0;
                while(sw2 === 0 && i<turnsOrderedArray.length){
                    if(turnsOrderedArray[i]> game._currentDiceValues){
                        sw2 = 1
                    }
                    i++;
                }
                if (sw2 === 0){
                    turnsOrderedArray.push([turn, game._currentDiceValues]);
                }else{
                    turnsOrderedArray.splice(i-1,0,[turn, game._currentDiceValues]);
                }
            }
            turn = turn.next;
            game._currentDiceValues = null;
        }
        //*Ordenar los turnos ------------------------------------------------------------
        round = new round();
        for(i = turnsOrderedArray.length; i>0;i++){
            round.addElement(turnsOrderedArray[i][0]);
        }
        game.round = round;
    }

    static getOutHouse(turn){
        for(let i = 0;i <3;i++){
            Timer.temporizador(20*1000) //TODO hacer esta función
            UiControl.activateBtnDices();
            do{
                await Timer.sleep(1000);
            }while(game._currentDiceValues === 0);
            UiControl.desactivateBtnDices();
            if(game._currentDiceValues[0]=== game._currentDiceValues[1]){
                let tabsArray = turn.player.tabsArray;
                tabsArray.forEach(tab, ()=>{
                    if(tab.state === 'house'){
                        GameControl.moveTab(tab, tab.currentSquare.next);
                    }
                })
                break;
            }else{
                await Timer.sleep(1000);
            }
        }
    }

    static searchTabById(SquareId){
        
    }

    static moveTab(tabUi, squareUi){
        //TODO ---- Cuando sea una ficha que estaba en carcel y se está moviendo a la salida, si hay fichas en la salida, se las come.
        //TODO ----- Comerse las fichas de la casilla a la que se vaya a mover cuando la casilla sea diferente de Seguro.
        let tab = GameControl.searchTabById(tabUi.getAttribute('id'));
        let square = GameControl.searchSquareById(squareUi.getAttribute('id'));
        tab.currentSquare = square;
        square.tabsInside.push(tab);
        UiControl.moveTabUi(tab, square);
    }

    static isDicePar(){
        return game._currentDiceValues[0] === game._currentDiceValues[1];
    }

    static normalTurn(turn){
        Timer.temporizador(5*1000) //TODO hacer esta función, el temporizador funciona para los DADAOS, al finalizar el tiempo los dados se lanzan automáticamente
        UiControl.activateBtnDices();
        do{
            await Timer.sleep(1000);
        }while(game._currentDiceValues === 0);
        UiControl.desactivateBtnDices();
        //verificar si se puede mover algo
        let par = GameControl.isDicePar();
        if(turn.timesThrowed < 3){
            let tabsArray = turn.player.tabsArray;
            let canMove = false;
            for(let i = 0; i<tabsArray.length;i++){
                if (GameControl.availableSquares(tab).length !== 0){ //No hay movimientos posibles
                    canMove = true;
                    break;
                }
            }
            if(canMove){
                Timer.temporzador(20*1000) //TODO----- Temporizador,funciona para el turno, cuando se acabe el tiempo se mueve la primera tab al alcance. ---Hacer función autoLanzar()
                UiControl.avtivateTabs(turn);  //TODO -------------
                //Cuando el usuario clickea una ficha, se muestran las casillas a las que puede moverse, si no hay casillas, no se mueve
                //Cuando se clickea una casilla en la que pueda (y quiera) moverse, finaliza el turno
                //Nota -- Cuando se MUEVE la ficha, hay qu verificar si se come o no fichas.
            }else{
                UiControl.notPossibleMovement()  //TODO---------- Función que muestra en la pantalla que no hay movimientos posibles
            }
            if(GameControl.isDicePar()){
                GameControl.repeatTurn(turn);  //TODO -----------------------------------------------------------
            }else{
                GameControl.endTurn(turn);  //TODO --------------------------------
            }
        }
        GameControl.endTurn()    //TODO ------------- Hacer esta función -------------------

    }

    static repeatTurn(turn){
        Game._currentDiceValues = 0;

    }

    static playTurn(turn){
        let tabsArray = turn.player.tabsArray;
        let inHouse = true;
        for(let i = 0; i<tabsArray.length;i++){
            if(tabsArray[i].state !== 'house'){
                inHouse = false;
            }
        }
        if (inHouse){
            GameControl.getOutHouse(turn); //TODO hacer esta función
        }else{
            GameControl.normalTurn(turn);  //TODO hacer esta función --Nota: si saca par, vuelve a juar
        }
    }

    static startGame(game){
        GameControl.orderingRound();
        game._currentTurn = game.round.first;
        do{
            GameControl.playTurn(game._currentTurn);
            if(GameControl.isDicePar()){
                GameControl.repeatTurn(game.currentTurn);  
            }else{
                GameControl.nextTurn(game.currentTurn); //*Se debe actualizar game.currentTurn dentro de la función
            }
        }while(!GameControl.gameFinished(game)); //TODO ------------------
    }
}

class UiControl{

    static generateBoardRoad(player){
        //TODO pending, es la parte.
    }

    static generateTabs(players){
        let tabsArray;
        let houseSquareUI;
        let tabUI;
        players.forEach(player =>{
            tabsArray = player.tabsArray;
            houseSquareUI = document.getElementById(tabsArray[0].currentSquare.id);
            tabsArray.forEach(tab =>{
                tabUI = document.createElement('div');
                tabUI.setAttribute('pressed', 'false');
                tabUI.setAttribute('id' , tab.id);
                tabUI.classList.add(tab.color + 'Tab');
                tabUI.classList.add('tab');
                houseSquareUI.appendChild(tabUI);
            });
        });
    }

    static uncklickAllTabs(turn){
        let tabs = turn.player.tabsArray;
        let tabUI;
        tabs.forEach(tab =>{
            tabUI = document.getElementById(tab.id);
            if (tabUI.getAttribute('pressed') === 'true'){
                UiControl.uncklickTab(tab);
            }
        });
    }
        
    static uncklickTab(tab){
        let tabUI = document.getElementById(tab.id);
        let availableSquareUI;
        GameControl._tabSelected = null;
        tabUI.classList.remove('tab-clicked');
        tabUI.setAttribute('pressed', 'false');
        let availableSquares = GameControl.availableSquares(tab);
        availableSquares.forEach(square =>{
            let availableSquareUI = document.getElementById(square.id);
            UiControl.showSquare(availableSquareUI);
            UiControl.desactivateSquareUI(tab,availableSquareUI);
        });
    }

    static tabClicked(tabUI){
        GameControl._tabSelected = tabUI;
        let tab = GameControl.searchTabById(tabUI.getAttribute('id'));
        if (tabUI.getAttribute('pressed')=== 'false'){
            uncklickAllTabs(Game._currentTurn);
            let availableSquareUI;
            tabUI.classList.add('tab-clicked');
            tabUI.setAttribute('pressed', 'true');
            let availableSquares = GameControl.availableSquares(tab);
            availableSquares.forEach(square =>{
                availableSquareUI = document.getElementById(square.id);
                UiControl.showSquare(availableSquareUI);
                UiControl.activateSquareUI(tab,availableSquareUI);
            });
        }else{
            UiControl.uncklickTab(tab);
        }
    } 

    static activateBtnDices(){
        let btnDices = document.getElementById('btnDices');
        btnDices.addEventListener('click', function(){GameControl.throwDices()});
        /*
        TODO Adicionar las clases para que el botón se vea activado.
        */
    }

    static desactivateBtnDices(){
        let btnDices = document.getElementById('btnDices');
        btnDices.removeEventListener('click' , function(){GameControl.throwDices()});
        /*
        TODO Remover las clases añadidas para que el botón parezca desactivado.
        */
    }

    static activateTabs(turn){
        let tabsArray = turn.player.tabsArray;
        tabsArray.forEach(tab, ()=>{
            tabUi = document.getElementById(tab.id);
            tabUi.addEventListener('click', EventControl.evtTab);
        });
    }

    static moveTabUi(tab,square){
        let tabUi = document.getElementById(tab.id);
        let square = document.getElementById(square.id);
        square.appendChild(tabUi);
    }

    static activateSquare(square){
        square.addEventListener('click', EventControl.evtSquare);
        //TODO ---- agregar clases para hacer la casilla visible
    }
}

class EventControl{

    static evtLoadGame(boardSize,playerNumber, tabsNumber){
        boardSize = parseInt(document.getElementById('boardSize').getAttribute('text'));
        playerNumber = parseInt(document.getElementById('playerNumber').getAttribute('text'));
        tabsNumber = parseInt(document.getElementById('tabsNumber').getAttribute('text'));
        let game  = new Game(boardSize, playerNumber, tabsNumber);
        this._currentGame = game;
        // *Se abre la nueva ventana.
    }

    static evtDiceButton(){
        GameControl.throwDices();
        // ? ¿Debería desactivar el evento aquí mismo?
    }

    static evtTabs(e){
        GameControl.tabClicked(e);
    }

    static evtSquare(e){
        GameControl.moveTab(GameControl._tabSelected, e.target)
    }
}

console.log(new Game(4,4,4));

