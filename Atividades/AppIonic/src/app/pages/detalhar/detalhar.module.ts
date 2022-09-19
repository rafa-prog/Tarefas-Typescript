import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharPageRoutingModule } from './detalhar-routing.module';

import { DetalharPage } from './detalhar.page';
import { BrMaskerModule } from 'br-mask';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [DetalharPage]
})
export class DetalharPageModule {}
