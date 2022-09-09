import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { genId } from "../models/FGenId"
import { Provedor } from '../models/provedor';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private _produtos: Produto[] = []

  constructor() { }

  createProduto(produto: Produto) {
    produto.id = genId()
    this._produtos.push(produto);
  }

  readProdutos(): Produto[] {
    return this._produtos
  }

  updateProduto(id: string, produto: Produto): boolean {
    for(let p of this._produtos) {
      if(p.id === id) {
        p.nome = produto.nome
        p.provedor = produto.provedor
        p.info = produto.info
        p.quantidade = produto.quantidade
        p.preco = produto.preco
        p.retornoProvedor = produto.retornoProvedor
        p.dataCompra = produto.dataCompra

        return true
      }
    }
  }

  deleteProduto(id: string) {
    let i: number = 0
    for(let p of this._produtos) {
      if(p.id === id) {
        this._produtos.splice(i, 1)

        return true
      }

      i++
    }
  }

  deleteByProvedor(provedor: Provedor) {
    let i = 0
    for(let p of this._produtos) {
      if(p.provedor.id === provedor.id) {
        this._produtos.splice(i, 1)
        i--
      }
      
      i++
    }
  }
}
