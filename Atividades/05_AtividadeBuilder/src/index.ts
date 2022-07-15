import SanduicheBuilder from "./builders/SanduicheBuilder";
import Director from "./directors/Director";
import Sanduiche from "./products/Sanduiche";

const builder: SanduicheBuilder = new SanduicheBuilder()
const director: Director = new Director(builder)

director.constructHotDog()
let hotDog: Sanduiche = builder.getSanduiche()
console.log("Criando um sanduíche do tipo: " + hotDog.sanduicheType)
console.log("Pão: " + hotDog.bread)
console.log("Proteína: " + hotDog.protein)
console.log("Salada: " + hotDog.saladsTotal)

builder.reset()

director.constructXis()
let Xis: Sanduiche = builder.getSanduiche()
console.log("Criando um sanduíche do tipo: " + Xis.sanduicheType)
console.log("Pão: " + Xis.bread)
console.log("Proteína: " + Xis.protein)
console.log("Salada: " + Xis.saladsTotal)