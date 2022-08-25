import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private contatoService: ContatoService) {
    this.contatos = this.contatoService.contatos
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro'])
  }

}
