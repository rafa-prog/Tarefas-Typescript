import Endereco from "./Endereco"
import Pessoa from "./Pessoa"

let endereco1 : Endereco = new Endereco ("São Paulo", 8900012, "Centro", "Duque de Caxias", 569)
let pessoa1 : Pessoa = new Pessoa("Carlos de Andrade", 12345678900, 7654321, 1, endereco1)

pessoa1.exibirInfo()

console.log("\n")

let endereco2 : Endereco = new Endereco ("Pato Branco", 8876522, "Centro", "Itacolomi", 760)
let pessoa2 : Pessoa = new Pessoa("Maria Silva", 33315422896, 5908362, 2, endereco2)

pessoa2.exibirInfo()


