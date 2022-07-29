import Caretaker from "./managers/Caretaker";
import Originator from "./managers/Originator";

function generateMemento(originator: Originator, newState: String) {
    originator.alterState(newState)
    console.log()
}

function saveMemento(caretaker: Caretaker) {
    caretaker.backup()
    console.log()
}

function showMemento(caretaker: Caretaker) {
    caretaker.getSaveStates()
    console.log()
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

let originator = new Originator("inicial")
let caretaker = new Caretaker(originator)
console.log()

generateMemento(originator, "estado1")
showMemento(caretaker)
generateMemento(originator, "estado2")
saveMemento(caretaker)
showMemento(caretaker)

let loop = 10

for(let i = 0; i < loop; i++){
    let Symbols: String = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result: String = ""
    for(let j = 0; j < 6; j++){
        result += Symbols.charAt(Math.floor(Math.random() * Symbols.length));
    }
    sleep(Math.random() * (6000 - 1000) + 1000)
    generateMemento(originator, result)
    saveMemento(caretaker)
    showMemento(caretaker)
}


