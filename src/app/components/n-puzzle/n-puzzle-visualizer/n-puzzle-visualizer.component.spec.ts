import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPuzzleVisualizerComponent } from './n-puzzle-visualizer.component';

describe('NPuzzleVisualizatorComponent', () => {
  let component: NPuzzleVisualizerComponent;
  let fixture: ComponentFixture<NPuzzleVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NPuzzleVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NPuzzleVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
