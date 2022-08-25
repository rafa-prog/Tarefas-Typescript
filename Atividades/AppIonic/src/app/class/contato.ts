export class Contato {
    private _nome: string
    private _telefone: number
    private _genero: string
    private _dataNascimento: string
    private _info: boolean

    constructor(nome: string, telefone: number, genero: string, dataNascimento: string) {
        this.nome = nome
        this.telefone = telefone
        this._genero = genero
        this._dataNascimento = dataNascimento
        this._info = false
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

    public get genero(): string {
        return this._genero
    }

    public set genero(value: string) {
        this._genero = value
    }

    public get dataNascimento(): string {
        return this._dataNascimento
    }

    public set dataNascimento(value: string) {
        this._dataNascimento = value
    }

    public get info(): boolean {
        return this._info
    }
    
    public set info(value: boolean) {
        this._info = value
    }

}
