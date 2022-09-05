import Client from "./foods/clients/Client";
import Company from "./foods/consts/Company";
import IDeliveryFactory from "./foods/factories/interfaces/IDeliveryFactory";
import AiqFomeDelivery from "./foods/factories/AiqFomeDelivery";
import IFoodDelivery from "./foods/factories/IFoodDelivery";

const currentCompany = Company.AIQ
let factory : IDeliveryFactory

switch (currentCompany){
    case Company.AIQ:
        factory = new AiqFomeDelivery()
        break
    case Company.IFOOD:
        factory = new IFoodDelivery()
        break
    default:
        throw new Error("Unknown company: " + currentCompany)
}

const client = new Client(factory!)
client.startReq()