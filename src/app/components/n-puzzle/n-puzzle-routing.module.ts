import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator/npuzzle-visualizator.component';

const routes: Routes = [
  {
    path: '',
    component: NPuzzleComponent,
  },
  {
    path: 'vis',
    component: NPuzzleVisualizatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NPuzzleRoutingModule {}
