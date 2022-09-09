import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroProvedorPageRoutingModule } from './cadastro-provedor-routing.module';

import { CadastroProvedorPage } from './cadastro-provedor.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroProvedorPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [CadastroProvedorPage]
})
export class CadastroProvedorPageModule {}
