import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { where } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Produto } from '../models/produto';
import { finalize } from 'rxjs/operators';
import { Provedor } from '../models/provedor';

@Injectable({
  providedIn: 'root'
})
export class ProdutoFirebaseService {
  private path ='produtos';

  constructor(
    private afs: AngularFirestore,
    private aFStorage: AngularFireStorage,) { }

  createProduto(produto: Produto) {
    return this.afs
    .collection(this.path)
    .add({
      nome: produto.nome,
      provedor: `provedores/${produto.id}`,
      info: produto.info,
      quantidade: produto.quantidade,
      preco: produto.preco,
      retornoProvedor: produto.retornoProvedor,
      dataCompra: produto.dataCompra,
      downloadURL: produto.downloadURL
    });
  }

  readProdutos() {
    return this.afs
    .collection(this.path)
    .snapshotChanges();
  }

  readProduto(id: string) {
    return this.afs
    .collection(this.path)
    .doc(id)
    .valueChanges();
  }

  updateProduto(produto: Produto, id: string) {
    return this.afs
    .collection(this.path)
    .doc(id)
    .update({
      nome: produto.nome,
      provedor: produto.provedor,
      info: produto.info,
      quantidade: produto.quantidade,
      preco: produto.preco,
      retornoProvedor: produto.retornoProvedor,
      dataCompra: produto.dataCompra,
      downloadURL: produto.downloadURL
    });
  }

  deleteProduto(produto: Produto) {
    return this.afs
    .collection(this.path)
    .doc(produto.id)
    .delete();
  }

  deleteByProvedor(provedor: Provedor) {
    //
  }

  enviarImg(img: any, produto: Produto) {
    const file = img.item(0);
    if(file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado!');
      return;
    }

    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.aFStorage.ref(path);
    const task = this.aFStorage.upload(path, file);

    task
    .snapshotChanges()
    .pipe(finalize(() => {
      const uploadedFileURL = fileRef.getDownloadURL();
      uploadedFileURL.subscribe((res) => {
        produto.downloadURL = res;
        this.createProduto(produto);
        console.log(produto.provedor.id);
      });
    }))
    .subscribe();
    return task;
  }

  updateImg(img: any, produto: Produto) {
    const updateImgRef = this.aFStorage.refFromURL(produto.downloadURL).delete();

    const file = img.item(0);
    if(file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado!');
      return;
    }

    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.aFStorage.ref(path);
    const task = this.aFStorage.upload(path, file);

    task
    .snapshotChanges()
    .pipe(finalize(() => {
      const uploadedFileURL = fileRef.getDownloadURL();
      uploadedFileURL.subscribe((res) => {
        produto.downloadURL = res;
        this.updateProduto(produto, produto.id);
      });
    }))
    .subscribe();
    return task;
  }

}
