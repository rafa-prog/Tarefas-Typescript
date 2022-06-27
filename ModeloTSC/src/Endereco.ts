export default class Endereco{

    private _rua: string
    private _numero : number
    private _cep: number
    private _bairro: string
    private _cidade : string


    constructor(cidade : string, cep: number, bairro: string, rua: string, numero : number){
        this._cidade = cidade
        this._cep = cep
        this._bairro = bairro
        this._rua = rua
        this._numero = numero
    }

    get rua() : string{
        return this._rua
    }

    set rua(rua : string){
        this._rua = rua
    }

    get numero() : number{
        return this._numero
    }

    set numero(numero : number){
        this._numero = numero
    }

    get cep() : number{
        return this._cep
    }

    set cep(cep : number){
        this._cep = cep
    }

    get bairro() : string{
        return this._bairro
    }

    set bairro(bairro : string){
        this._bairro = bairro
    }

    get cidade() : string{
        return this._cidade
    }

    set cidade(cidade : string){
        this._cidade = cidade
    }

    exibirEndereco(){
        console.log("Cidade: " + this.cidade)
        console.log("CEP: " + this.cep)
        console.log("Bairro: " + this.bairro)
        console.log("Rua: " + this.rua)
        console.log("Número: " + this.numero)
    }
}