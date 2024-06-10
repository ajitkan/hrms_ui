import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAttendancesComponent } from './import-attendances.component';

describe('ImportAttendancesComponent', () => {
  let component: ImportAttendancesComponent;
  let fixture: ComponentFixture<ImportAttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportAttendancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
