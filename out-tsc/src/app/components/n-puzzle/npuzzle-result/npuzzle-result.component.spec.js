import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { NPuzzleResultComponent } from './npuzzle-result.component';
describe('NPuzzleResultComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [NPuzzleResultComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(NPuzzleResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=npuzzle-result.component.spec.js.map