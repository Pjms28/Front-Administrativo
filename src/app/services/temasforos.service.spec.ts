import { TestBed } from '@angular/core/testing';

import { TemasforosService } from './temasforos.service';

describe('TemasforosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemasforosService = TestBed.get(TemasforosService);
    expect(service).toBeTruthy();
  });
});
