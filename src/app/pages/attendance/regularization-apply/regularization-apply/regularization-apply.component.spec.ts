import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizationApplyComponent } from './regularization-apply.component';

describe('RegularizationApplyComponent', () => {
  let component: RegularizationApplyComponent;
  let fixture: ComponentFixture<RegularizationApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularizationApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularizationApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
