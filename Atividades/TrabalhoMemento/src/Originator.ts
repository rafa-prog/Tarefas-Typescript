import ConcreteMemento from "./ConcreteMemento"
import IMemento from "./IMemento"

export default class Originator {
    private _state: String

    constructor(state: String) {
        this._state = state
        console.log("Originator: Estado original: " + state)
        this.saveState()
    }

    alterState(state: String) {
        this._state = state
        console.log("Originator: Novo estado: " + state)
        this.saveState()
    }

    saveState():IMemento {
        return new ConcreteMemento(this._state)
    }

    restoreState(memento: IMemento) {
        this._state = memento.getState()
        console.log("Originator: Estado retornou para: " + memento.getState())
    }
}