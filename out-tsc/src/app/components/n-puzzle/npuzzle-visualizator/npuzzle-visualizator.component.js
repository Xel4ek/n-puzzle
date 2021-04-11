import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NPuzzleGenerator } from '../../../../vendor/n-puzzle/NPuzzleGenerator';
let NPuzzleVisualizatorComponent = class NPuzzleVisualizatorComponent {
    constructor() { }
    ngOnInit() { }
    visualize() {
        const pg5 = new NPuzzleGenerator(5);
        console.log(pg5);
        const pg4 = new NPuzzleGenerator(4);
        console.log(pg4);
        const pg3 = new NPuzzleGenerator(3);
        console.log(pg3);
    }
};
NPuzzleVisualizatorComponent = __decorate([
    Component({
        selector: 'app-npuzzle-visualizator',
        templateUrl: './npuzzle-visualizator.component.html',
        styleUrls: ['./npuzzle-visualizator.component.scss'],
    })
], NPuzzleVisualizatorComponent);
export { NPuzzleVisualizatorComponent };
//# sourceMappingURL=npuzzle-visualizator.component.js.map