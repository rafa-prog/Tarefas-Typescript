import { Injectable } from '@angular/core';
import { Provedor } from '../models/provedor';

@Injectable({
  providedIn: 'root'
})
export class ProvedorService {
  private _provedores: Provedor[] = []

  constructor() { 
    this.createProvedor(new Provedor("TIM"))
    this.createProvedor(new Provedor("Claro"))
    this.createProvedor(new Provedor("Oi"))
  }

  createProvedor(provedor: Provedor) {
    this._provedores.push(provedor);
  }

  readProvedor(): Provedor[] {
    return this._provedores
  }

  updateProvedor() {
    
  }

  deleteProvedor() {
    
  }
}
