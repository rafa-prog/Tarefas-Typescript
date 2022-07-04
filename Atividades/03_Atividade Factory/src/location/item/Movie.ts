import I_Item from "./interface/I_Item";

export default class Movie implements I_Item{
    start() : void{
        this.getDescription()
        console.log("Alugando filme...")
    }

    getDescription(): void{
        console.log("Filme alugado!")
    }
}