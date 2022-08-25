import { Injectable } from '@angular/core';
import { Contato } from '../class/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos: Contato[] = [];

  constructor() { }

  public get contatos(): Contato[] {
    return this._contatos;
  }

  public addContatos(contato: Contato) {
    this._contatos.push(contato);
  }
}