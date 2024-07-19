import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoffboardComponent } from './exitoffboard.component';

describe('ExitoffboardComponent', () => {
  let component: ExitoffboardComponent;
  let fixture: ComponentFixture<ExitoffboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitoffboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitoffboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
