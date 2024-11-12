import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveResignationComponent } from './approve-resignation.component';

describe('ApproveResignationComponent', () => {
  let component: ApproveResignationComponent;
  let fixture: ComponentFixture<ApproveResignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveResignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
