import { TestBed } from '@angular/core/testing';

import { CommanSearchEmployeeService } from './comman-search-employee.service';

describe('CommanSearchEmployeeService', () => {
  let service: CommanSearchEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanSearchEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
