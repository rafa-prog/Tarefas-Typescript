/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Provedor } from 'src/app/models/provedor';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';

@Component({
  selector: 'app-detalhes-provedor',
  templateUrl: './detalhes-provedor.page.html',
  styleUrls: ['./detalhes-provedor.page.scss'],
})

export class DetalhesProvedorPage implements OnInit {
  disabled = true;

  formDetProv: FormGroup;
  provedor: Provedor;
  id: string;

  data: string;

  isSubmitted = false;

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private loadingCtrl: LoadingController,
  private alertController: AlertController,
  private provedorFs: ProvedorFirebaseService) { }

  get errorControl() {
    return this.formDetProv.controls;
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.provedor = nav.extras.state.objeto;
    this.data = new Date().toISOString();

    this.disabled = true;
    this.formInit()
  }

  formInit() {
    this.formDetProv = this.formBuilder.group(
      {
        nome: [this.provedor.nome, [Validators.required, Validators.minLength(4)]],
        titulo: [this.provedor.titulo],
        cnpj: [this.provedor.cnpj, [Validators.required, Validators.minLength(14)]],
        cep: [this.provedor.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
        endereco: [this.provedor.endereco, [Validators.required, Validators.minLength(8)]],
        telefone: [this.provedor.telefone, [Validators.required, Validators.minLength(14)]],
        dataContrato: [this.provedor.dataContrato, [Validators.required]],
      });
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if(!this.formDetProv.valid) {
      this.presentAlert('Agenda', 'Erro', 'Todos os campos são obrigatórios!');
      return false;
    }

    this.salvar();
  }

  editar() {
    this.disabled = !this.disabled;
  }

  excluir() {
    this.presentAlertConfirm('Agenda', 'Excluir contato',
    'Você realmente deseja exlcuir contato?');
  }

  salvar() {
    this.data = this.data.split('T')[0];
    this.showLoading('Aguarde', 10000);
    this.provedorFs.updateProvedor(this.formDetProv.value, this.provedor.id)
    .then(() => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Agenda', '', 'Edição realizada com sucesso');
      this.router.navigate(['/provedores']);
    })
    .catch((err) => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Agenda', 'Erro', 'Contato não encontrado!');
      console.log(err);
    });
  }

  private excluirProduto() {
    this.provedorFs.deleteProvedor(this.provedor)
    .then(() => {
      this.presentAlert('Agenda', 'Excluir', 'Exclusão do contato realizada!');
      this.router.navigate(['/provedores']);
    })
    .catch((err) => {
      this.presentAlert('Agenda', 'Erro', 'Contato não encontrado!');
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
