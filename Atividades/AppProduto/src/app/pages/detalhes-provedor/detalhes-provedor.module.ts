import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesProvedorPageRoutingModule } from './detalhes-provedor-routing.module';

import { DetalhesProvedorPage } from './detalhes-provedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesProvedorPageRoutingModule
  ],
  declarations: [DetalhesProvedorPage]
})
export class DetalhesProvedorPageModule {}
