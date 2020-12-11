import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeEventTypesComponent } from './bike-event-types.component';

describe('BikeEventTypesComponent', () => {
  let component: BikeEventTypesComponent;
  let fixture: ComponentFixture<BikeEventTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeEventTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeEventTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
