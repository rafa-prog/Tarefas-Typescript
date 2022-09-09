import { Injectable } from '@angular/core';
import { genId } from '../models/FGenId';
import { Provedor } from '../models/provedor';

@Injectable({
  providedIn: 'root'
})

export class ProvedorService {
  private _provedores: Provedor[] = []

  constructor() { }

  createProvedor(provedor: Provedor) {
    provedor.id = genId()
    this._provedores.push(provedor);
  }

  readProvedor(): Provedor[] {
    return this._provedores
  }

  updateProvedor(id: string, provedor: Provedor) {
    for(let p of this._provedores) {
      if(p.id === id) {
        p.nome = provedor.nome
        p.titulo = provedor.titulo
        p.cnpj = provedor.cnpj
        p.cep = provedor.cep
        p.endereco = provedor.endereco
        p.telefone = provedor.telefone
        p.dataContrato = provedor.dataContrato

        return true
      }
    }
  }

  deleteProvedor(id: string) {
    let i: number = 0
    for(let p of this._provedores) {
      if(p.id === id) {
        this._provedores.splice(i, 1)

        return true
      }

      i++
    }
  }
}
