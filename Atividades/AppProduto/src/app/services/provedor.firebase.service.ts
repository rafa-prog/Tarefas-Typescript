import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Provedor } from '../models/provedor';

@Injectable({
  providedIn: 'root'
})
export class ProvedorFirebaseService {
  private path = 'provedores';

  constructor(
    private afs: AngularFirestore,
    private aFStorage: AngularFireStorage,) { }

  createProvedor(provedor: Provedor) {
    return this.afs
    .collection(this.path)
    .add({
      nome: provedor.nome,
      titulo: provedor.titulo,
      cnpj: provedor.cnpj,
      cep: provedor.cep,
      endereco: provedor.endereco,
      telefone: provedor.telefone,
      dataContrato: provedor.dataContrato
    });
  }

  readProvedores() {
    return this.afs
    .collection(this.path)
    .snapshotChanges();
  }

  readProvedor(id: string) {
    return this.afs
    .collection(this.path)
    .doc(id)
    .valueChanges();
  }

  updateProvedor(provedor: Provedor, id: string) {
    return this.afs
    .collection(this.path)
    .doc(id)
    .update({
      nome: provedor.nome,
      titulo: provedor.titulo,
      cnpj: provedor.cnpj,
      cep: provedor.cep,
      endereco: provedor.endereco,
      telefone: provedor.telefone,
      dataContrato: provedor.dataContrato
    });
  }

  deleteProvedor(provedor: Provedor) {
    return this.afs
    .collection(this.path)
    .doc(provedor.id)
    .delete();
  }
}
