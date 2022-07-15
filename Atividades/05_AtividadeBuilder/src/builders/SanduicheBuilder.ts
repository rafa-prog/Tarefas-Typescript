import Bread from "../components/Bread";
import Protein from "../components/Protein";
import Salad from "../components/Salad";
import Sauce from "../components/Sauce";
import Sanduiche from "../products/Sanduiche";
import IBuilder from "./IBuilder";

export default class SanduicheBuilder implements IBuilder{
    private _sanduiche = new Sanduiche()

    reset(): void {
        this._sanduiche = new Sanduiche()
    }
    getSanduiche() : Sanduiche {
        return this._sanduiche
    }
    setSanduiche(values: Sanduiche) {
        this._sanduiche = values
    }
    setBread(bread: Bread) {
        this._sanduiche.bread = bread
        console.log("teste " + this._sanduiche.bread)
    }
    setProtein(protein: Protein) {
        this._sanduiche.protein = protein
    }
    addSalad(salad: Salad) {
        this._sanduiche.addSalad(salad)
    }
    addSauce(sauce: Sauce) {
        this._sanduiche.addSauce(sauce)
    }

}