import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator.component';
describe('NPuzzleVisualizatorComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [NPuzzleVisualizatorComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(NPuzzleVisualizatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=npuzzle-visualizator.component.spec.js.map