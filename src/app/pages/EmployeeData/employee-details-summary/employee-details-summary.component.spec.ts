import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeDetailsSummaryComponent } from './employee-details-summary.component';

describe('EmplyeeDetailsSummaryComponent', () => {
  let component: EmplyeeDetailsSummaryComponent;
  let fixture: ComponentFixture<EmplyeeDetailsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplyeeDetailsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplyeeDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
