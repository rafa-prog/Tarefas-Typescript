export class Contato {
    private _nome: string
    private _telefone: number

    constructor(nome: string, telefone: number) {
        this.nome = nome
        this.telefone = telefone
    }

    public get nome(): string {
        return this._nome
    }
    public set nome(value: string) {
        this._nome = value
    }
    
    public get telefone(): number {
        return this._telefone
    }
    public set telefone(value: number) {
        this._telefone = value
    }

    
}
