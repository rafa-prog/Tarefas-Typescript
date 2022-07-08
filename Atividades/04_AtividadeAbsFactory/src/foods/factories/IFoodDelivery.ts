import IDeliveryFactory from "./interfaces/IDeliveryFactory"
import IDrink from "../drink/interfaces/IDrink"
import IFood from "../food/interfaces/IFood"
import SoftDrink from "../drink/SoftDrink"
import HotDog from "../food/HotDog"

export default class AiqFomeDelivery implements IDeliveryFactory{
    createDeliveryDrink(): IDrink {
        return new SoftDrink()
    }
    createDeliveryFood(): IFood {
        return new HotDog()
    }
}