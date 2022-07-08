import IFood from "./interfaces/IFood";

export default class Hamburguer implements IFood{
    startReq() {
        console.log("Hamburguer: Food requested...")
        this.getFood()
    }
    getFood() {
        console.log("Hamburguer: food delivered!")
    }
}