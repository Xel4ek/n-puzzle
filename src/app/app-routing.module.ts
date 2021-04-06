import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [{
  path: '', component: MainLayoutComponent,
  loadChildren: () => import('./components/n-puzzle/n-puzzle.module').then(({NPuzzleModule}) => NPuzzleModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
