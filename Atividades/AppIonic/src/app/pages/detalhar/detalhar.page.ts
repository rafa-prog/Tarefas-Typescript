import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from 'src/app/models/contato';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato: Contato
  nome: string
  telefone: number
  genero: string
  dataNascimento: string
  data: string
  disabled: boolean

  constructor(private router: Router) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    const nav = this.router.getCurrentNavigation()
    this.contato = nav.extras.state.objeto
    console.log(this.contato)
    this.nome = this.contato.nome
    this.telefone = this.contato.telefone
    this.genero = this.contato.genero
    this.dataNascimento = this.contato.dataNascimento
    this.disabled = true
  }

  editar() {
    this.disabled = !this.disabled
  }

  salvar() {

  }

  excluir() {

  }

}
