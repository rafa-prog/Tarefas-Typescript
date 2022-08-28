import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../../models/contato';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router, 
    private contatoService: ContatoService) {
    this.contatos = this.contatoService.contatos
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro'])
  }

  irParaDetalhar(contato: Contato) {
    this.router.navigateByUrl('/detalhar', 
    {state: {objeto:contato}})
  }

}
