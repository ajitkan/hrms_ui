import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincalenderComponent } from './admincalender.component';

describe('AdmincalenderComponent', () => {
  let component: AdmincalenderComponent;
  let fixture: ComponentFixture<AdmincalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
