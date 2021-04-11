import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { NPuzzleComponent } from './n-puzzle.component';
describe('NPuzzleComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [NPuzzleComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(NPuzzleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=n-puzzle.component.spec.js.map