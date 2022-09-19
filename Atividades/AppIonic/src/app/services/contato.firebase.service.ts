import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoFirebaseService {
  private PATH: string = 'contatos'

  constructor(private afs: AngularFirestore) {

  }

  readContatos() {
    return this.afs
    .collection(this.PATH)
    .snapshotChanges()
  }

  readContato(id: string) {
    return this.afs
    .collection(this.PATH)
    .doc(id)
    .valueChanges()
  }

  createContato(contato: Contato) {
    return this.afs
    .collection(this.PATH)
    .add({nome: contato.nome,
          telefone: contato.telefone,
          genero: contato.genero,
          dataNascimento: contato.dataNascimento})
  }

  updateContato(contato: Contato, id: string) {
    return this.afs
    .collection(this.PATH)
    .doc(id)
    .update({nome: contato.nome,
          telefone: contato.telefone,
          genero: contato.genero,
          dataNascimento: contato.dataNascimento})
  }
  
  deleteContato(contato: Contato) {
    return this.afs
    .collection(this.PATH)
    .doc(contato.id)
    .delete()
  }
}
