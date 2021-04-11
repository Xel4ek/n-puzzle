import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let DataHolderService = class DataHolderService {
    constructor() {
        this.loading$ = new BehaviorSubject(false);
        this.totalResult$ = new BehaviorSubject({ len: 0 });
    }
    set loading(value) {
        this.loading$.next(value);
    }
    get isLoading() {
        return this.loading$.asObservable();
    }
    updateResult(resultList) {
        this.totalResult$.next(Object.assign(Object.assign({}, resultList.reduce((acc, npuzzlereport) => {
            acc.totalRequiredSteps += npuzzlereport.requiredSteps;
            acc.solvableCount += npuzzlereport.solvable ? 1 : 0;
            acc.totalTime += npuzzlereport.timeUsed;
            return acc;
        }, { totalRequiredSteps: 0, solvableCount: 0, totalTime: 0 })), { len: resultList.length }));
    }
    getAverageData() {
        return this.totalResult$.asObservable();
    }
};
DataHolderService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DataHolderService);
export { DataHolderService };
//# sourceMappingURL=data-holder.service.js.map