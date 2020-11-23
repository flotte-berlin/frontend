import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementTypesComponent } from './engagement-types.component';

describe('EngagementTypesComponent', () => {
  let component: EngagementTypesComponent;
  let fixture: ComponentFixture<EngagementTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
