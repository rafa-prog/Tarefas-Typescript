import I_Item from "./item/interface/I_Item";
import Movie from "./item/Movie";
import { Location } from "./Location";

export default class MovieLocation extends Location{
    
    protected createItem(): I_Item {
        return new Movie()
    }
}