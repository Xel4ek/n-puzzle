import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NPuzzleComponent } from './n-puzzle.component';

const routes: Routes = [{
  path: '', component: NPuzzleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NPuzzleRoutingModule { }
