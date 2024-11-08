import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationChecklistComponent } from './resignation-checklist.component';

describe('ResignationChecklistComponent', () => {
  let component: ResignationChecklistComponent;
  let fixture: ComponentFixture<ResignationChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignationChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignationChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
