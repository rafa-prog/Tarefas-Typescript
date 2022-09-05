import { TestBed } from '@angular/core/testing';

import { ProvedorService } from './provedor.service';

describe('ProvedorService', () => {
  let service: ProvedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
