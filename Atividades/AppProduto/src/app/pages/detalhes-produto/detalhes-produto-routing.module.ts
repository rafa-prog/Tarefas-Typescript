import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesProdutoPage } from './detalhes-produto.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesProdutoPageRoutingModule {}
