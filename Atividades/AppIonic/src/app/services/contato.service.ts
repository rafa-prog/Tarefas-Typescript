import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos: Contato[] = [];

  constructor() {
    let contato = new Contato("Rafael", 132, "masculino", "2002-10-10")
    this.addContatos(contato)
  }

  public get contatos(): Contato[] {
    return this._contatos;
  }

  public addContatos(contato: Contato) {
    this._contatos.push(contato);
  }
}