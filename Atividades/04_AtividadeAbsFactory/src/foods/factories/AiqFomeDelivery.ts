import IDeliveryFactory from "./interfaces/IDeliveryFactory"
import IDrink from "../drink/interfaces/IDrink"
import IFood from "../food/interfaces/IFood"
import Beer from "../drink/Beer"
import Hamburguer from "../food/Hamburguer"

export default class AiqFomeDelivery implements IDeliveryFactory{
    createDeliveryDrink(): IDrink {
        return new Beer()
    }
    createDeliveryFood(): IFood {
        return new Hamburguer()
    }
}