/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoFirebaseService } from 'src/app/services/produto.firebase.service';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  isSubmitted = false;
  formCadProd: FormGroup;

  provedores: Provedor[];
  imagem: any;
  data: string;

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private loadingCtrl: LoadingController,
  private alertController: AlertController,
  private provedorFs: ProvedorFirebaseService,
  private produtoFs: ProdutoFirebaseService) { }

  ngOnInit() {
    this.data = new Date().toISOString();

    this.provedorFs.readProvedores()
    .subscribe(res => {
      this.provedores = res.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Provedor
        } as Provedor));
    });

    this.formInit();
  }

  formInit() {
    this.formCadProd = this.formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.minLength(4)]],
        provedor: ['', [Validators.required]],
        info: ['', [Validators.required]],
        quantidade: ['', [Validators.required, Validators.min(1)]],
        preco: ['', [Validators.required, Validators.min(0.1)]],
        retornoProvedor: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        dataCompra: ['', [Validators.required]],
        imagem: ['', [Validators.required]],
      });
  }

  get errorControl() {
    return this.formCadProd.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if(!this.formCadProd.valid) {
      this.presentAlert('Cadastro', 'Erro', 'Todos os campos são obrigatórios!');
      return false;
    }

    this.cadastrar();
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  private cadastrar() {
    this.showLoading('Aguarde', 10000);
    this.produtoFs.enviarImg(this.imagem, this.formCadProd.value)
    .then(() => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Produto', 'Cadastro', 'Produto cadastrado!');
      this.router.navigate(['/produtos']);
    })
    .catch((err) => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Produto', 'Erro', 'Erro no cadastro!');
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
}
