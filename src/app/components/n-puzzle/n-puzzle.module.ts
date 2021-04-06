import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NPuzzleRoutingModule } from './n-puzzle-routing.module';
import { NPuzzleComponent } from './n-puzzle.component';


@NgModule({
  declarations: [NPuzzleComponent],
  imports: [
    CommonModule,
    NPuzzleRoutingModule
  ]
})
export class NPuzzleModule { }
