import Bread from "../components/Bread"
import Protein from "../components/Protein"
import Salad from "../components/Salad"
import SanduicheType from "../components/SanduicheType"
import Sauce from "../components/Sauce"


export default class Sanduiche{
    private _sanduicheType: SanduicheType
    private _bread: Bread
    private _protein: Protein
    private _salads: Salad[] = []
    private _sauces: Sauce[] = []

    get sanduicheType(): SanduicheType{
        return this._sanduicheType
    }

    set sanduicheType(value: SanduicheType){
        this._sanduicheType = value
    }

    get bread(): Bread{
        return this._bread
    }

    set bread(value: Bread){
        this._bread = value
    }

    get protein(): Protein{
        return this._protein
    }

    set protein(value: Protein){
        this._protein = value
    }

    addSalad(salad: Salad) {
        this._salads.push(salad)
    }

    get salad(): Salad[] {
        return this._salads
    }

    get saladsTotal() : number {
        return this._salads.length
    }

    addSauce(sauce: Sauce) {
        this._sauces.push(sauce)
    }

    get sauce(): Sauce[] {
        return this._sauces
    }

    get saucesTotal() : number {
        return this._sauces.length
    }
}