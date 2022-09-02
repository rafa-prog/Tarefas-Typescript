import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroProvedorPage } from './cadastro-provedor.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroProvedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroProvedorPageRoutingModule {}
