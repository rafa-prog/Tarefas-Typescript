import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from 'src/app/models/produto';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProvedorService } from 'src/app/services/provedor.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.page.html',
  styleUrls: ['./detalhes-produto.page.scss'],
})
export class DetalhesProdutoPage implements OnInit {
  disabled: boolean = true
  
  formDetProd: FormGroup
  produto: Produto
  id: string

  provedores: Provedor[]
  data: string
  
  isSubmitted: boolean = false

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private produtoService: ProdutoService,
    private provedorService: ProvedorService) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    this.provedores = this.provedorService.readProvedor()

    const nav = this.router.getCurrentNavigation()
    this.produto = nav.extras.state.objeto
    this.id = this.produto.id
    this.formInit()
  }

  formInit() {
    this.formDetProd = this.formBuilder.group(
      {
        nome: [this.produto.nome, [Validators.required, Validators.minLength(4)]],
        provedor: [this.produto.provedor, [Validators.required]],
        info: [this.produto.info, [Validators.required]],
        quantidade: [this.produto.quantidade, [Validators.required, Validators.min(1)]],
        preco: [this.produto.quantidade, [Validators.required, Validators.min(0.1)]],
        retornoProvedor: [this.produto.retornoProvedor, [Validators.required, Validators.min(0), Validators.max(100)]],
        dataCompra: [this.produto.dataCompra, [Validators.required]],
      })
  }

  get errorControl() {
    return this.formDetProd.controls
  }

  submitForm(): boolean {
    this.isSubmitted = true
    if(!this.formDetProd.valid) {
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
    this.produtoService.updateProduto(this.id, this.formDetProd.value)
    this.presentAlert("Editar", "", "Produto alterado!")
    console.log(this.produtoService.readProdutos())
    this.router.navigate(['/home'])
  }

  delete() {
    this.produtoService.deleteProduto(this.id)
    this.presentAlert("Excluir", "", "Produto excluído!")
    console.log(this.produtoService.readProdutos())
    this.router.navigate(['/home'])
  }

}
