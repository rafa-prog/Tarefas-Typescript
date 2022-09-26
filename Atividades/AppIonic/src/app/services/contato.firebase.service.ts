import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contato } from '../models/contato';
import { finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ContatoFirebaseService {
  private PATH: string = 'contatos'

  constructor(
    private afs: AngularFirestore, 
    private aFStorage: AngularFireStorage,) { }

  createContato(contato: Contato) {
    return this.afs
    .collection(this.PATH)
    .add({
      nome: contato.nome,
      telefone: contato.telefone,
      genero: contato.genero,
      dataNascimento: contato.dataNascimento,
      downloadURL: contato.downloadURL
    })
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

  updateContato(contato: Contato, id: string) {
    return this.afs
    .collection(this.PATH)
    .doc(id)
    .update({
      nome: contato.nome,
      telefone: contato.telefone,
      genero: contato.genero,
      dataNascimento: contato.dataNascimento,
      downloadURL: contato.downloadURL
    })
  }
  
  deleteContato(contato: Contato) {
    return this.afs
    .collection(this.PATH)
    .doc(contato.id)
    .delete()
  }

  enviarImg(img: any, contato: Contato) {
    const file = img.item(0)
    if(file.type.split('/')[0] !== 'image') {
      console.error("Tipo não suportado!")
      return
    }

    const path = `images/${new Date().getTime()}_${file.name}`
    const fileRef = this.aFStorage.ref(path)
    let task = this.aFStorage.upload(path, file)

    task
    .snapshotChanges()
    .pipe(finalize(() => {
      let uploadedFileURL = fileRef.getDownloadURL()
      uploadedFileURL.subscribe((res) => {
        contato.downloadURL = res
        this.createContato(contato)
      })
    }))
    .subscribe()
    return task
  }
}
