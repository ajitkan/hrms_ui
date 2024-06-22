import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjstatuschartComponent } from './prjstatuschart.component';

describe('PrjstatuschartComponent', () => {
  let component: PrjstatuschartComponent;
  let fixture: ComponentFixture<PrjstatuschartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrjstatuschartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrjstatuschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
