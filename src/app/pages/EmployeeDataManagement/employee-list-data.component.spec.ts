import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListDataComponent } from './employee-list-data.component';

describe('EmployeeDataComponent', () => {
  let component: EmployeeListDataComponent;
  let fixture: ComponentFixture<EmployeeListDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
