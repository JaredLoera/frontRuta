import { TestBed } from '@angular/core/testing';

import { Dealershipservice } from './dealershipservice';

describe('Dealershipservice', () => {
  let service: Dealershipservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dealershipservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
