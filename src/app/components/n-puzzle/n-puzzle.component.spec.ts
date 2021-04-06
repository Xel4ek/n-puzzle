import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPuzzleComponent } from './n-puzzle.component';

describe('NPuzzleComponent', () => {
  let component: NPuzzleComponent;
  let fixture: ComponentFixture<NPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NPuzzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
