import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopTypesComponent } from './workshop-types.component';

describe('WorkshopTypesComponent', () => {
  let component: WorkshopTypesComponent;
  let fixture: ComponentFixture<WorkshopTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
