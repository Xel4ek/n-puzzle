import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NPuzzleComponent } from './n-puzzle.component';
import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator/npuzzle-visualizator.component';
const routes = [
    {
        path: '',
        component: NPuzzleComponent,
    },
    {
        path: 'vis',
        component: NPuzzleVisualizatorComponent,
    },
];
let NPuzzleRoutingModule = class NPuzzleRoutingModule {
};
NPuzzleRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], NPuzzleRoutingModule);
export { NPuzzleRoutingModule };
//# sourceMappingURL=n-puzzle-routing.module.js.map