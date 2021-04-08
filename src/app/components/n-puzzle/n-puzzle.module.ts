import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NPuzzleRoutingModule } from './n-puzzle-routing.module';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator/npuzzle-visualizator.component';
import { NPuzzleResultComponent } from './npuzzle-result/npuzzle-result.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [NPuzzleComponent, NPuzzleVisualizatorComponent, NPuzzleResultComponent],
  imports: [CommonModule, NPuzzleRoutingModule, MatExpansionModule],
  exports: [MatExpansionModule]
})
export class NPuzzleModule {}
