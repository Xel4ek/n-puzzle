import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NPuzzleRoutingModule } from './n-puzzle-routing.module';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizerComponent } from './n-puzzle-visualizer/n-puzzle-visualizer.component';
import { NPuzzleResultComponent } from './n-puzzle-result/n-puzzle-result.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TotalInformationComponent } from './total-information/total-information.component';
import { MatSelectModule } from '@angular/material/select';
import { NPuzzleGridComponent } from './n-puzzle-grid/n-puzzle-grid.component';
import { NPuzzleGameComponent } from '@components/n-puzzle/n-puzzle-game/n-puzzle-game.component';

@NgModule({
  declarations: [
    NPuzzleComponent,
    NPuzzleVisualizerComponent,
    NPuzzleResultComponent,
    TotalInformationComponent,
    NPuzzleGridComponent,
    NPuzzleGameComponent,
  ],
  imports: [
    CommonModule,
    NPuzzleRoutingModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  exports: [MatExpansionModule],
})
export class NPuzzleModule {}
