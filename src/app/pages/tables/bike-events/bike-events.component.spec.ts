import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeEventsComponent } from './bike-events.component';

describe('BikeEventsComponent', () => {
  let component: BikeEventsComponent;
  let fixture: ComponentFixture<BikeEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
