import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensepiechatComponent } from './expensepiechat.component';

describe('ExpensepiechatComponent', () => {
  let component: ExpensepiechatComponent;
  let fixture: ComponentFixture<ExpensepiechatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensepiechatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensepiechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
