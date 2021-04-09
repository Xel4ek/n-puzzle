import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizerComponent } from './n-puzzle-visualizer/n-puzzle-visualizer.component';

const routes: Routes = [
  {
    path: '',
    component: NPuzzleComponent,
  },
  {
    path: 'vis',
    component: NPuzzleVisualizerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NPuzzleRoutingModule {}
