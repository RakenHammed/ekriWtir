import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingDemandComponent } from './renting-demand.component';

describe('RentingDemandComponent', () => {
  let component: RentingDemandComponent;
  let fixture: ComponentFixture<RentingDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentingDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentingDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
