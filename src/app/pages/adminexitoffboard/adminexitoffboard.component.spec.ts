import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminexitoffboardComponent } from './adminexitoffboard.component';

describe('AdminexitoffboardComponent', () => {
  let component: AdminexitoffboardComponent;
  let fixture: ComponentFixture<AdminexitoffboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminexitoffboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminexitoffboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
