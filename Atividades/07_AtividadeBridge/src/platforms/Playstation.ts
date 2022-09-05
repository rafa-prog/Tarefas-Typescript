import IConsole from "./IConsole";

export default class Playstation implements IConsole {

    constructor(){
        console.log("Playstation: Console iniciado!")
        this.configureGame()
    }

    configureGame(): void {
        this.authToken()
        console.log("Playstation: Configurando jogo...")
    }
    authToken(): void {
        console.log("Playstation: Validando jogo...")
    }
    
}