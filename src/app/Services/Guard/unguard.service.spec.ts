import { TestBed } from '@angular/core/testing';

import { UnguardService } from './unguard.service';

describe('UnguardService', () => {
  let service: UnguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
