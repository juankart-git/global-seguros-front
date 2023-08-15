import { TestBed } from '@angular/core/testing';

import { InsuranceQuoteService } from './insurance-quote.service';

describe('InsuranceQuoteService', () => {
  let service: InsuranceQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
