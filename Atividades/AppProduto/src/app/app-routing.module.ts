import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'produtos',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'cadastro-produto',
    loadChildren: () => import('./pages/cadastro-produto/cadastro-produto.module').then( m => m.CadastroProdutoPageModule)
  },
  {
    path: 'detalhes-produto',
    loadChildren: () => import('./pages/detalhes-produto/detalhes-produto.module').then( m => m.DetalhesProdutoPageModule)
  },
  {
    path: 'cadastro-provedor',
    loadChildren: () => import('./pages/cadastro-provedor/cadastro-provedor.module').then( m => m.CadastroProvedorPageModule)
  },
  {
    path: 'detalhes-provedor',
    loadChildren: () => import('./pages/detalhes-provedor/detalhes-provedor.module').then( m => m.DetalhesProvedorPageModule)
  },
  {
    path: 'provedores',
    loadChildren: () => import('./pages/provedores/provedores.module').then( m => m.ProvedoresPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
