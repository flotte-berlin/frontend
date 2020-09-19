import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingStationsComponent } from './lending-stations.component';

describe('LendingStationsComponent', () => {
  let component: LendingStationsComponent;
  let fixture: ComponentFixture<LendingStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendingStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
