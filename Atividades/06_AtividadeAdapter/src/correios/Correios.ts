import ICorreios from "./ICorreios";

export default class Correios implements ICorreios{
    sendCorreios() {
        console.log("Enviando Pacotes...")
    }
    receiveCorreios() {
        console.log("Recebendo Pacotes...")
    }

}