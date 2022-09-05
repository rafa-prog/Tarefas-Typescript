import IBuilder from "../builders/IBuilder";
import Bread from "../components/Bread";
import Protein from "../components/Protein";
import Salad from "../components/Salad";
import SanduicheType from "../components/SanduicheType";
import Sauce from "../components/Sauce";

export default class Director{
    constructor(private _builder: IBuilder){}

    constructHotDog(){
        this._builder.setSanduicheType(SanduicheType.HOTDOG)
        this._builder.setBread(Bread.HOTDOG)
        this._builder.setProtein(Protein.SALSICHA)

        this._builder.addSalad(Salad.PALMITO)
        this._builder.addSalad(Salad.MILHO)

        this._builder.addSauce(Sauce.MAIONESE)
        this._builder.addSauce(Sauce.MOSTARDA)
    }

    constructXis(){
        this._builder.setSanduicheType(SanduicheType.XIS)
        this._builder.setBread(Bread.HAMBURGUER)
        this._builder.setProtein(Protein.SOJA)

        this._builder.addSalad(Salad.ALFACE)
        this._builder.addSalad(Salad.MILHO)
        this._builder.addSalad(Salad.PEPINO)
        this._builder.addSalad(Salad.TOMATE)

        this._builder.addSauce(Sauce.KETCHUP)
        this._builder.addSauce(Sauce.MAIONESE)
    }
}