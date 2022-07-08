import IDrink from "./interfaces/IDrink";

export default class Beer implements IDrink{
    startReq() {
        console.log("Beer: Drink request...")
        this.getDrink()
    }
    getDrink() {
        console.log("Beer: Drink delivered!")
    }
}