import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../class/contato';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  nome: string
  telefone: number
  genero: string
  dataNascimento: string

  constructor(private alertController: AlertController, 
    private router: Router, private contatoService: ContatoService) {}

  ngOnInit() {

  }

  cadastrar() {
    console.log(this.genero)
    console.log(this.dataNascimento)
    if(this.validar(this.nome) && this.validar(this.telefone)) {
      let contato: Contato = new Contato(this.nome, this.telefone)
      this.contatoService.addContatos(contato)
      this.presentAlert("Agenda", "", "Cadastro realizado com sucesso")
      this.router.navigate(['/home'])
    } 
    else{
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios!")
    }
  }

  private validar(campo: any): boolean {
    if(!campo) {
      return false
    }
    return true
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
