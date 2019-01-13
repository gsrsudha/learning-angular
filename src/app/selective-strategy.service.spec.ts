import { TestBed, inject } from '@angular/core/testing';

import { SelectiveStrategyService } from './selective-strategy.service';

describe('SelectiveStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectiveStrategyService]
    });
  });

  it('should be created', inject([SelectiveStrategyService], (service: SelectiveStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
