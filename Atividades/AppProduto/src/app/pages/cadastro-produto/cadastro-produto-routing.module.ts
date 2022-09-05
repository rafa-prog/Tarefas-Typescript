import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroProdutoPage } from './cadastro-produto.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroProdutoPageRoutingModule {}
