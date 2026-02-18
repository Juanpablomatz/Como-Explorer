import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marte } from './marte';

describe('Marte', () => {
  let component: Marte;
  let fixture: ComponentFixture<Marte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
