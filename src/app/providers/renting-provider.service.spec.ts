import { TestBed } from '@angular/core/testing';

import { RentingProviderService } from './renting-provider.service';

describe('RentingProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentingProviderService = TestBed.get(RentingProviderService);
    expect(service).toBeTruthy();
  });
});
