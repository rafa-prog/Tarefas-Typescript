import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../class/contato';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router,
    private alertController: AlertController, 
    private contatoService: ContatoService) {
    this.contatos = this.contatoService.contatos
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro'])
  }

  exibirInfo(contato: Contato) {
    let info = "Telefone: " + contato.telefone + "\nGênero: " + contato.genero + "\nData Nascimento: " + contato.dataNascimento
    this.presentAlert(contato.nome, "", info)
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
