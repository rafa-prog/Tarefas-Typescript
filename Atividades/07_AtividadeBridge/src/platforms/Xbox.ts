import IConsole from "./IConsole";

export default class Xbox implements IConsole {

    constructor(){
        console.log("Xbox: Console iniciado!")
        this.configureGame()
    }

    configureGame(): void {
        this.authToken()
        console.log("Xbox: Configurando jogo...")
    }
    authToken(): void {
        console.log("Xbox: Validando jogo...")
    }
    
}