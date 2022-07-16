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
    _tabsInside =[];


    constructor(color,type){
        super();
        this._color = color;
        this._type = type;
        this._id = color + type;
        this.tabsInside = [];
        
        
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
        this._timesThrowed = timesThrowed;
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

class Action{
    static _actionsArray = [];
    _isFinished;

    doAction0(action,f){
        this.isFinished = false;
        f(action);
    }

    doAction1(functionParameter,action, f ){
        this.isFinished  = false;
        f(functionParameter,action);
    }

    finishAction(){
        this.isFinished = true;
    }

    static generateNewAction(){
        let action = null;
        if(this._actionsArray.length !== 0){
            for(let i = 0; i<this._actionsArray.length;i++){
                if(this._actionsArray[i].isFinished){
                    action = this._actionsArray[i];
                    break;
                }
            }
            if(action === null){
                action = new Action();
                this._actionsArray.push(action);
            }
        }else{
            action = new Action();
            this._actionsArray.push(action);
        }
        return action;
    }

    get isFinished(){
        return this._isFinished;
    }
    set isFinished(isFinished){
        this._isFinished = isFinished;
    }
    get actionsArray(){
        return this._actionsArray;
    }
    set actionsArray(actionsArray){
        this._actionsArray = actionsArray;
    }
    get f(){
        return this._f;
    }
    set f(f){
        this._f = f;
    }

    
}

class Game{
    _players;
    _round;
    _boardRoad;
    _isFinished = false;
    _currentDiceValues = [-1,0];
    _currentTurn;

    static _colorsArray = ['blue', 'yellow', 'red', 'green','orange','pink'];
    

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
    get currentTurn(){
        return this._currentTurn;
    }
    set currentTurn(currentTurn){
        this._currentTurn = currentTurn;
    }
}

class GameControl{
    static _currentGame;
    static _tabSelected =null;
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
        let tabsInside = [];
        players.forEach(player =>{
            arr = []
            for(let i = 0; i<tabsNumber;i++){
                tab = new Tab(player.color, i);
                arr.push(tab);
            }
            player.tabsArray = arr;
            for(let j = 0; j < houseArray.length;j++){
                if (houseArray[j].color === player.color){
                    tabsInside = player.tabsArray.slice(0);
                    houseArray[j].tabsInside = tabsInside;
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
        let player;
        let playersArr = GameControl._currentGame.players;
        let index = parseInt(id[id.length - 1]);
        for(let i = 0; i<playersArr.length;i++){
            player = playersArr[i];
            if(player.tabsArray[index].id === id){
                return playersArr[i].tabsArray[index];
            }
        }
    }

    static availableSquares(tab){
        let currentSquare = tab.currentSquare;
        let game = GameControl._currentGame;
        let n1 = game.currentDiceValues[0];
        let n2 = game.currentDiceValues[1];
        let availablesSquares = [];
            switch (currentSquare.type){
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
                if(n1+n2 === 10){
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
        console.log(game.currentDiceValues);
    }

    static async orderingRound(game,action){
        console.log('EMPIEZA ORDERINGROUND');
        let timeout;
        let round = game.round;  
        let turn = game.round.first;
        let sw = 0;
        let turnsOrderedArray = [];
        let a_alert = Action.generateNewAction();
        a_alert.doAction0(a_alert,UiControl.alertOrderingRound);
        do{
            await Timer.sleep(1000);
        }while(!a_alert.isFinished);
        while(!round.isEnd(turn) || sw == 0){
            // a_alert = Action.generateNewAction();
            // a_alert.doAction1(turn, a_alert, UiControl.alertNewTurn);
            // do{
            //     await Timer.sleep(1000);
            // }while(!a_alert.isFinished);
            sw = 1;
            timeout = setTimeout(GameControl.throwDices,1*1000);
            UiControl.activateBtnDices();
            do{
                await Timer.sleep(1000);
                console.log(game.currentDiceValues)
            }while(game.currentDiceValues[0] === -1);
            console.log('Pasa por acá');
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
        round = new Round();
        for(let i = turnsOrderedArray.length - 1; i>=0;i--){
            round.addElement(turnsOrderedArray[i][0]);
        }
        game.round = round;
        action.finishAction();
        console.log('TERMINÓ ORDERING');

    }

    static async getOutHouse(turn, action){
        console.log('EMPIEZA GETOUTHOUSE');
        let timeout;
        let tabUi;
        let exitUi;
        let game = GameControl._currentGame;
        while(turn.timesThrowed < 3){
            // timeout = setTimeout(GameControl.throwDices,5*1000);
            // UiControl.activateBtnDices();
            // do{
            //     await Timer.sleep(100);
            // }while(game.currentDiceValues[0] === -1);
            // clearTimeout(timeout);
            // UiControl.desactivateBtnDices();
            game.currentDiceValues=[1,1];
            if(GameControl.isDicePar(game)){
                let tabsArray = turn.player.tabsArray;                
                tabsArray.forEach(tab =>{
                    tabUi = document.getElementById(tab.id);
                    exitUi = document.getElementById(tab.currentSquare.next.id);
                    if(tab.state === 'house'){
                        GameControl.moveTab(tabUi, exitUi);
                    }
                });
                break;
            }else{
                GameControl.repeatTurn(turn);
                console.log(turn);
                await Timer.sleep(1000);
            }
        }
        GameControl.clearDiceValues();
        action.finishAction();
        console.log('TERMINA GETOUTHOUSE');
    }

    static clearDiceValues(){
        let game = GameControl._currentGame;
        game.currentDiceValues = [-1,0];
    }

    static searchSquareById(squareId){
        let boardRoad = GameControl._currentGame.boardRoad;
        let square = boardRoad.first;
        let sw = 0;
        while(!boardRoad.isEnd(square) || sw === 0){
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
        let turn = game.currentTurn;
        let tab = GameControl.searchTabById(tabUi.getAttribute('id'));
        let square = GameControl.searchSquareById(squareUi.getAttribute('id'));
        console.log('El tipo de la casilla es: ' + square.type);
        if(square.type === 'Finish'){
            tab.state = 'finish';
            game.gameFinished = GameControl.gameFinished(tab); 
        }
        if(tab.state === 'house'){
            console.log('Pasa por la parte de: Está en casa, verifique que no se come nada')
            this.jailAllTabsInside(tab, square);
            tab.state = 'playing'
        }else{
            if(square.type !== 'Salida'){
                console.log('Pasa por la parte de comerse a las fichas')
                this.jailAllTabsInside(tab,square)
            }
        }
        GameControl.takeOutTab(tab,tab.currentSquare.tabsInside);
        tab.currentSquare = square;
        square.tabsInside.push(tab);
        UiControl.moveTabUi(tab, square);
        if(GameControl._tabSelected !== null){
            UiControl.uncklickAllTabs(turn);
            UiControl.desactivateTabs(turn);
            UiControl.unShowSquare(squareUi);
            UiControl.desactivateSquareUI(squareUi);
            GameControl._tabSelected = null
        }
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
        let houseArray = game.boardRoad.houseArray;
        square.tabsInside.forEach(tabInside=>{
            if(tabInside.color !== tab.color){
                console.log('Se come la ficha');
                console.log(tab)
                console.log(houseSquare);
                for(let  i = 0; i<houseArray.length;i++){
                    if (houseArray[i].color === tabInside.color){
                        houseSquare = houseArray[i];
                        break;
                    }
                }
                UiControl.moveTabUi(tabInside, houseSquare);
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

    static async normalTurn(turn, actionPassed){
        let game = GameControl._currentGame;
        let action;
        action = Action.generateNewAction();
        action.doAction1(turn, action, UiControl.alertNewTurn);
        do{
            await Timer.sleep(1000);
        }while(!action.isFinished);

        // 
        game.currentDiceValues = [2,5];
        UiControl.activateBtnDices();
        do{
            console.log('Espera')
            await Timer.sleep(250);
        }while(game.currentDiceValues[0] === -1);
        // clearTimeout(timeout);
        UiControl.desactivateBtnDices();
        //verificar si se puede mover algo
        if(turn.timesThrowed < 3){
            let tabsArray = turn.player.tabsArray;
            let canDoMovements = false;
            let tab;
            for(let i = 0; i<tabsArray.length;i++){
                tab = tabsArray[i];
                if (GameControl.availableSquares(tab).length !== 0){ //No hay movimientos posibles
                    canDoMovements = true;
                    break;
                }
            }
            if(canDoMovements){
                // timeout = setTimeout(function(){GameControl.moveAutamatically(turn)}, 20*1000);
                UiControl.activateTabs(turn);  
                do{
                    await Timer.sleep(250);
                    console.log('Esperando a que mueva')
                }while(!turn.doMovement);
                // clearTimeout(timeout);
                UiControl.desactivateTabs(turn);
            }else{
                action = Action.generateNewAction();
                action.doAction0(action, UiControl.alertNotPossibleMovements);
                do{
                    await Timer.sleep(1000);
                }while(!action.isFinished);
            }
        }
        else{
            timeout = setTimeout(GameControl.moveAutamatically(turn), 20*1000);
            UiControl.activateWinnableTabs(turn);
        }
        actionPassed.finishAction();



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
        console.log('El turno en repeatTrun');
        console.log(turn);
        GameControl.clearDiceValues();
        turn.timesThrowed = turn.timesThrowed + 1;
        turn.doMovement = false;
    }

    static nextTurn(turn){
        let game = GameControl._currentGame;
        turn.timesThrowed = 0;
        turn.doMovement = false;
        GameControl.clearDiceValues();
        game.currentTurn = turn.next;
    }

    static async playTurn(turn,actionPassed){
        console.log('EMPIEZA PLAYTURN')
        let tabsArray = turn.player.tabsArray;
        let inHouse = true;
        for(let i = 0; i<tabsArray.length;i++){
            if(tabsArray[i].state !== 'house'){
                inHouse = false;
            }
        }

        let action = Action.generateNewAction();
        action.doAction1(turn,action,UiControl.alertNewTurn);
        do{
            await Timer.sleep(1000);
        }while(!action.isFinished);

        if (inHouse){
            action = Action.generateNewAction();
            action.doAction1(turn, action, GameControl.getOutHouse);
            do{
                await Timer.sleep(1000);
            }while(!action.isFinished);
        }else{
            action = Action.generateNewAction();
            action.doAction1(turn, action, GameControl.normalTurn);
            do{
                await Timer.sleep(1000);
            }while(!action.isFinished);
        }
        actionPassed.finishAction();
        console.log('TERMINÓ PLAYTURN')
    }

    static tabOutHouse(tab, houseSquare){
        
    }


    static async startGame(game){
            // let action;
            // action = Action.generateNewAction();
            // action.doAction0(action, UiControl.alertGameStart);
            // do{
            //     await Timer.sleep(1000);
            // }while(!action.isFinished);

            // action = Action.generateNewAction();
            // action.doAction1(game,action,GameControl.orderingRound);
            // do{
            //     await Timer.sleep(1000);
            // }while(!action.isFinished);
        let action;
        game.currentTurn = game.round.first;
        do{
            action = Action.generateNewAction();
            action.doAction1(game.currentTurn, action, GameControl.playTurn);
            do{
                await Timer.sleep(1000);
            }while(!action.isFinished);
            if(GameControl.isDicePar(game)){
                GameControl.repeatTurn(game.currentTurn);  
            }else{
                GameControl.nextTurn(game.currentTurn); //*Se debe actualizar game.currentTurn dentro de la función
            }
        }while(!game.isFinished);
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

    static async alertReapeatTurn(){
        let alert = document.getElementById('alert');
        alert.innerHTML = `Vuelve a lanzar`
        alert.classList.add('show-alert');
        await Timer.sleep(3000);
        alert.classList.remove('show-alert');
    }

    static async alertNotPossibleMovements(action){
        console.log('EMPEZÓ notPossibleMovement');
        let alert = document.getElementById('alert');
        alert.innerHTML = `No tiene movimientos posibles`
        alert.classList.add('show-alert');
        await Timer.sleep(1000);
        alert.classList.remove('show-alert');
        console.log('TERMINÓ notPossibleMovement');
        action.finishAction();
    }

    static async alertNewTurn(turn,action){
        console.log('Empieza el turno del jugador' + turn.player.color);
        let alert = document.getElementById('alert');
        alert.innerHTML = `Empieza el turno del jugador ${turn.player.color}`
        alert.classList.add('show-alert');
        await Timer.sleep(1000);
        alert.classList.remove('show-alert');
        console.log('TERMINÓ alertNewTurn');
        action.finishAction();
    }

    static async alertGameStart(action){
        console.log('EMPEZÓ ALERTGAMESTART')
        let alert = document.getElementById('alert');
        alert.innerHTML = `Empieza el juego`
        alert.classList.add('show-alert');
        await Timer.sleep(1000);
        alert.classList.remove('show-alert');
        await Timer.sleep(700);
        console.log('TERMINÓ ALERTGAMESTART');
        action.finishAction();
    }

    static async alertOrderingRound(action){
        console.log('EMPIEZA ALERT ORDERINGROUND');
        let alert = document.getElementById('alert');
        alert.innerHTML = `Ronda para elegir el orden de los turnos`
        alert.classList.add('show-alert');
        await Timer.sleep(1000);
        alert.classList.remove('show-alert');
        action.finishAction();
        console.log('TERMINA ALERT ORDERINGROUND');

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
            UiControl.unShowSquare(availableSquareUI);
            UiControl.desactivateSquareUI(availableSquareUI);
        });
    }

    static tabClicked(tabUI){
        let game = GameControl._currentGame;
        console.log('La TabUI clickeada es:');
        console.log(tabUI);
        GameControl._tabSelected = tabUI;
        let tab = GameControl.searchTabById(tabUI.getAttribute('id'));
        if (tabUI.getAttribute('pressed')=== 'false'){
            UiControl.uncklickAllTabs(game.currentTurn);
            let availableSquareUI;
            tabUI.classList.add('tab-clicked');
            tabUI.classList.add('aber');
            tabUI.setAttribute('pressed', 'true');
            let availableSquares = GameControl.availableSquares(tab);
            availableSquares.forEach(square =>{
                availableSquareUI = document.getElementById(square.id);
                UiControl.showSquare(availableSquareUI);
                UiControl.activateSquareUI(availableSquareUI);
            });
        }else{
            UiControl.uncklickTab(tab);
        }
    } 

    static showSquare(squareUi){
        squareUi.classList.add('square-showed')
    }

    static unShowSquare(squareUi){
        squareUi.classList.remove('square-showed')
    }

    static activateSquareUI(squareUi){
        squareUi.addEventListener('click' , EventControl.evtSquare);
    }
    static desactivateSquareUI(squareUi){
        squareUi.removeEventListener('click' , EventControl.evtSquare);
    }


    static activateBtnDices(){
        let btnDices = document.getElementById('btnDices');
        btnDices.addEventListener('click',GameControl.throwDices);
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
        let tabUi;
        let tabsArray = turn.player.tabsArray;
        tabsArray.forEach(tab =>{
            if(tab.state === 'playing'){
                tabUi = document.getElementById(tab.id);
                tabUi.addEventListener('click', EventControl.evtTabs);
            }
            if(GameControl.isDicePar(game)){
                if(tab.state === 'house'){
                    tabUi = document.getElementById(tab.id);
                    tabUi.addEventListener('click', EventControl.evtTabs);
                }
            }
        });
    }

    static desactivateTabs(turn){
        let tabsArray = turn.player.tabsArray;
        let tabUi;
        tabsArray.forEach(tab =>{
            tabUi = document.getElementById(tab.id);
            tabUi.removeEventListener('click', EventControl.evtTabs);
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

    static uiDices(){
        let game = GameControl._currentGame
        var d1 = document.getElementById('dice1')
        var d2 = document.getElementById('dice2')
        GameControl.throwDices()
        let n1 = game.currentDiceValues[0]
        let n2 = game.currentDiceValues[1]
        d1.src = `css/dados/${n1}.png`
        d2.src = `css/dados/${n2}.png`
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
        UiControl.tabClicked(e.target);
    }

    static evtSquare(e){
        let game = GameControl._currentGame;
        GameControl.moveTab(GameControl._tabSelected, e.target);
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
        console.log(game);
        GameControl.startGame(game);
    }
}

App.init();







