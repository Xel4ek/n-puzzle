import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NPuzzleRoutingModule } from './n-puzzle-routing.module';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator/npuzzle-visualizator.component';

@NgModule({
  declarations: [NPuzzleComponent, NPuzzleVisualizatorComponent],
  imports: [CommonModule, NPuzzleRoutingModule],
})
export class NPuzzleModule {}
