import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesProdutoPageRoutingModule } from './detalhes-produto-routing.module';

import { DetalhesProdutoPage } from './detalhes-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesProdutoPageRoutingModule
  ],
  declarations: [DetalhesProdutoPage]
})
export class DetalhesProdutoPageModule {}
