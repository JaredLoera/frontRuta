import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesModels } from './vehicles-models';

describe('VehiclesModels', () => {
  let component: VehiclesModels;
  let fixture: ComponentFixture<VehiclesModels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesModels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesModels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
