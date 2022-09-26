import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';


@Component({
  selector: 'app-cadastro-provedor',
  templateUrl: './cadastro-provedor.page.html',
  styleUrls: ['./cadastro-provedor.page.scss'],
})

export class CadastroProvedorPage implements OnInit {
  isSubmitted = false;
  formCadProv: FormGroup;

  data: string;

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private loadingCtrl: LoadingController,
  private alertController: AlertController,
  private provedorFs: ProvedorFirebaseService) { }

  ngOnInit() {
    this.data = new Date().toISOString();
    this.formInit();
  }

  formInit() {
    this.formCadProv = this.formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.minLength(4)]],
        titulo: [''],
        cnpj: ['', [Validators.required, Validators.minLength(14)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
        endereco: ['', [Validators.required, Validators.minLength(8)]],
        telefone: ['', [Validators.required, Validators.minLength(14)]],
        dataContrato: ['', [Validators.required]],
      });
  }

  get errorControl() {
    return this.formCadProv.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if(!this.formCadProv.valid) {
      this.presentAlert('Provedor', 'Erro', 'Todos os campos são obrigatórios!');
      return false;
    }

    this.cadastrar();
  }

  private cadastrar() {
    this.showLoading('Aguarde', 10000);
    this.provedorFs.createProvedor(this.formCadProv.value)
    .then(() => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Provedor', 'Cadastro', 'Provedor cadastrado!');
      this.router.navigate(['/provedores']);
    })
    .catch((err) => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Provedor', 'Erro', 'Erro no cadastro!');
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
