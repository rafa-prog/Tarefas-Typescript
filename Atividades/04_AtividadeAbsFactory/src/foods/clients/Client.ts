import IDrink from "../drink/interfaces/IDrink";
import IFood from "../food/interfaces/IFood";
import IDeliveryFactory from "../factories/interfaces/IDeliveryFactory";

export default class Client{
    private _drink : IDrink
    private _food : IFood

    constructor(factory : IDeliveryFactory){
        this._drink = factory.createDeliveryDrink()
        this._food = factory.createDeliveryFood()
    }

    startReq(){
        this._drink.startReq()
        this._food.startReq()
    }
}