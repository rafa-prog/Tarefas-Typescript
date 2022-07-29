import IConsole from "./platforms/IConsole";
import Playstation from "./platforms/Playstation";
import Xbox from "./platforms/Xbox";
import AdvancedPlay from "./plays/AdvancedPlay";
import Play from "./plays/Play";

function startPlay(oconsole: IConsole) {
    console.log("Aguarde...")
    const play = new Play(oconsole)
    play.playing()
    play.result()
}

function startAdvancedPlay(oconsole: IConsole) {
    console.log("Aguarde...")
    const play = new AdvancedPlay(oconsole)
    play.playing()
    play.result()
    play.challenge()
}

startPlay(new Playstation)
startPlay(new Xbox)

startAdvancedPlay(new Playstation)
startAdvancedPlay(new Xbox)