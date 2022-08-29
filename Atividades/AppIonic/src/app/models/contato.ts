export class Contato {
    private _id: any
    private _nome: string
    private _telefone: number
    private _genero: string
    private _dataNascimento: string

    constructor(nome: string, telefone: number, genero: string, dataNascimento: string) {
        let chave = new Date()
        this._id = chave.getTime()
        this.nome = nome
        this.telefone = telefone
        this._genero = genero
        this._dataNascimento = dataNascimento
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

<<<<<<< HEAD
=======
    public get info(): boolean {
        return this._info
    }
    
    public set info(value: boolean) {
        this._info = value
    }

    public get id(): any {
        return this._id
    }

>>>>>>> 9294f91 (Commit update e delete)
}
