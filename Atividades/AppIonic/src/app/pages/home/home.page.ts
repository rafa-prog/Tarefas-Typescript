import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoFirebaseService } from 'src/app/services/contato.firebase.service';
import { Contato } from '../../models/contato';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router, 
    private contatofs: ContatoFirebaseService) {
      this.carregarContatos()
  }

  carregarContatos() {
    this.contatofs.readContatos()
    .subscribe(res => {
      this.contatos = res.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Contato
        } as Contato
      })
    })
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro'])
  }

  irParaDetalhar(contato: Contato) {
    this.router.navigateByUrl('/detalhar', 
    {state: {objeto:contato}})
  }

}
