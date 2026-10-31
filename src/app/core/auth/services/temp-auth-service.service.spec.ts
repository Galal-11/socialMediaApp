import { TestBed } from '@angular/core/testing';

import { TempAuthServiceService } from './temp-auth-service.service';

describe('TempAuthServiceService', () => {
  let service: TempAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
