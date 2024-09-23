import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchTimeApprovalComponent } from './punch-time-approval.component';

describe('PunchTimeApprovalComponent', () => {
  let component: PunchTimeApprovalComponent;
  let fixture: ComponentFixture<PunchTimeApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunchTimeApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunchTimeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
