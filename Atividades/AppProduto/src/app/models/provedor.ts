/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
export class Provedor {
    private _id: string;

    private _nome: string;
    private _titulo: string;
    private _cnpj: number;
    private _cep: number;
    private _endereco: string;
    private _telefone: number;
    private _dataContrato: string;

    constructor(nome: string, titulo: string, cnpj: number, cep: number, endereco: string,
    telefone: number, dataContrato: string) {
        this._nome = nome;
        this._titulo = titulo;
        this._cnpj = cnpj;
        this._cep = cep;
        this._endereco = endereco;
        this._telefone = telefone;
        this._dataContrato = dataContrato;
    }

    public get id(): string {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(nome: string) {
        this._nome = nome;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public set titulo(value: string) {
        this._titulo = value;
    }

    public get cnpj(): number {
        return this._cnpj;
    }

    public set cnpj(value: number) {
        this._cnpj = value;
    }

    public get cep(): number {
        return this._cep;
    }

    public set cep(value: number) {
        this._cep = value;
    }

    public get endereco(): string {
        return this._endereco;
    }

    public set endereco(value: string) {
        this._endereco = value;
    }

    public get telefone(): number {
        return this._telefone;
    }

    public set telefone(value: number) {
        this._telefone = value;
    }

    public get dataContrato(): string {
        return this._dataContrato;
    }

    public set dataContrato(value: string) {
        this._dataContrato = value;
    }
}
