import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySites } from './my-sites';

describe('MySites', () => {
  let component: MySites;
  let fixture: ComponentFixture<MySites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
