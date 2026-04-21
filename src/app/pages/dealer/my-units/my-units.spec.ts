import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUnits } from './my-units';

describe('MyUnits', () => {
  let component: MyUnits;
  let fixture: ComponentFixture<MyUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUnits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
