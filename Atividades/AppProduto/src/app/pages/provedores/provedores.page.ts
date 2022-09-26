import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provedor } from 'src/app/models/provedor';
import { ProvedorFirebaseService } from 'src/app/services/provedor.firebase.service';


@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.page.html',
  styleUrls: ['./provedores.page.scss'],
})
export class ProvedoresPage implements OnInit {
  provedores: Provedor[];

  constructor(private router: Router,
  private provedorFs: ProvedorFirebaseService) { }

  ngOnInit() {
    this.provedorFs.readProvedores()
    .subscribe(res => {
      this.provedores = res.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Provedor
        } as Provedor));
    });
  }

  irParaProdutos() {
    this.router.navigate(['/produtos']);
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-provedor']);
  }

  detalhesProvedor(provedor: Provedor) {
    this.router.navigateByUrl('/detalhes-provedor',
    {state: {objeto:provedor}});
  }
}
