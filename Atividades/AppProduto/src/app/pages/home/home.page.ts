import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoFirebaseService } from 'src/app/services/produto.firebase.service';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  produtos: Produto[];
  provedores: Provedor[];
  disableCadProd = true;

  constructor(private router: Router,
  private provedorFs: ProvedorFirebaseService,
  private produtoFs: ProdutoFirebaseService) {
    this.produtoFs.readProdutos()
    .subscribe(res => {
      this.produtos = res.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Produto
        } as Produto));
    });

    this.provedorFs.readProvedores()
    .subscribe(res => {
      this.provedores = res.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Provedor
        } as Provedor));
    });
  }

  irParaProvedores() {
    this.router.navigate(['/provedores']);
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-produto']);
  }

  detalhesProduto(produto: Produto) {
    this.router.navigateByUrl('/detalhes-produto',
    {state: {objeto:produto}});
  }
}
