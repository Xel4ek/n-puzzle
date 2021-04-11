import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainLayoutComponent = class MainLayoutComponent {
    constructor(dataHolder) {
        this.dataHolder = dataHolder;
        this.loading$ = dataHolder.isLoading;
    }
    ngOnInit() {
    }
};
MainLayoutComponent = __decorate([
    Component({
        selector: 'app-main-layout',
        templateUrl: './main-layout.component.html',
        styleUrls: ['./main-layout.component.scss']
    })
], MainLayoutComponent);
export { MainLayoutComponent };
//# sourceMappingURL=main-layout.component.js.map