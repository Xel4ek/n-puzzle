import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NPuzzleRoutingModule } from './n-puzzle-routing.module';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator/npuzzle-visualizator.component';
import { NPuzzleResultComponent } from './npuzzle-result/npuzzle-result.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TotalInformationComponent } from './total-information/total-information.component';
import { MatSelectModule } from '@angular/material/select';
let NPuzzleModule = class NPuzzleModule {
};
NPuzzleModule = __decorate([
    NgModule({
        declarations: [NPuzzleComponent, NPuzzleVisualizatorComponent, NPuzzleResultComponent, TotalInformationComponent],
        imports: [CommonModule, NPuzzleRoutingModule, MatExpansionModule, MatSelectModule],
        exports: [MatExpansionModule]
    })
], NPuzzleModule);
export { NPuzzleModule };
//# sourceMappingURL=n-puzzle.module.js.map