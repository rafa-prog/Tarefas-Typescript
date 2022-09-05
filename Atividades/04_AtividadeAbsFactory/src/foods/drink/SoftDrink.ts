import IDrink from "./interfaces/IDrink";

export default class SoftDrink implements IDrink{
    startReq() {
        console.log("Soft Drink: Drink request...")
        this.getDrink()
    }
    getDrink() {
        console.log("Soft Drink: Drink delivered!")
    }
}