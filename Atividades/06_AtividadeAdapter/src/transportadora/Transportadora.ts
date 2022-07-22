import ITransportadora from "./ITransportadora";

export default class Transportadora implements ITransportadora{
    send() {
        console.log("Enviando Pacotes...")
    }
    receive() {
        console.log("Recebendo Pacotes...")
    }

}