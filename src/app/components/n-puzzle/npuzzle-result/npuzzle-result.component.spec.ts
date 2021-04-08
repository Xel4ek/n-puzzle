import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPuzzleResultComponent } from './npuzzle-result.component';

describe('NPuzzleResultComponent', () => {
  let component: NPuzzleResultComponent;
  let fixture: ComponentFixture<NPuzzleResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NPuzzleResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NPuzzleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
