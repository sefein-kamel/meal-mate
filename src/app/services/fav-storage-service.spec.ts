import { TestBed } from '@angular/core/testing';

import { FavStorageService } from './fav-storage-service';

describe('FavStorageService', () => {
  let service: FavStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
