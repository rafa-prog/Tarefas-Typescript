import SanduicheBuilder from "./builders/SanduicheBuilder";
import Director from "./directors/Director";
import Sanduiche from "./products/Sanduiche";

const builder: SanduicheBuilder = new SanduicheBuilder()
const director: Director = new Director(builder)

director.constructXis()
let hotDog: Sanduiche = builder.getSanduiche()
console.log("Criando um sanduíche do tipo: " + hotDog.sanduicheType)
console.log("Pão: " + hotDog.bread)
console.log("Proteína: " + hotDog.protein)
console.log("Salada: " + hotDog.saladsTotal)

builder.reset()
