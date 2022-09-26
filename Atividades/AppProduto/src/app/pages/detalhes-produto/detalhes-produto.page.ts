import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from 'src/app/models/produto';
import { Provedor } from 'src/app/models/provedor';
import { ProdutoFirebaseService } from 'src/app/services/produto.firebase.service';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';


@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.page.html',
  styleUrls: ['./detalhes-produto.page.scss'],
})
export class DetalhesProdutoPage implements OnInit {
  disabled = true;

  formDetProd: FormGroup;
  produto: Produto;
  id: string;

  provedores: Provedor[];
  data: string;

  isSubmitted = false;

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private alertController: AlertController,
  private produtoFs: ProdutoFirebaseService,
  private provedorFs: ProvedorFirebaseService) { }

  get errorControl() {
    return this.formDetProd.controls;
  }

  ngOnInit() {
    this.data = new Date().toISOString();
    const nav = this.router.getCurrentNavigation();
    this.produto = nav.extras.state.objeto;

    this.provedorFs.readProvedores()
    .subscribe(res => {
      this.provedores = res.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Provedor
        } as Provedor));
    });

    this.formInit();
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
      });
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if(!this.formDetProd.valid) {
      this.presentAlert('Editar', 'Erro', 'Todos os campos são obrigatórios!');
      return false;
    }

    this.update();
  }

  async presentAlert(titulo: string, subtitulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: texto,
      buttons: ['OK'],
    });

    await alert.present();
  }

  editar() {
    this.disabled = !this.disabled;
  }

  update() {
    this.produtoFs.updateProduto(this.formDetProd.value, this.id);
    this.presentAlert('Editar', '', 'Produto alterado!');
    this.router.navigate(['/home']);
  }

  delete() {
    this.produtoFs.deleteProduto(this.produto);
    this.presentAlert('Excluir', '', 'Produto excluído!');
    this.router.navigate(['/home']);
  }

}
