import { Location } from "./location/Location";
import GameLocation from "./location/GameLocation";
import MovieLocation from "./location/MovieLocation";

declare var process

let location : Location

if(process.argv.includes("game")){
    location = new GameLocation()
}else if(process.argv.includes("mov")){
    location = new MovieLocation()
}else{
    console.log("Especifique um tipo de locação")
}

if(location!){
    location.startItem()
}