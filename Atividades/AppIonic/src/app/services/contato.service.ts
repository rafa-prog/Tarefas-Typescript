import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos: Contato[] = [];

  constructor() {
    let contato = new Contato("Rafael", 132, "masculino", "2002-10-10")
    this.addContato(contato)
  }

  public get contatos(): Contato[] {
    return this._contatos;
  }

  public addContato(contato: Contato) {
    this._contatos.push(contato);
  }

  public updateContatos(contato: Contato, nome: string,
    telefone: number, genero: string, dataNascimento: string): boolean {
      
    for(let c of this._contatos) {
      if(c.id === contato.id) {
        c.nome = nome
        c.telefone = telefone
        c.genero = genero
        c.dataNascimento = dataNascimento
        return true
      }
    }

    return false
  }

  public deleteContato(contato: Contato): boolean {
    for(let i = 0; i < this._contatos.length; i++) {
      if(this._contatos[i].id === contato.id) {
        this._contatos.splice(i, 1)
        return true
      }
    }

    return false
  }
}