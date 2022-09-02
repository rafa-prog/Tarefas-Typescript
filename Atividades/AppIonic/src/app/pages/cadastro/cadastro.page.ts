import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  data: string
  formCadastrar: FormGroup
  isSubmitted: boolean = false

  constructor(private alertController: AlertController, 
    private router: Router, private contatoService: ContatoService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    this.formInit()
  }

  formInit() {
    this.formCadastrar = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        telefone: ['', [Validators.required, Validators.minLength(14)]],
        genero: ['', Validators.required],
        dataNascimento: ['', Validators.required],
      })
  }

  get errorControl() {
    return this.formCadastrar.controls
  }

  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formCadastrar.valid) {
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios!")
      return false
    }

    this.cadastrar()
  }

  private cadastrar() {
    this.contatoService.addContato(this.formCadastrar.value)
    this.presentAlert("Agenda", "", "Contato cadastrado")
    this.router.navigate(['/home'])
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
