import IMemento from "./IMemento";

export default class ConcreteMemento implements IMemento {

    private _state: String
    private _date: Date

    constructor(state: String){
        this._state = state
        this._date = new Date()
        this.getMemento()
    }

    getState(): String {
        return this._state
    }
    getDate(): Date{
        return this._date
    }
    getMemento(): String {
        return "State: " + this._state + "\nDate: " + this._date 
    }
}