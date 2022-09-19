import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProvedorService } from 'src/app/services/provedor.service';

@Component({
  selector: 'app-cadastro-provedor',
  templateUrl: './cadastro-provedor.page.html',
  styleUrls: ['./cadastro-provedor.page.scss'],
})

export class CadastroProvedorPage implements OnInit {
  isSubmitted: boolean = false
  formCadProv: FormGroup
  
  data: string

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private alertController: AlertController,
  private provedorService: ProvedorService) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    this.formInit()
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
      })
  }

  get errorControl() {
    return this.formCadProv.controls
  }

  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formCadProv.valid) {
      this.presentAlert("Cadastro", "Erro", "Todos os campos são obrigatórios!")
      return false
    }

    this.cadastrar()
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

  cadastrar() {
    this.provedorService.createProvedor(this.formCadProv.value)
    this.presentAlert("Cadastro", "", "Provedor registrado!")
    this.router.navigate(['/provedores'])
  }

}
