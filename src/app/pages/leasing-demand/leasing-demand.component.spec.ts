import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCareComponent } from './leasing-demand.component';

describe('SaveCareComponent', () => {
  let component: SaveCareComponent;
  let fixture: ComponentFixture<SaveCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
