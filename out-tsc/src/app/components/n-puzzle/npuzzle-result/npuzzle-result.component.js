import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let NPuzzleResultComponent = class NPuzzleResultComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Input()
], NPuzzleResultComponent.prototype, "result", void 0);
__decorate([
    Input()
], NPuzzleResultComponent.prototype, "index", void 0);
NPuzzleResultComponent = __decorate([
    Component({
        selector: 'app-npuzzle-result[result][index]',
        templateUrl: './npuzzle-result.component.html',
        styleUrls: ['./npuzzle-result.component.scss']
    })
], NPuzzleResultComponent);
export { NPuzzleResultComponent };
//# sourceMappingURL=npuzzle-result.component.js.map