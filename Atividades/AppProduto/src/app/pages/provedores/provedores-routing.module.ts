import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvedoresPage } from './provedores.page';

const routes: Routes = [
  {
    path: '',
    component: ProvedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvedoresPageRoutingModule {}
