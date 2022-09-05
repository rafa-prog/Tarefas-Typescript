import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesProvedorPage } from './detalhes-provedor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesProvedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesProvedorPageRoutingModule {}
