import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvedoresPageRoutingModule } from './provedores-routing.module';

import { ProvedoresPage } from './provedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvedoresPageRoutingModule
  ],
  declarations: [ProvedoresPage]
})
export class ProvedoresPageModule {}
