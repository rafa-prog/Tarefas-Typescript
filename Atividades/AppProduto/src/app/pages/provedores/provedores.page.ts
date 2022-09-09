import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provedor } from 'src/app/models/provedor';
import { ProvedorService } from 'src/app/services/provedor.service';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.page.html',
  styleUrls: ['./provedores.page.scss'],
})
export class ProvedoresPage implements OnInit {
  provedores: Provedor[]

  constructor(private router: Router,
  private provedorService: ProvedorService) { }

  ngOnInit() {
    this.provedores = this.provedorService.readProvedor()
  }

  irParaProdutos() {
    this.router.navigate(['/home'])
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-provedor'])
  }

  detalhesProvedor(provedor: Provedor) {
    this.router.navigateByUrl('/detalhes-provedor',
    {state: {objeto:provedor}})
  }
}
