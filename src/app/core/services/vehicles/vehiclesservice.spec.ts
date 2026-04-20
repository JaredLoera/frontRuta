import { TestBed } from '@angular/core/testing';

import { Vehiclesservice } from './vehiclesservice';

describe('Vehiclesservice', () => {
  let service: Vehiclesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vehiclesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
