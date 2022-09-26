import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Produto } from '../models/produto';
import { finalize } from 'rxjs/operators';
import { Provedor } from '../models/provedor';

@Injectable({
  providedIn: 'root'
})
export class ProdutoFirebaseService {
  private provedorId = ''
  private path =`provedores/${this.provedorId}/produtos`;

  constructor(
    private afs: AngularFirestore,
    private aFStorage: AngularFireStorage,) { }

  createProduto(produto: Produto) {
    console.log(produto.provedor.id)
    return this.afs
    .collection(`provedores/${produto.provedor.id}/produtos`)
    .add({
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

  readProdutos(provedor: Provedor) {
    this.provedorId = provedor.id
    return this.afs
    .collection(this.path)
    .snapshotChanges();
  }

  readProduto(provedor: Provedor, id: string) {
    this.provedorId = provedor.id
    return this.afs
    .collection(this.path)
    .doc(id)
    .valueChanges();
  }

  updateProduto(produto: Produto, id: string) {
    this.provedorId = produto.provedor.id
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
    this.provedorId = produto.provedor.id
    return this.afs
    .collection(this.path)
    .doc(produto.id)
    .delete();
  }

  deleteByProvedor(provedor: Provedor) {
    this.provedorId = provedor.id
  }

  enviarImg(img: any, produto: Produto) {
    this.provedorId = produto.provedor.id
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
      });
    }))
    .subscribe();
    return task;
  }

  updateImg(img: any, produto: Produto) {
    this.provedorId = produto.provedor.id

    const updateImgRef = this.aFStorage.refFromURL(produto.downloadURL).delete()

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
