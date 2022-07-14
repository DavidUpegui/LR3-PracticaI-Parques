
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
    _finishArray;

    
    set houseArray(houseArray){
        this._houseArray = houseArray;
    }
    get houseArray(){
        return this._houseArray;
    }
    set finishArray(finishArray){
        this._finishArray = finishArray;
    }
    get finishArray(){
        return this._finishArray;
    }
}

class Turn extends SimpleNode{
    _player;
    _timesThrowed = 0;
    _doMovement = false;

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
    get doMovement(){
        return this._doMovement;
    }
    set doMovement(doMovement){
        this._doMovement = doMovement;
    }
}

class Round extends CircularNodeList{

}

class ActionManager extends Array{
    _lastActionIndex = -1;
    
    startAction(){
        this.lastActionIndex++;
        this[this.lastActionIndex] = 1;
        console.log('Empezó la acción del index' + (this.lastActionIndex));
    }

    finishAction(){
        console.log('Terminó la acción del index' + (this.lastActionIndex));
        this[this.lastActionIndex] = 0;
        this.lastActionIndex--;
    }

    get lastActionIndex(){
        return this._lastActionIndex;
    }
    set lastActionIndex(lastActionIndex){
        this._lastActionIndex = lastActionIndex;
    }
}

class Game{
    _players;
    _round;
    _boardRoad;
    _isFinished = false;
    _currentDiceValues = [-1,0];
    _actionManager;
    static _colorsArray = ['blue', 'yellow', 'red', 'green','orange','pink'];
    static _currentTurn;
    

    constructor(boardSize, playerNumber,tabsNumber){
        this._boardRoad = GameControl.generateBoardRoad(boardSize);  
        this._players = GameControl.generatePlayers(playerNumber, tabsNumber); 
        this._round = GameControl.generateRound(this._players);
        this._actionManager = new ActionManager(0,0,0,0,0)
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
    get isFinished(){
        return this._isFinished;
    }
    set isFinished(isFinished){
        this._isFinished = isFinished;
    }
    get currentDiceValues(){
        return this._currentDiceValues;
    }
    set currentDiceValues(currentDiceValues){
        this._currentDiceValues = currentDiceValues;
    }
    get actionManager(){
        return this._actionManager;
    }
    set actionManager(actionManager){
        this.actionManager = actionManager;
    }
}

class GameControl{
    static _currentGame;
    static _tabSelected;
    static _squareSelected; 

    static generateBoardRoad(boardSize){
        let boardRoad = new BoardRoad();
        for( let i = 0; i < boardSize; i++){
            boardRoad.addElement(new SafeOne(Game._colorsArray[i]));
            boardRoad.addElement(new Exit(Game._colorsArray[i]));
            boardRoad.addElement(new SafeTwo(Game._colorsArray[i]));
            }
        GameControl.addHouses(boardRoad);
        GameControl.addFinish(boardRoad);
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

    static addFinish(boardRoad){
        let finishArray = []
        let houseArray = boardRoad.houseArray;
        let finishSquare;
        houseArray.forEach(house =>{
            finishSquare = new Square(house.color, 'Finsih');
            finishArray.push(finishSquare);
        });
        boardRoad.finishArray = finishArray
    }

    static generatePlayers(playerNumber, tabsNumber){
        let player;
        let playersArray = [];
        for(let i = 0; i< playerNumber; i++){
            player = new Player(Game._colorsArray[i], tabsNumber);
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
                arr.push(tab);
            }
            player.tabsArray = arr;
            for(let j = 0; j < houseArray.length;j++){
                if (houseArray[j].color === player.color){
                    houseArray[j].tabsInside = arr;
                    arr.forEach(tab =>{
                        tab.currentSquare = houseArray[j];
                    });
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
        let game = GameControl._currentGame;
        let n1 = game.currentDiceValues[0];
        let n2 = game.currentDiceValues[1];
        let availablesSquares = [];
            switch (currentSquareType){
                case 'SeguroUno':
                    if(tab.currentSquare.color === tab.color){
                        if(n1+n2 === 8){
                            availablesSquares.push(getFinishSquare(tab.color));
                        }
                    }else{
                        if((n1+n2 === 5) || (n1 === 5) || (n2 === 5)){
                            availablesSquares.push(tab.currentSquare.next);
                        }
                        if (n1+n2 === 12){
                            availablesSquares.push(tab.currentSquare.next.next);
                        }
                    }
                    break;
                case 'Salida':
                    if(n1+n2 === 7){
                        availablesSquares.push(tab.currentSquare.next);
                    }
                    if(n1+n2 === 12){
                        availablesSquares.push(tab.currentSquare.next.next);
                    }
                    break;
                case 'SeguroDos':
                if((n1+n2 === 5) || (n1 === 5) || (n2 === 5)){
                    availablesSquares.push(tab.currentSquare.next);
                }
                if(nT === 10){
                    availablesSquares.push(tab.currentSquare.next.next);
                }
                break;
                case 'House':
                    if(GameControl.isDicePar(game)){
                        availablesSquares.push(tab.currentSquare.next);
                    }
        }
    return availablesSquares;
    }

    static throwDices(){
        let game = GameControl._currentGame;
        let n1 = Math.floor(Math.random() * (7 - 1)) + 1;
        let n2 = Math.floor(Math.random() * (7 - 1)) + 1;
        game.currentDiceValues = [n1,n2];
        console.log('Se lanzaron los dados');
    }

    static async orderingRound(game){
        Timer.sleep(500);
        let actionManager = game.actionManager;
        actionManager.startAction();
        console.log('EMPIEZA ORDERINGROUND');
        let actionIndex;
        let round = game.round;  
        let turn = game.round.first;
        let sw = 0;
        let turnsOrderedArray = [];
        UiControl.alertOrderingRound();
        do{
            actionIndex = actionManager.lastActionIndex;
            console.log('El valor del index en ALERTorderingRound es: ' + actionIndex);
            console.log('El valor la accion ALERTOrderingRound es: ' + actionManager[actionIndex]);
            await Timer.sleep(1000);
            
        }while(actionManager[1] === 1)
        
        while(!round.isEnd(turn) || sw == 0){
            sw = 1;
            let timeout = setTimeout(GameControl.throwDices(),5*1000);
            UiControl.activateBtnDices();
            do{
                await Timer.sleep(1000);
                console.log(game.currentDiceValues)
            }while(game.currentDiceValues === [-1,0]);

            clearTimeout(timeout);
            UiControl.desactivateBtnDices();
            if(turnsOrderedArray.length === 0){
                turnsOrderedArray.push([turn, game.currentDiceValues]);
            }
            else{
                let sw2 = 0;
                let i = 0;
                while(sw2 === 0 && i<turnsOrderedArray.length){
                    if(turnsOrderedArray[i]> game.currentDiceValues){
                        sw2 = 1
                    }
                    i++;
                }
                if (sw2 === 0){
                    turnsOrderedArray.push([turn, game.currentDiceValues]);
                }else{
                    turnsOrderedArray.splice(i-1,0,[turn, game.currentDiceValues]);
                }
            }
            turn = turn.next;
            GameControl.clearDiceValues();
        }
        round = new round();
        for(i = turnsOrderedArray.length; i>0;i++){
            round.addElement(turnsOrderedArray[i][0]);
        }
        game.round = round;
        actionManager.finishAction();
        console.log('TERMINÓ ORDERING');

    }

    static async getOutHouse(turn){
        while(turn.timesThrowed < 3){
            let timeout = setTimeout(GameControl.throwDices(),5*1000);
            UiControl.activateBtnDices();
            do{
                await Timer.sleep(100);
            }while(game.currentDiceValues === 0);
            clearTimeout(timeout);
            UiControl.desactivateBtnDices();
            if(GameControl.isDicePar(game)){
                let tabsArray = turn.player.tabsArray;
                tabsArray.forEach(tab, ()=>{
                    if(tab.state === 'house'){
                        GameControl.moveTab(tab, tab.currentSquare.next);
                    }
                });
                break;
            }else{
                GameControl.repeatTurn(turn);
                await Timer.sleep(1000);
            }
        }
        GameControl.clearDiceValues();
    }

    static clearDiceValues(){
        let game = GameControl._currentGame;
        game._currentDiceValues === [-1,0];
    }

    static searchSquareById(squareId){
        let boardRoad = GameControl._currentGame.boardRoad;
        let square = boardRoad.first;
        let sw = 0;
        while(!boardRoad.isEnd(square) || sw ===0){
            sw = 1;
            if(squareId.includes(square.color)){
                for(let i = 0; i<3;i++){
                    if(squareId === square.id){
                        return square;
                    }
                    square = square.next;
                }
            } else{
                square = square.next.next.next;
            }
        }
    }

    static moveTab(tabUi, squareUi){
        let game = GameControl._currentGame;
        let tab = GameControl.searchTabById(tabUi.getAttribute('id'));
        let square = GameControl.searchSquareById(squareUi.getAttribute('id'));
        if(square.type = 'Finish'){
            tab.state = 'finish';
            game.gameFinished = GameControl.gameFinished(tab); 
        }
        if(tab.state === 'house'){
            this.jailAllTabsInside(tab, square);
            tab.state = 'playing'
        }else{
            if(square.type !== 'Salida'){
                this.jailAllTabsInside(tab,square)
            }
        }
        GameControl.takeOutTab(tab,tab.currentSquare.tabsInside);
        tab.currentSquare = square;
        square.tabsInside.push(tab);
        UiControl.moveTabUi(tab, square);
        turn.doMovement = true;
    }

    static gameFinished(tab){
        let game = GameControl._currentGame;
        let players = game.players;
        let flag = true;
        let tabsArray;
        let auxiliarTab;
        for(let i = 0; i< players.lenght; i++){
            if (players[i].color === tab.color){
                tabsArray = players.tabsArray;
                for(let j = 0; j< tabsArray.lenght;j++){
                    auxiliarTab = tabsArray[j];
                    if(tab.state !== 'Finished'){
                        flag = false;
                        break;
                    }
                }
            }
            break
        }
        return flag;
    }

    static jailAllTabsInside(tab, square){
        let houseSquare;
        let game = GameControl._currentGame;
        let houseArray = game.BoardRoad.houseArray;
        for(let  i = 0; i<houseArray.length;i++){
            if (houseArray[i].color === tab.color){
                houseSquare = houseArray[i];
                break;
            }
        }
        square.tabsInside.forEach(tabInside, ()=>{
            if(tabInside.color !== tab.color){
                UiControl.moveTabUi(tab, houseSquare);
                tabInside.state = 'house';
            }
        });
    }

    //Sacar una tab de el arreglo tabsInside de la casilla
    static takeOutTab(tab,array){
        let i = array.indexOf(tab);
        if(i === - 1){
            return
        } else{
            array.splice(i,1);
        }
        
    }

    static isDicePar(game){
        return game.currentDiceValues[0] === game.currentDiceValues[1];
    }

    static async normalTurn(turn){
        let game = GameControl._currentGame;
        let timeout = setTimeout(GameControl.throwDices(), 5*1000);
        UiControl.activateBtnDices();
        do{
            await Timer.sleep(250);
        }while(game.currentDiceValues === [0][1]);
        clearTimeout(timeout);
        UiControl.desactivateBtnDices();
        //verificar si se puede mover algo
        if(GameControl.isDicePar(game)) turn.timesThrowed++;
        if(turn.timesThrowed < 3){
            let tabsArray = turn.player.tabsArray;
            let canDoMovements = false;
            for(let i = 0; i<tabsArray.length;i++){
                if (GameControl.availableSquares(tab).length !== 0){ //No hay movimientos posibles
                    canDoMovements = true;
                    break;
                }
            }
            if(canDoMovements){
                timeout = setTimeout(GameControl.moveAutamatically(turn), 20*1000);
                UiControl.activateTabs(turn);  
                do{
                    await Time.sleep(250);
                }while(!turn.doMovement);
                clearTimeout(timeout);
                UiControl.desactivateTabs(turn);
            }else{
                UiControl.notPossibleMovement()  //TODO---------- Función que muestra en la pantalla que no hay movimientos posibles
            }
        }
        else{
            timeout = setTimeout(GameControl.moveAutamatically(turn), 20*1000);
            UiControl.activateWinnableTabs(turn);
        }



    }

    static selectWinnerTab(tabUi){
        let game = GameControl._currentGame;
        let finishArray = game.boardRoad.finishArray;
        let tab = GameControl.searchTabById(tabUi.getAttribute('id'));
        for(let i = 0; i<finishArray.lenght; i++){
            if(tab.color === finishArray[i].color){
                let finishSquare = finishArray[i];
                break;
            }
        }
        let finishSquareUi = document.getElementById(finishSquare.id);
        GameControl.moveTab(tabUi, finishSquareUi);
    }

    static moveAutamatically(turn){
        let tab;
        let tabsArray = turn.player.tabsArray;
        for(let i = 0;i <tabsArray.length;i++){
            tab = tabsArray[i];
            if(GameControl.availableSquares(tab).length !== 0){
                let tabUi = document.getElementById(tab.id);
                let squareUi = document.getElementById(GameControl.availableSquares(tab)[0].id);
                GameControl.moveTab(tabUi, squareUi);
                break;
            }
        }
    }

    static repeatTurn(turn){
        GameControl.clearDiceValues();
        turn.timesThrowed++;
        turn.doMovement = false;
    }

    static nextTurn(turn){
        let game = GameControl._currentGame;
        turn.doMovement = false;
        GameControl.clearDiceValues();
        game.currentTurn = turn.next;
    }

    static playTurn(turn){
        console.log('EMPIEZA PLAYTURN')
        let actionManager = GameControl._currentGame.actionManager;
        actionManager.startAction();
        let tabsArray = turn.player.tabsArray;
        let inHouse = true;
        for(let i = 0; i<tabsArray.length;i++){
            if(tabsArray[i].state !== 'house'){
                inHouse = false;
            }
        }
        if (inHouse){
            GameControl.getOutHouse(turn); 
        }else{
            GameControl.normalTurn(turn);  
        }
        console.log('TERMINÓ PLAYTURN')
    }

    static tabOutHouse(tab, houseSquare){
        
    }


    static async startGame(game){
        let actionIndex;
        let actionManager = game.actionManager;

        UiControl.alertGameStart();
        do{
            actionIndex = actionManager.lastActionIndex;
            await Timer.sleep(1000);
        }while(actionManager[actionIndex] === 1);
        GameControl.orderingRound(game);
        console.log('Después de orderingRound')

        do{
            actionIndex = actionManager.lastActionIndex;
            console.log('El valor del index en orderingRound es: ' + actionIndex);
            console.log('El valor la accion OrderingRound es: ' + actionManager[actionIndex]);
            await Timer.sleep(1000);
        }while(actionManager[0] === 1);

        game._currentTurn = game.round.first;
        do{
            GameControl.playTurn(game._currentTurn);
            if(GameControl.isDicePar(game)){
                GameControl.repeatTurn(game.currentTurn);  
            }else{
                GameControl.nextTurn(game.currentTurn); //*Se debe actualizar game.currentTurn dentro de la función
            }
        }while(!game.gameFinished);

        //TODO ---- Poner pantalla final.
    }
}

class UiControl{

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

    static async alertReapeatTurn(){
        let alert = document.getElementById('alert');
        alert.innerHTML = `Vuelve a lanzar`
        alert.classList.add('show-alert');
        await Timer.sleep(3000);
        alert.classList.remove('show-alert');
    }

    static async alertNewTurn(turn){
        let actionManager = GameControl.game.actionManager;
        actionManager.startAction();
        let alert = document.getElementById('alert');
        alert.innerHTML = `Empieza el turno del jugador ${turn.player.color}`
        alert.classList.add('show-alert');
        await Timer.sleep(3000);
        alert.classList.remove('show-alert');
        actionManager.finishAction();
        
    }

    static async alertGameStart(){
        let actionManager = GameControl._currentGame.actionManager;
        actionManager.startAction();
        console.log('EMPEZÓ ALERTGAMESTART')
        let alert = document.getElementById('alert');
        alert.innerHTML = `Empieza el juego`
        alert.classList.add('show-alert');
        await Timer.sleep(3000);
        alert.classList.remove('show-alert');
        await Timer.sleep(700);
        actionManager.finishAction();
        console.log('TERMINÓ ALERTGAMESTART')
    }

    static async alertOrderingRound(){
        console.log('EMPIEZA ALERT ORDERINGROUND');
        let actionManager = GameControl._currentGame.actionManager;
        actionManager.startAction();
        let alert = document.getElementById('alert');
        alert.innerHTML = `Ronda para elegir el orden de los turnos`
        alert.classList.add('show-alert');
        await Timer.sleep(3000);
        alert.classList.remove('show-alert');
        actionManager.finishAction();
        console.log('TERMINA ALERT ORDERINGROUND');

    }

    static async alertNotPossibleMovements(){
        let alert = document.getElementById('alert');
        alert.innerHTML = `No hay movimientos posibles, pasa turno`
        alert.classList.add('show-alert');
        await sleep(3500);
        alert.classList.remove('show-alert');
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
        btnDices.addEventListener('click', function(){GameControl.throwDices});
        /*
        TODO Adicionar las clases para que el botón se vea activado.
        */
    }

    static desactivateBtnDices(){
        let btnDices = document.getElementById('btnDices');
        btnDices.removeEventListener('click' , function(){GameControl.throwDices});
        /*
        TODO Remover las clases añadidas para que el botón parezca desactivado.
        */
    }

    static activateTabs(turn){
        let game = GameControl._currentGame;
        let tabsArray = turn.player.tabsArray;
        tabsArray.forEach(tab, ()=>{
            if(tab.state === 'playing'){
                tabUi = document.getElementById(tab.id);
                tabUi.addEventListener('click', EventControl.evtTab);
            }
            if(GameControl.isDicePar(game)){
                if(tab.state === 'house'){
                    tabUi = document.getElementById(tab.id);
                    tabUi.addEventListener('click', EventControl.evtTab);
                }
            }
        });
    }

    static desactivateTabs(turn){
        let tabsArray = turn.player.tabsArray;
        tabsArray.forEach(tab, ()=>{
            tabUi = document.getElementById(tab.id);
            tabUi.removeEventListener('click', EventControl.evtTab);
        });
    }

    static moveTabUi(tab,square){
        let tabUi = document.getElementById(tab.id);
        let squareUi = document.getElementById(square.id);
        squareUi.appendChild(tabUi);
    }

    static activateSquare(square){
        square.addEventListener('click', EventControl.evtSquare);
        //TODO ---- agregar clases para hacer la casilla visible
    }

    static activateWinnableTabs(turn){
        let tabsArray = turn.player.tabsArray;
        tabsArray.forEach(tab =>{
            if(tab.state === 'playing'){
                tab.addEventListener('click', EventControl.evtWinnerTab)
            }
        });
    }

    static activateRangeInput(ident,clase){
        let price = document.querySelector('#' + ident);
        let output = document.querySelector('.' + clase);
        output.textContent = price.value;
        price.addEventListener('input' , ()=>{
            output.textContent = price.value;
        });
    }

    static initRangeInput(){
        UiControl.activateRangeInput('jugadores' , 'jugadoresOutput');
        UiControl.activateRangeInput('fichas' , 'fichasOutput');
    }
}

class EventControl{
    static _tablero;

    static evtLoadGame(boardSize,playerNumber, tabsNumber){
        boardSize = parseInt(document.getElementById('boardSize').getAttribute('text'));
        playerNumber = parseInt(document.getElementById('playerNumber').getAttribute('text'));
        tabsNumber = parseInt(document.getElementById('tabsNumber').getAttribute('text'));
        let game  = new Game(boardSize, playerNumber, tabsNumber);
        GameControl._currentGame = game;
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

    static evtWinnerTab(e){
        GameControl.selectWinnerTab(e.target);
    }
}

class App{

    static init(){
        let boardSize = sessionStorage.getItem('boardSize');
        let playerNumber = sessionStorage.getItem('playerNumber');
        let tabsNumber = sessionStorage.getItem('tabsNumber');

        let game = new Game(boardSize,playerNumber,tabsNumber);
        GameControl._currentGame = game;
        console.log(game)
        GameControl.startGame(game);
    }
}

App.init();






