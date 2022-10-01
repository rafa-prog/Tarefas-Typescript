import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { where } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Produto } from '../models/produto';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoFirebaseService {
  private path ='produtos';

  constructor(
    private afs: AngularFirestore,
    //private provedorFs: ProvedorFirebaseService,
    private aFStorage: AngularFireStorage,) { }

  createProduto(produto: Produto, provedor: any) {
    return this.afs
    .collection(this.path)
    .add({
      nome: produto.nome,
      provedor: provedor,
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

  updateProduto(link: string, produto: Produto, provedor: any, id: string) {
    return this.afs
    .collection(this.path)
    .doc(id)
    .update({
      nome: produto.nome,
      provedor: provedor,
      info: produto.info,
      quantidade: produto.quantidade,
      preco: produto.preco,
      retornoProvedor: produto.retornoProvedor,
      dataCompra: produto.dataCompra,
      downloadURL: link
    });
  }

  deleteProduto(produto: Produto) {
    return this.afs
    .collection(this.path)
    .doc(produto.id)
    .delete();
  }

  enviarImg(img: any, produto: Produto, provedorId: string) {
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
        
        this.createProduto(produto, provedorId);
      });
    }))
    .subscribe();
    return task;
  }

  updateImg(img: any, link: string, produto: Produto, provedor: any, id: string) {

    const firePath = 'https://firebasestorage.googleapis.com/v0/b/appproduto-5be2b.appspot.com/o/'
    
    let imagePath:string = link.replace(firePath,"");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0,indexOfEndPath);
    
    imagePath = imagePath.replace("%2F","/");

    const deleteImg = 
    this.aFStorage.storage.ref(imagePath)
    .delete()
    .then()
    .catch((err) => {
      console.error(err)
    })


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
        this.updateProduto(res, produto, provedor, id);
      });
    }))
    .subscribe();
    return task;
  }

}