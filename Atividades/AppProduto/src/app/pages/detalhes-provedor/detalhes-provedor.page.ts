import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProvedorService } from 'src/app/services/provedor.service';

@Component({
  selector: 'app-detalhes-provedor',
  templateUrl: './detalhes-provedor.page.html',
  styleUrls: ['./detalhes-provedor.page.scss'],
})

export class DetalhesProvedorPage implements OnInit {
  disabled: boolean = true
  
  formDetProv: FormGroup
  provedor: Provedor
  id: string

  data: string

  isSubmitted: boolean = false

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private produtoService: ProdutoService,
    private provedorService: ProvedorService) { }

  ngOnInit() {
    this.data = new Date().toISOString()

    const nav = this.router.getCurrentNavigation()
    this.provedor = nav.extras.state.objeto
    this.id = this.provedor.id
    this.formInit()
  }

  formInit() {
    this.formDetProv = this.formBuilder.group(
      {
        nome: [this.provedor.nome, [Validators.required, Validators.minLength(4)]],
        titulo: [this.provedor.titulo],
        cnpj: [this.provedor.cnpj, [Validators.required, Validators.minLength(14)]],
        cep: [this.provedor.cep, [Validators.required, Validators.minLength(8), Validators.minLength(9)]],
        endereco: [this.provedor.endereco, [Validators.required, Validators.minLength(8)]],
        telefone: [this.provedor.telefone, [Validators.required, Validators.minLength(14)]],
        dataContrato: [this.provedor.dataContrato, [Validators.required]],
      })
  }

  get errorControl() {
    return this.formDetProv.controls
  }

  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formDetProv.valid) {
      this.presentAlert("Editar", "Erro", "Todos os campos são obrigatórios!")
      return false
    }

    this.update()
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

  editar() {
    this.disabled = !this.disabled
  }

  update() {
    this.provedorService.updateProvedor(this.id, this.formDetProv.value)
    this.presentAlert("Editar", "", "Provedor alterado!")
    this.router.navigate(['/provedores'])
  }

  delete() {
    this.produtoService.deleteByProvedor(this.formDetProv.value)
    this.provedorService.deleteProvedor(this.id)
    this.presentAlert("Excluir", "", "Provedor e produtos associados excluídos!")
    this.router.navigate(['/provedores'])
  }

}
