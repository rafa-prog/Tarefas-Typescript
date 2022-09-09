import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesProvedorPageRoutingModule } from './detalhes-provedor-routing.module';

import { DetalhesProvedorPage } from './detalhes-provedor.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesProvedorPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [DetalhesProvedorPage]
})
export class DetalhesProvedorPageModule {}
