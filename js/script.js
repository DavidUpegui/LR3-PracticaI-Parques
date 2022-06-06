/*
//Clase Juego: desde Aquí se empieza 
class Game{
    num_player;
    num_tab;
    board;

    constructor(num_tab){
        this.num_tab = num_tab;
    }

    start(){
        for(var i = 0; i<this.num_tab; i++){
            let tab = new Tab('blue-tab', i);
            tab.createHtmlTab();
        }
    }
}

//Clase Jugadr: Todavía no tiene papel representativo
class Player{
    name;
    tabs;    
}



    constructor(tabClass, index){
        this.tabClass = tabClass;
        this.index = index;
    }
}

class ui_tab{
*/
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


// Clase Ficha
class Tab{
    _tabColor;
    _tabId;
    _tabIndex;
    _currentSquare;

    constructor(tabColor, tabIndex){
        this._tabColor = tabColor;
        this._tabIndex = tabIndex;
        this._tabId = tabColor +'Tab'+(tabIndex+1);
        this._currentSquare = tabColor + 'house';
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

    set currentSquare(currentSquare){
        this._currentSquare = currentSquare;
    }
}

//Clase tablero
class BoardPOO{
    _squareTypes = ['seguroUno', 'salida' , 'seguroDos'];
    _colors = ['blue', 'yellow', 'red', 'green','orange','pink'];
    _boardSize;
    _nTabs;
    _recorrido;
    _tabsArray

    constructor(boardSize,nTabs){
        this._boardSize = boardSize;
        this._nTabs = nTabs;
        this._recorrido = this.generateRecorrido(boardSize);
        this._tabsArray = this.generateTabs(nTabs, boardSize);
    }

    generateRecorrido(boardSize){
        let recorrido = new Recorrido();
        for( let i = 0; i < boardSize; i++){
            this._squareTypes.forEach(type =>{
                let casilla = new Casilla(this._colors[i], type);
                recorrido.agregarCasilla(casilla);
            })
        }
        return recorrido
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

//Clase Casilla
class Casilla{
    _color;
    _tipo;
    _fichasDentro;
    _siguienteCasilla = null;

    constructor(color, tipo){
        this._color=color;
        this._tipo = tipo;
    }

    get color(){
        return this._color;
    }

    get tipo(){
        return this._tipo;
    }

    get fichasDentro(){
        return this._fichasDentro;
    }

    get siguienteCasilla(){
        return this._siguienteCasilla
    }

    set tipo(tipo){
        this._tipo = tipo;
    }
    set siguienteCasilla(siguienteCasilla){
        this._siguienteCasilla = siguienteCasilla;
    }
}


//Clase Recorrido
class Recorrido{
    _primero = null;
    _ultimo = null;

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
        return casilla == this.primero;
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
}

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


