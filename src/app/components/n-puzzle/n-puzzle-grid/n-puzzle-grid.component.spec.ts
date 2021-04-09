import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPuzzleGridComponent } from './n-puzzle-grid.component';

describe('NPuzzleGridComponent', () => {
  let component: NPuzzleGridComponent;
  let fixture: ComponentFixture<NPuzzleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NPuzzleGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NPuzzleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
