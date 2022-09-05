import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroProvedorPageRoutingModule } from './cadastro-provedor-routing.module';

import { CadastroProvedorPage } from './cadastro-provedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroProvedorPageRoutingModule
  ],
  declarations: [CadastroProvedorPage]
})
export class CadastroProvedorPageModule {}
