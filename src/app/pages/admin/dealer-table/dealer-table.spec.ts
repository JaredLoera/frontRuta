import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTable } from './dealer-table';

describe('DealerTable', () => {
  let component: DealerTable;
  let fixture: ComponentFixture<DealerTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
