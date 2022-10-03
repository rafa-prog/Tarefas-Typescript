/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Produto } from 'src/app/models/produto';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoFirebaseService } from 'src/app/services/produto.firebase.service';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';


@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.page.html',
  styleUrls: ['./detalhes-produto.page.scss'],
})
export class DetalhesProdutoPage implements OnInit {
  disabled = true;

  formDetProd: FormGroup;
  produto: Produto;
  provedor: any;

  provedores: Provedor[];
  provedorId: string;
  upload:boolean;
  imagem: any;
  link: string
  data: string;

  isSubmitted = false;

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private loadingCtrl: LoadingController,
  private alertController: AlertController,
  private produtoFs: ProdutoFirebaseService,
  private provedorFs: ProvedorFirebaseService) {
    this.provedorFs.readProvedores()
    .subscribe(res => {
      this.provedores =  res.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Provedor
        } as Provedor));
    });

    console.log(this.provedores);
  }

  async ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.produto = nav.extras.state.objProd;
    this.data = new Date().toISOString();

    this.provedorFs.readProvedores()
    .subscribe(res => {
      this.provedores = res.map(p => ({
          id: p.payload.doc.id,
          ...p.payload.doc.data() as Provedor
        } as Provedor));
    });
    
    this.provedorId = this.produto.provedor.toString()
    
    this.provedorFs.readProvedor(this.provedorId)
    .subscribe(data=>{
      this.produto.provedor = data as Provedor;
    });

    this.upload = false;
    this.disabled = true
    this.formInit();
  }

  formInit() {
    this.formDetProd = this.formBuilder.group(
      { 
        nome: [this.produto.nome, [Validators.required, Validators.minLength(4)]],
        provedor: [this.provedorId, [Validators.required]],
        info: [this.produto.info, [Validators.required]],
        quantidade: [this.produto.quantidade, [Validators.required, Validators.min(1)]],
        preco: [this.produto.preco, [Validators.required, Validators.min(0.1)]],
        retornoProvedor: [this.produto.retornoProvedor, [Validators.required, Validators.min(0), Validators.max(100)]],
        dataCompra: [this.produto.dataCompra, [Validators.required]],
      });
  }

  editar() {
    this.disabled = !this.disabled;
  }

  excluir() {
    this.presentAlertConfirm('Detalhes', 'Produto',
    'Você realmente deseja exlcuir o produto?');
  }

  get errorControl() {
    return this.formDetProd.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if(!this.formDetProd.valid) {
      this.presentAlert('Detalhes', 'Produto', 'Todos os campos são obrigatórios!');
      return false;
    }

    this.salvar();
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
    this.upload = true;
  }

  private salvar() {
    this.showLoading('Aguarde', 10000);
    if(this.upload) {
      this.produtoFs.updateImg(this.imagem, this.produto.downloadURL, this.formDetProd.value, this.formDetProd.controls['provedor'].value, this.produto.id)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Detalhes', 'Produto', 'Edição realizada com sucesso');
        this.router.navigate(['/produtos']);
      })
      .catch((err) => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Detalhes', 'Produto', 'Produto não encontrado!');
        console.log(err);
      });
    }else {
      this.produtoFs.updateProduto(this.produto.downloadURL, this.formDetProd.value, this.formDetProd.controls['provedor'].value, this.produto.id)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Detalhes', 'Atualizar', 'Produto atualizado');
        this.router.navigate(['/produtos']);
      })
      .catch((err) => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Detalhes', 'Erro', 'Erro ao atualizar!');
        console.log(err);
      });
      }
    }

  private excluirProduto() {
    this.produtoFs.deleteProduto(this.produto)
    .then(() => {
      this.presentAlert('Detalhes', 'Produto', 'Exclusão do produto realizada!');
      this.router.navigate(['/provedores']);
    })
    .catch((err) => {
      this.presentAlert('Detalhes', 'Produto', 'Produto não encontrado!');
      console.log(err);
    });
  }

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async presentAlert(titulo: string, subtitulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: texto,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertConfirm(titulo: string, subtitulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: texto,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.excluirProduto();
          },
        },
      ],
    });

    await alert.present();
  }
}
