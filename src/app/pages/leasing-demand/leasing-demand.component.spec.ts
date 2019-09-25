import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingDemandComponent } from './leasing-demand.component';

describe('SaveCareComponent', () => {
  let component: LeasingDemandComponent;
  let fixture: ComponentFixture<LeasingDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
