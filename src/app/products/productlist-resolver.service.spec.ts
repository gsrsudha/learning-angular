import { TestBed, inject } from '@angular/core/testing';

import { ProductlistResolverService } from './productlist-resolver.service';

describe('ProductlistResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductlistResolverService]
    });
  });

  it('should be created', inject([ProductlistResolverService], (service: ProductlistResolverService) => {
    expect(service).toBeTruthy();
  }));
});
