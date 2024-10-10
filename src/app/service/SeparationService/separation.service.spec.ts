import { TestBed } from '@angular/core/testing';

import { SeparationService } from './separation.service';

describe('SeparationService', () => {
  let service: SeparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
