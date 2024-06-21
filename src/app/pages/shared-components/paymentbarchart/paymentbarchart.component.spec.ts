import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentbarchartComponent } from './paymentbarchart.component';

describe('PaymentbarchartComponent', () => {
  let component: PaymentbarchartComponent;
  let fixture: ComponentFixture<PaymentbarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentbarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
