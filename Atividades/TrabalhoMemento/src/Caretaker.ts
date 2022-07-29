import IMemento from "./IMemento";
import Originator from "./Originator";

export default class Caretaker {
    private _mementos: IMemento[] = []
    private _originator: Originator

    constructor(originator: Originator) {
        this._originator = originator
        this.backup()
    }

    backup(): void {
        if(this._mementos.length == 10){
            this._mementos.shift()
            console.log("Limite de mementos, apagando o primeiro backup")
        }

        this._mementos.push(this._originator.saveState())
    }

    undo(): void {
        if(this._mementos.length == 0){
            console.log("Caretaker: Sem mementos salvos no sistema!")
        }else if(this._mementos.length == 1){
            console.log("Caretaker: Atenção, o único memento salvo no sistema foi deletado!")
            this._mementos.pop()
        }else{
            let memento = this._mementos.pop()
            this._originator.restoreState(this._mementos[this._mementos.length -1])
        }
    }

    getSaveStates() {
        if(this._mementos.length == 0){
            console.log("Sem mementos salvos no sistema")
        }
        for(var i in this._mementos){
            console.log("Memento " + i +": " + this._mementos[i].getMemento())
        }
    }
}