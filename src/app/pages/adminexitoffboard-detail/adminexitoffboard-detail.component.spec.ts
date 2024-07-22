import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminexitoffboardDetailComponent } from './adminexitoffboard-detail.component';

describe('AdminexitoffboardDetailComponent', () => {
  let component: AdminexitoffboardDetailComponent;
  let fixture: ComponentFixture<AdminexitoffboardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminexitoffboardDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminexitoffboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
