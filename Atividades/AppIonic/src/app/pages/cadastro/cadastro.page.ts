import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContatoFirebaseService } from 'src/app/services/contato.firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  data: string
  imagem: any
  formCadastrar: FormGroup
  isSubmitted: boolean = false

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertController: AlertController, 
    private contatoFs: ContatoFirebaseService,) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    this.formInit()
  }

  formInit() {
    this.formCadastrar = this.formBuilder.group(
      {
        nome: ['', [Validators.required]],
        telefone: ['', [Validators.required, Validators.minLength(14)]],
        genero: ['', Validators.required],
        dataNascimento: ['', [Validators.required]],
        imagem: ['', [Validators.required]]
      })
  }

  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formCadastrar.valid) {
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios!")
      return false
    }

    this.cadastrar()
  }

  get errorControl() {
    return this.formCadastrar.controls
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }

  private cadastrar() {
    this.showLoading("Aguarde", 10000)
    this.contatoFs.enviarImg(this.imagem, this.formCadastrar.value)
    .then(() => {
      this.loadingCtrl.dismiss()
      this.presentAlert("Agenda", "", "Contato cadastrado")
      this.router.navigate(['/home'])
    })
    .catch((err) => {
      this.loadingCtrl.dismiss()
      this.presentAlert("Agenda", "Erro", "Erro no cadastro!")
      console.log(err)
    })
  }

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async presentAlert(header: string, subheader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  } 
}
