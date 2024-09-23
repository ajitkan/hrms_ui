import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchTimeComponent } from './punch-time.component';

describe('PunchTimeComponent', () => {
  let component: PunchTimeComponent;
  let fixture: ComponentFixture<PunchTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunchTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunchTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
