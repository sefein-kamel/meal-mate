import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventGuard } from './prevent-guard';

describe('preventGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
