import { TestBed } from '@angular/core/testing';

import { LeasingProviderService } from './leasing-provider';

describe('CarProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeasingProviderService = TestBed.get(LeasingProviderService);
    expect(service).toBeTruthy();
  });
});
