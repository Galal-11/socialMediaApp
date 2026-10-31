import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeComponent } from './change.component';

describe('ChangeComponent', () => {
  let component: ChangeComponent;
  let fixture: ComponentFixture<ChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
