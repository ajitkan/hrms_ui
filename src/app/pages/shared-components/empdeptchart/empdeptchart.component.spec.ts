import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpdeptchartComponent } from './empdeptchart.component';

describe('EmpdeptchartComponent', () => {
  let component: EmpdeptchartComponent;
  let fixture: ComponentFixture<EmpdeptchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpdeptchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpdeptchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
