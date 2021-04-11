import { TestBed } from '@angular/core/testing';
import { DataHolderService } from './data-holder.service';
describe('DataHolderService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataHolderService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data-holder.service.spec.js.map