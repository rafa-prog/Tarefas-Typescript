import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProvedorService } from 'src/app/services/provedor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  produtos: Produto[]
  provedores: Provedor[]
  disableCadProd: boolean = true

  constructor(private router: Router,
  private provedorService: ProvedorService,
  private produtoService: ProdutoService) {
      this.produtos = produtoService.readProdutos()
      this.provedores = provedorService.readProvedor()
  }

  irParaProvedores() {
    this.router.navigate(['/provedores'])
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-produto'])
  }

  detalhesProduto(produto: Produto) {
    this.router.navigateByUrl('/detalhes-produto',
    {state: {objeto:produto}})
  }
}
