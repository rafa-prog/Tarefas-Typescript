import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private _produtos: Produto[] = []

  constructor() { }

  createProduto(produto: Produto) {
    this._produtos.push(produto);
  }

  readProdutos(): Produto[] {
    return this._produtos
  }

  updateProduto() {
    
  }

  deleteProduto() {
    
  }
}
