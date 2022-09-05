import ICorreios from "../correios/ICorreios";
import Transportadora from "../transportadora/Transportadora";

export default class TrasportadoraAdapter implements ICorreios{
    constructor(private _transportadora: Transportadora){
        console.log("Adaptando Transportadora em Correios...")
    }

    sendCorreios() {
        return this._transportadora.send()
    }
    receiveCorreios() {
        this._transportadora.receive()
    }

    
}