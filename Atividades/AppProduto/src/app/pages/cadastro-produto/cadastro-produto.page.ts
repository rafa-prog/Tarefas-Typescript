import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProvedorService } from 'src/app/services/provedor.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  isSubmitted: boolean = false
  formCadProd: FormGroup
  
  provedores: Provedor[]
  data: string
  
  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private alertController: AlertController,
  private provedorService: ProvedorService,
  private produtoService: ProdutoService) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    this.provedores = this.provedorService.readProvedor()
    this.formInit()
  }

  formInit() {
    this.formCadProd = this.formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.minLength(4)]],
        provedor: ['', [Validators.required]],
        info: ['', [Validators.required]],
        quantidade: ['', [Validators.required, Validators.min(1)]],
        preco: ['', [Validators.required, Validators.min(0.1)]],
        retornoProvedor: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        dataCompra: ['', [Validators.required]],
      })
  }

  get errorControl() {
    return this.formCadProd.controls
  }

  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formCadProd.valid) {
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
    this.produtoService.createProduto(this.formCadProd.value)
    this.presentAlert("Cadastro", "", "Produto registrado!")
    console.log(this.produtoService.readProdutos())
    this.router.navigate(['/home'])
  }

}
