import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPuzzleVisualizatorComponent } from './npuzzle-visualizator.component';

describe('NPuzzleVisualizatorComponent', () => {
  let component: NPuzzleVisualizatorComponent;
  let fixture: ComponentFixture<NPuzzleVisualizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NPuzzleVisualizatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NPuzzleVisualizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
