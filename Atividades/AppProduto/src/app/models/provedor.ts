import { genId } from "./FGenId"

export class Provedor {
    private _id: string

    private _nome: string

    constructor(nome: string) {
        this._id = genId()
        this._nome = nome
    }

    public get id(): string {
        return this._id
    }

    public get nome(): string {
        return this._nome
    }

    public set nome(nome: string) {
        this._nome = nome
    }
}
