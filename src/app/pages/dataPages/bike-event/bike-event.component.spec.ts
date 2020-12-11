import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeEventComponent } from './bike-event.component';

describe('BikeEventComponent', () => {
  let component: BikeEventComponent;
  let fixture: ComponentFixture<BikeEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
