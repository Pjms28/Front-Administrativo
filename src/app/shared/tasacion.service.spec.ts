import { TestBed } from '@angular/core/testing';

import { TasacionService } from './tasacion.service';

describe('TasacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasacionService = TestBed.get(TasacionService);
    expect(service).toBeTruthy();
  });
});
