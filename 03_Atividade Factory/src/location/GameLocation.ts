import Game from "./item/Game";
import I_Item from "./item/interface/I_Item";
import { Location } from "./Location";

export default class GameLocation extends Location{
    
    protected createItem(): I_Item {
        return new Game()
    }
}