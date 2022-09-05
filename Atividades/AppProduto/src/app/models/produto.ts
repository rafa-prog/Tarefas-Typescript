import { genId } from "./FGenId"
import { Provedor } from "./provedor"

export class Produto {
    private _id: string

    private _nome: string
    private _provedor: Provedor
    private _info: string
    private _quantidade: number
    private _preco: number
    private _retornoProvedor: number
    private _dataCompra: string

    constructor(nome: string, provedor: Provedor, 
    info: string, quantidade: number, preco: number, 
    retornoProvedor: number, dataCompra: string) {
        this._id = genId()
        this._nome = nome
        this._provedor = provedor
        this._info = info
        this._quantidade = quantidade
        this._preco = preco
        this._retornoProvedor = retornoProvedor
        this._dataCompra = dataCompra
    }

    public get id(): string {
        return this._id
    }

    public set id(value: string) {
        this._id = value
    }
    
    public get nome() : string {
        return this._nome
    }

    public set nome(nome: string) {
        this._nome = nome
    }

    public get provedor(): Provedor {
        return this._provedor
    }

    public set provedor(provedor: Provedor) {
        this._provedor = provedor
    }

    public get info(): string {
        return this._info
    }

    public set info(info: string) {
        this._info = info
    }

    public get quantidade(): number {
        return this._quantidade
    }

    public set quantidade(quantidade: number) {
        this._quantidade = quantidade
    }
    
    public get preco(): number {
        return this._preco
    }

    public set preco(preco: number) {
        this._preco = preco
    }

    public get retornoProvedor(): number {
        return this._retornoProvedor
    }

    public set retornoProvedor(retornoProvedor: number) {
        this._retornoProvedor = retornoProvedor
    }
    
    public get dataCompra() : string {
        return this._dataCompra
    }

    public set dataCompra(dataCompra: string) {
        this._dataCompra = dataCompra
    }
}
