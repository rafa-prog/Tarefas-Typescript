import I_Item from "./interface/I_Item";

export default class Game implements I_Item{
    start() : void{
        this.getDescription()
        console.log("Alugando jogo...")
    }

    getDescription(): void{
        console.log("Jogo alugado!")
    }
}