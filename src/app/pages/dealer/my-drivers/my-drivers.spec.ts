import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDrivers } from './my-drivers';

describe('MyDrivers', () => {
  let component: MyDrivers;
  let fixture: ComponentFixture<MyDrivers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDrivers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDrivers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
