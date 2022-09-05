import IDrink from "../../drink/interfaces/IDrink"
import IFood from "../../food/interfaces/IFood"

export default interface IDeliveryFactory{
    createDeliveryDrink() : IDrink
    createDeliveryFood() : IFood
}