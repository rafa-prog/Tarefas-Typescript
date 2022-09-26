import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatoFirebaseService } from 'src/app/services/contato.firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato: Contato
  
  formDetalhar: FormGroup
  
  data: string
  disabled: boolean
  isSubmitted: boolean = false

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private contatoFs: ContatoFirebaseService,
    private alertController: AlertController) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation()
    this.contato = nav.extras.state.objeto
    console.log(this.contato)
    this.data = new Date().toISOString()

    this.formDetalhar = this.formBuilder.group(
      {
        nome: [this.contato.nome, Validators.required],
        telefone: [this.contato.telefone, [Validators.required, Validators.minLength(14)]],
        genero: [this.contato.genero, Validators.required],
        dataNascimento: [this.contato.dataNascimento, Validators.required],
        imagem: [this.contato.downloadURL, [Validators.required]]
      })
    
    this.disabled = true
  }

  editar() {
    this.disabled = !this.disabled
  }

  salvar() {
    this.data = this.data.split('T')[0]
    this.showLoading("Aguarde", 10000)
    this.contatoFs.updateContato(this.formDetalhar.value, this.contato.id)
    .then(() => {
      this.loadingCtrl.dismiss()
      this.presentAlert("Agenda", "", "Edição realizada com sucesso")
      this.router.navigate(['/home'])
    })
    .catch((err) => {
      this.loadingCtrl.dismiss()
      this.presentAlert("Agenda", "Erro", "Contato não encontrado!")
      console.log(err) 
    })
  }

  excluir() {
    this.presentAlertConfirm("Agenda", "Excluir contato", 
    "Você realmente deseja exlcuir contato?")
  }

  private excluirContato() {
    this.contatoFs.deleteContato(this.contato)
    .then(() => {
      this.presentAlert("Agenda", "Excluir", "Exclusão do contato realizada!")
      this.router.navigate(['/home']) 
    })
    .catch((err) => {
      this.presentAlert("Agenda", "Erro", "Contato não encontrado!")
      console.log(err)
    })
  }
  
  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formDetalhar.valid) {
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios!")
      return false
    }

    this.salvar()
  }

  get errorControl() {
    return this.formDetalhar.controls
  }

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async presentAlertConfirm(header: string, subheader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
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
            this.excluirContato()
          },
        },
      ],
    });

    await alert.present();
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
