import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDealerShip } from './map-dealer-ship';

describe('MapDealerShip', () => {
  let component: MapDealerShip;
  let fixture: ComponentFixture<MapDealerShip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDealerShip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDealerShip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
