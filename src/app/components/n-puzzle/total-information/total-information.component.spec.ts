import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalInformationComponent } from './total-information.component';

describe('TotalInformationComponent', () => {
  let component: TotalInformationComponent;
  let fixture: ComponentFixture<TotalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
