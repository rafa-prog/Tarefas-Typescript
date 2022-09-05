import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroProdutoPageRoutingModule } from './cadastro-produto-routing.module';

import { CadastroProdutoPage } from './cadastro-produto.page';

import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroProdutoPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [CadastroProdutoPage]
})
export class CadastroProdutoPageModule {}
