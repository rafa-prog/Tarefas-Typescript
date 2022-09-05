import IFood from "./interfaces/IFood";

export default class HotDog implements IFood{
    startReq() {
        console.log("HotDog: Food request...")
        this.getFood()
    }
    getFood() {
        console.log("HotDog: Food delivered!")
    }
}