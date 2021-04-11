import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TotalInformationComponent = class TotalInformationComponent {
    constructor(dataHolder) {
        this.dataHolder = dataHolder;
        this.data$ = dataHolder.getAverageData();
    }
};
TotalInformationComponent = __decorate([
    Component({
        selector: 'app-total-information',
        templateUrl: './total-information.component.html',
        styleUrls: ['./total-information.component.scss'],
    })
], TotalInformationComponent);
export { TotalInformationComponent };
//# sourceMappingURL=total-information.component.js.map