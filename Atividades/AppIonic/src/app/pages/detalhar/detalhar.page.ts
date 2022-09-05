import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato: Contato
  nome: string
  telefone: number
  genero: string
  dataNascimento: string
  data: string
  disabled: boolean

  constructor(private router: Router,
    private alertController: AlertController,
    private contatoService: ContatoService) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    const nav = this.router.getCurrentNavigation()
    this.contato = nav.extras.state.objeto
    console.log(this.contato)
    this.nome = this.contato.nome
    // nome: ['', Validators.required],
    this.telefone = this.contato.telefone
    this.genero = this.contato.genero
    this.dataNascimento = this.contato.dataNascimento
    this.disabled = true
  }

  editar() {
    this.disabled = !this.disabled
  }

  salvar() {
    this.dataNascimento = this.dataNascimento.split('T')[0]
    if(this.validar(this.nome) && this.validar(this.telefone)
    && this.validar(this.genero) && this.validar(this.dataNascimento)) {

      if(this.contatoService.updateContatos(this.contato, this.nome, 
        this.telefone, this.genero, this.dataNascimento)) {

        this.presentAlert("Agenda", "", "Edição realizada com sucesso")
        this.router.navigate(['/home'])
      }else {
        this.presentAlert("Agenda", "Erro", "Contato não encontrado!")          
      }
    } 
    else{
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios!")
    }
  }

  excluir() {
    this.presentAlertConfirm("Agenda", "Excluir contato", 
    "Você realmente deseja exlcuir contato?")
  }

  private excluirContato() {
    if(this.contatoService.deleteContato(this.contato)) {
      this.presentAlert("Agenda", "Excluir", "Exclusão do contato realizada!")
      this.router.navigate(['/home'])
    }else {
      this.presentAlert("Agenda", "Erro", "Contato não encontrado!")
    }
  }

  private validar(campo: any): boolean {
    if(!campo) {
      return false
    }
    return true
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
