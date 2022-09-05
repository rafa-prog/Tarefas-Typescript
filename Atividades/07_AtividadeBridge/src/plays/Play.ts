import IConsole from "../platforms/IConsole";
import IPlay from "./IPlay";

export default class Play implements IPlay {

    constructor(console: IConsole){}

    playing(): void {
        console.log("Iniciando jogo...")
    }
    result(): void {
        console.log("Rodando jogo...")
    }

}